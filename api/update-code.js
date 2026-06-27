export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') return response.status(200).end();

  if (request.method === 'POST') {
    const { command, currentCode } = request.body;

    // RULE 1: Agar code nahi diya, toh pehle code pucho
    if (!currentCode) {
      return response.status(200).json({
        status: "NEED_CODE",
        message: "AI: Is badli ko live karne ke liye, pehle mujhe is waqt ka Code provide karein."
      });
    }

    // RULE 2: Agar code mil gaya, toh automation live karo
    // Yahan hum simulation kar rahe hain (Real AI yahan code inject karega)
    let automatedUI = "";
    if (command.toLowerCase().includes("contact")) {
      automatedUI = `<div style="background:#e3f2fd; padding:15px; border-radius:8px; margin-top:15px;">
        <h3>📞 Contact Us (Automated)</h3>
        <input type="email" placeholder="Email" style="padding:5px; margin-right:5px;"/>
        <button style="background:#0070f3; color:white; border:none; padding:5px 10px;">Submit</button>
      </div>`;
    } else {
      automatedUI = `<div style="background:#e8f5e9; padding:15px; border-radius:8px; margin-top:15px;">
        <h3>✨ New Feature: ${command}</h3>
        <p>Yeh feature live automate ho chuka ha!</p>
      </div>`;
    }

    return response.status(200).json({
      status: "SUCCESS",
      message: "AI: Code received! Automation process complete. Web is updated live.",
      newUI: automatedUI,
      guide: "Client Guide: AI ne aapki command ke mutabiq live changes inject kar diye hain. Aap niche live preview dekh sakte hain!"
    });
  }

  return response.status(405).json({ message: "Method not allowed" });
}
