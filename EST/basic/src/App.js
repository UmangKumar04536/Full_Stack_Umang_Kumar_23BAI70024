import { useState } from 'react'
import './App.css'

function App() {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      body: body,
    };

    console.log("Form Submitted:", data);
    alert("Form Submitted Successfully!");

    setTitle("");
    setBody("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start", 
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "cyan",
          borderColor:"blue",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Form</h2>

        <form onSubmit={handleSubmit}>
          <label>Title Field:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <label>Body Field:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter body"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              height: "100px"
            }}
          ></textarea>

          <button
            type="submit"
            style={{
              padding: "12px",
              width: "100%",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default App


