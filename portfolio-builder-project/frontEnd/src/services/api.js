const API_BASE_URL = "http://localhost:8080";

export async function testConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    if (response.ok) {
      const data = await response.text();
      console.log("✅ Backend Connected:", data);
    } else {
      console.error("❌ Backend not reachable:", response.status);
    }
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}
