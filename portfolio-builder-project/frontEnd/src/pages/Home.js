import React, { useState } from "react";
import FormSection from "../components/FormSection";
import PreviewSection from "../components/PreviewSection";
import ExportButton from "../components/ExportButton";
import { sampleData } from "../utils/sampleData";

function Home({ setIsLoggedIn }) {
  const [data, setData] = useState({
    theme: "light",
    name: "",
    bio: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    tenth: "",
    twelfth: "",
    graduation: "",
    postgraduation: "",
    skills: "",
    experience: "",
    image: "",
  });

  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null); // 🆕 Tracks which portfolio is being edited

  const loggedInUser = localStorage.getItem("loggedInUser");

  // Fetch all saved portfolios for current user
  const fetchPortfolios = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/portfolio/${loggedInUser}`
      );
      const portfolios = await response.json();
      setSavedPortfolios(portfolios);
    } catch (err) {
      console.error("Error fetching portfolios:", err);
    }
  };

  // Save or Update portfolio
  const savePortfolio = async () => {
    try {
      const url = editId
        ? `http://localhost:8080/api/portfolio/${editId}` // update existing
        : "http://localhost:8080/api/portfolio"; // create new

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          username: loggedInUser,
        }),
      });

      if (response.ok) {
        alert(editId ? "✅ Portfolio updated successfully!" : "✅ Portfolio saved successfully!");
        setEditId(null);
        fetchPortfolios();
      } else {
        alert("❌ Failed to save portfolio.");
      }
    } catch (err) {
      console.error("Error saving portfolio:", err);
      alert("❌ Backend connection error.");
    }
  };

  // Delete portfolio
  const deletePortfolio = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this portfolio?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/portfolio/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("🗑️ Portfolio deleted!");
        fetchPortfolios();
      }
    } catch (err) {
      console.error("Error deleting portfolio:", err);
    }
  };

  // Load data of selected portfolio into the form (Edit mode)
  const editPortfolio = (portfolio) => {
    setData({
      theme: data.theme,
      name: portfolio.name || "",
      bio: portfolio.bio || "",
      phone: portfolio.phone || "",
      email: portfolio.email || "",
      linkedin: portfolio.linkedin || "",
      github: portfolio.github || "",
      tenth: portfolio.tenth || "",
      twelfth: portfolio.twelfth || "",
      graduation: portfolio.graduation || "",
      postgraduation: portfolio.postgraduation || "",
      skills: portfolio.skills || "",
      experience: portfolio.experience || "",
      image: portfolio.image || "",
    });
    setEditId(portfolio.id);
    setShowModal(false);
    alert("✏️ Portfolio loaded for editing!");
  };

  const generateSample = () => {
    setData(sampleData);
    setEditId(null);
  };

  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        gap: "20px",
        padding: "80px 20px 20px 20px",
        fontFamily: "Poppins, sans-serif",
        position: "relative",
      }}
    >
      {/* ---------- Header Bar ---------- */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          background:
            "linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1e3a8a 100%)",
          color: "white",
          padding: "15px 25px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ margin: 0 }}>AI Portfolio Builder</h2>
        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            setIsLoggedIn(false);
            window.location.href = "/login";
          }}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#dc2626")}
          onMouseOut={(e) => (e.target.style.background = "#ef4444")}
        >
          🚪 Logout
        </button>
      </div>

      {/* ---------- Left Section ---------- */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={generateSample}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ⚡ Generate Sample Data
          </button>

          <button
            onClick={() => {
              setShowModal(true);
              fetchPortfolios();
            }}
            style={{
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            📜 View Saved Portfolios
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={savePortfolio}
          style={{
            background: editId ? "#10b981" : "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "8px 16px",
            marginBottom: "20px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {editId ? "💾 Update Portfolio" : "💾 Save Portfolio"}
        </button>

        <FormSection data={data} setData={setData} />

        <div style={{ marginTop: "15px" }}>
          <ExportButton theme={data.theme} />
        </div>
      </div>

      {/* ---------- Right Section ---------- */}
      <div style={{ flex: 1, marginTop: "30px" }}>
        <PreviewSection data={data} />
      </div>

      {/* ---------- Modal for Saved Portfolios ---------- */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              📂 Saved Portfolios
            </h3>
            {savedPortfolios.length === 0 ? (
              <p>No portfolios found.</p>
            ) : (
              savedPortfolios.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{p.name}</strong>
                  <p>{p.bio}</p>
                  <p>
                    <strong>Skills:</strong> {p.skills}
                  </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => editPortfolio(p)}
                      style={{
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deletePortfolio(p.id)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
            <button
              onClick={() => setShowModal(false)}
              style={{
                display: "block",
                margin: "10px auto 0",
                background: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
