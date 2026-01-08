export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    // 🔥 THIS IS WHAT MAKES LOGS VISIBLE
    console.log("CONSENTED USER DATA:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Logged successfully" }),
    };
  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
}
