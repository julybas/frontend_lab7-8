import { Command } from "commander";
import http from "http";
import fs from "fs";
import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";

const program = new Command();
program
  .requiredOption("-h, --host <host>", "server host")
  .requiredOption("-p, --port <port>", "server port")
  .requiredOption("-c, --cache <path>", "path to directory")
  .parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.cache)) {
  fs.mkdirSync(options.cache, { recursive: true });
}

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, options.cache),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const INVENTORY_FILE = path.join(options.cache, "inventory.json");

let inventory = [];
let nextId = 1;

if (fs.existsSync(INVENTORY_FILE)) {
  try {
    const data = fs.readFileSync(INVENTORY_FILE, "utf8");
    inventory = JSON.parse(data);
    if (inventory.length > 0) {
      nextId = Math.max(...inventory.map((i) => i.id), 0) + 1;
    }
  } catch (err) {
    console.error("Error loading inventory:", err.message);
  }
}

function saveInventory() {
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inventory, null, 2));
}

// ================= CREATE =================
app.post("/register", upload.single("photo"), (req, res) => {
  const { inventory_name, description } = req.body;

  if (!inventory_name) {
    return res.status(400).json({ error: "inventory_name is required" });
  }

  const item = {
    id: nextId++,
    inventory_name,
    description: description || "",
    photo: req.file ? req.file.filename : null,
  };

  inventory.push(item);
  saveInventory();

  res.status(201).json({ message: "Created", item });
});

// ================= READ ALL =================
app.get("/inventory", (req, res) => {
  res.json(
    inventory.map((i) => ({
      id: i.id,
      inventory_name: i.inventory_name,
      description: i.description,
      photo_url: i.photo ? `/inventory/${i.id}/photo` : null,
    })),
  );
});

// ================= READ ONE =================
app.get("/inventory/:id", (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item) return res.status(404).json({ error: "Not found" });

  res.json({
    id: item.id,
    inventory_name: item.inventory_name,
    description: item.description,
    photo_url: item.photo ? `/inventory/${item.id}/photo` : null,
  });
});

// ================= UPDATE TEXT =================
app.put("/inventory/:id", (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item) return res.status(404).json({ error: "Not found" });

  if (req.body.inventory_name) item.inventory_name = req.body.inventory_name;
  if (req.body.description) item.description = req.body.description;

  saveInventory();

  res.json({ message: "Updated", item });
});

// ================= UPDATE PHOTO =================
app.put("/inventory/:id/photo", upload.single("photo"), (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item) return res.status(404).json({ error: "Not found" });
  if (!req.file) return res.status(400).json({ error: "Photo required" });

  item.photo = req.file.filename;
  saveInventory();

  res.json({ message: "Photo updated", item });
});

// ================= GET PHOTO =================
app.get("/inventory/:id/photo", (req, res) => {
  const item = inventory.find((i) => i.id == req.params.id);

  if (!item || !item.photo) return res.status(404).json({ error: "No photo" });

  const filePath = path.join(options.cache, item.photo);

  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "File not found" });

  const ext = path.extname(item.photo);
  const mime = ext === ".png" ? "image/png" : "image/jpeg";

  res.set("Content-Type", mime);
  res.sendFile(path.resolve(filePath));
});

// ================= DELETE =================
app.delete("/inventory/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = inventory.findIndex((i) => i.id === id);

  if (index === -1) return res.status(404).json({ error: "Not found" });

  if (inventory[index].photo) {
    const filePath = path.join(options.cache, inventory[index].photo);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  inventory.splice(index, 1);
  saveInventory();

  res.json({ message: "Deleted" });
});

app.use((req, res) => res.status(405).send("Method Not Allowed"));

http.createServer(app).listen(options.port, options.host, () => {
  console.log(`Server running at http://${options.host}:${options.port}`);
});
