import React from "react";

function PreviewSection({ data }) {
  return (
    <div
      id="preview"
      className="preview-section"
      style={{
        background:
          data.theme === "gradient"
            ? "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
            : data.theme === "dark"
            ? "#1e1e1e"
            : "#ffffff",
        color: data.theme === "dark" ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        className="top-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginBottom: "20px",
        }}
      >
       {data.image && (
  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src={data.image}
      alt="Profile"
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #e5e7eb",
      }}
    />
  </div>
)}

        <div
          className="contact-info"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "0.75rem",
            lineHeight: "1.4",
          }}
        >
          {data.phone && <p>📞 {data.phone}</p>}
          {data.email && <p>✉️ {data.email}</p>}
          {data.linkedin && (
            <p>
              🔗 <a href={data.linkedin}>{data.linkedin}</a>
            </p>
          )}
          {data.github && (
            <p>
              🐱 <a href={data.github}>{data.github}</a>
            </p>
          )}
        </div>
      </div>

      <h2>{data.name || "Your Name"}</h2>
      <p>{data.bio || "Your bio will appear here..."}</p>

      {(data.tenth ||
        data.twelfth ||
        data.graduation ||
        data.postgraduation) && (
        <>
          <h3>Education</h3>
          <ul>
            {data.tenth && <li>10th: {data.tenth}</li>}
            {data.twelfth && <li>12th: {data.twelfth}</li>}
            {data.graduation && <li>Graduation: {data.graduation}</li>}
            {data.postgraduation && (
              <li>Post Graduation: {data.postgraduation}</li>
            )}
          </ul>
        </>
      )}

      {data.skills && (
        <>
          <h3>Skills</h3>
          <p>{data.skills}</p>
        </>
      )}

      {data.experience && (
        <>
          <h3>Experience</h3>
          <p>{data.experience}</p>
        </>
      )}
    </div>
  );
}

export default PreviewSection;
