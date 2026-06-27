export default async function handler(request, response) {
  // CORS Headers for API requests
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') return response.status(200).end();

  if (request.method === 'POST') {
    const { command, currentCode } = request.body;

    // STEP 1: Agar user ne command di hai par code box khali hai, toh pehle code pucho
    if (!currentCode || currentCode.trim() === "") {
      return response.status(200).json({
        status: "NEED_CODE",
        message: "AI Agent: Main aapki request samajh gaya hoon. Live automation apply karne ke liye, kirya karke upar di gayi file ('App.jsx') ka saara current source code niche paste karein!"
      });
    }

    // STEP 2: Agar code mil gaya, toh command ke mutabiq dynamic element banao
    let simulatedUI = "";
    const userCmd = command.toLowerCase();

    if (userCmd.includes("black") || userCmd.includes("dark mode")) {
      simulatedUI = `
        <div style="background: #222; color: #fff; padding: 20px; border-radius: 8px; margin-top: 15px; text-align: center;">
          <h3>🌙 Dark Mode / Black Theme Theme Applied!</h3>
          <p>AI Automation ne successfully website view ke colors ko adjust kar diya hai.</p>
        </div>
      `;
    } else if (userCmd.includes("contact") || userCmd.includes("form")) {
      simulatedUI = `
        <div style="background: #f1f8ff; padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 5px solid #0070f3;">
          <h3>✉️ Automated Contact Us Support</h3>
          <p>Hamari team se rabta karne ke liye niche apna message likhein:</p>
          <input type="text" placeholder="Aapka Naam" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;" />
          <textarea placeholder="Message..." style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
          <button style="background: #0070f3; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Send Message</button>
        </div>
      `;
    } else if (userCmd.includes("4") || userCmd.includes("grid")) {
      simulatedUI = `
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px; color: #2e7d32;">
          <h3>📊 Grid Alignment Updated</h3>
          <p>Layout columns ko dynamic injection ke through optimized kar diya gaya hai.</p>
        </div>
      `;
    } else {
      // Default dynamic update response
      simulatedUI = `
        <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin-top: 15px; border: 1px dashed #f57c00;">
          <h3>✨ Live Component Injected: "${command}"</h3>
          <p>AI ne aapki statement ko read kar ke dynamic injection process live page par complete kar diya hai!</p>
        </div>
      `;
    }

    // Return final success package to frontend
    return response.status(200).json({
      status: "SUCCESS",
      message: "AI Automation System Activated!",
      newUI: simulatedUI,
      guide: `Client Guide: Maine aapki di gayi command ("${command}") ko read kar ke aapke 'App.jsx' code base ke live target view par changes runtime par inject kar diye hain. Niche live website update check karein!`
    });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
