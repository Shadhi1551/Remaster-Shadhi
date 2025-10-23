The file ******/netlify/functions/generate-lyrics.js has been updated. Here's the result of running `cat -n` on a snippet of the edited file:
export async function handler(event) {
  try {
    const { GEMINI_API_KEY } = process.env;
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set");
      return { 
        statusCode: 500, 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "Missing API key configuration. Please set GEMINI_API_KEY environment variable." })
      };
    }

    const body = JSON.parse(event.body || "{}");
    
    if (!body.contents || !Array.isArray(body.contents) || body.contents.length === 0) {
      console.error("Invalid request body: missing or empty contents array");
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "Invalid request: contents array is required" })
      };
    }
    
    const requestBody = {
      contents: body.contents,
      generationConfig: body.generationConfig || {
        temperature: 0.9,
        topK: 40,
      }
    };
    
    if (body.systemInstruction && body.systemInstruction.parts && body.systemInstruction.parts[0]) {
      const systemText = body.systemInstruction.parts[0].text;
      if (body.contents[0] && body.contents[0].parts && body.contents[0].parts[0]) {
        body.contents[0].parts[0].text = systemText + "\n\n" + body.contents[0].parts[0].text;
        requestBody.contents = body.contents;
      }
    }

    console.log("Calling Gemini API with model: gemini-2.0-flash-exp");
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", response.status, errorData);
      return {
        statusCode: response.status,
        headers: {
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error("No candidates returned from Gemini API");
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "No lyrics generated. Please try again with different inputs." })
      };
    }
    
    console.log("Successfully generated lyrics");
    return {
      statusCode: 200,
      headers: {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: err.message || "Internal server error" })
    };
  }
}