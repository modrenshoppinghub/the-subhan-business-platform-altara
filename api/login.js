export default async function handler(request, response) {
  // CORS Headers (Taake frontend se request block na ho)
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method === 'POST') {
    const { username, password } = request.body; // Netlify mein JSON.parse(event.body) tha

    // Yahan apna login logic likhein
    if (username === "admin" && password === "12345") {
      return response.status(200).json({ 
        success: true, 
        message: "Login Successful!" 
      });
    } else {
      return response.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}
