import React, { useEffect, useState } from "react";

function SavedPortfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch all portfolios from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/portfolio")
      .then((res) => res.json())
      .then((data) => setPortfolios(data))
      .catch((err) => console.error("Error fetching portfolios:", err));
  }, []);

  // Load selected portfolio into builder
  const loadPortfolio = (portfolio) => {
    localStorage.setItem("selectedPortfolio", JSON.stringify(portfolio));
    window.open("/", "_blank"); // opens builder
  };

  // Handle delete click (open modal)
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Delete confirmed
  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/portfolio/${selectedId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // remove from UI instantly
        setPortfolios(portfolios.filter((p) => p.id !== selectedId));
      } else {
        alert("❌ Failed to delete portfolio.");
      }
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      alert("⚠️ Backend error while deleting portfolio.");
    }

    setShowModal(false);
    setSelectedId(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "#1f2937", marginBottom: "20px" }}>
        📜 Saved Portfolios
      </h1>

      {portfolios.length === 0 ? (
        <p>No portfolios saved yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {portfolios.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#f9fafb",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "15px",
                position: "relative",
              }}
            >
              <h2>{item.name}</h2>
              <p>{item.bio}</p>
              <p>
                <strong>Skills:</strong> {item.skills}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                {/* Load Button */}
                <button
                  onClick={() => loadPortfolio(item)}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
                  onMouseOut={(e) => (e.target.style.background = "#2563eb")}
                >
                  🔁 Load
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#b91c1c")}
                  onMouseOut={(e) => (e.target.style.background = "#dc2626")}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px 30px",
              borderRadius: "12px",
              textAlign: "center",
              width: "350px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Delete Portfolio?</h2>
            <p style={{ color: "#4b5563", marginBottom: "20px" }}>
              This action cannot be undone. Are you sure?
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              <button
                onClick={confirmDelete}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#b91c1c")}
                onMouseOut={(e) => (e.target.style.background = "#dc2626")}
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = "#4b5563")}
                onMouseOut={(e) => (e.target.style.background = "#6b7280")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedPortfolios;
