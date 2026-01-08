export async function handler(event) {
  console.log("FUNCTION HIT");

  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const data = JSON.parse(event.body);

  console.log("CONSENTED USER DATA:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}
