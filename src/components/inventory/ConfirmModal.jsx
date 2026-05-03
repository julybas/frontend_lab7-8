import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Підтвердження</h3>
        <p style={styles.text}>Ти впевнений що хочеш видалити?</p>

        <div className="gh-actions" style={{ marginTop: "24px" }}>
          <button className="gh-btn" onClick={onClose}>
            Скасувати
          </button>
          <button className="gh-btn gh-btn-danger" onClick={onConfirm}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(27,31,36,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "6px",
    width: "360px",
    boxShadow: "0 8px 24px rgba(140,149,159,0.2)",
    border: "1px solid #d0d7de",
    fontFamily: "-apple-system, sans-serif",
  },
  title: { margin: "0 0 10px 0", color: "#24292f" },
  text: { color: "#57606a", margin: 0, fontSize: "14px" },
};

export default ConfirmModal;
