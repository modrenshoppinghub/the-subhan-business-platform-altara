export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  
  if (request.method === 'GET') {
    // Yahan se aap user ka data bhej sakte hain
    return response.status(200).json({ 
      name: "John Doe", 
      role: "Admin" 
    });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
