const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

const SCOPES = [
  "https://www.googleapis.com/auth/drive"
];

async function main() {
  const credentialsPath = path.join(
    process.cwd(),
    "credentials.json"
  );

  const auth = await authenticate({
    keyfilePath: credentialsPath,
    scopes: SCOPES,
  });

  const tokens = auth.credentials;

  fs.writeFileSync(
    path.join(process.cwd(), "google-token.json"),
    JSON.stringify(tokens, null, 2)
  );

  console.log("");
  console.log("=================================");
  console.log("Google authorization successful!");
  console.log("=================================");
  console.log("");
  console.log("Created: google-token.json");
  console.log("");
}

main().catch((error) => {
  console.error("");
  console.error("GOOGLE AUTHORIZATION ERROR:");
  console.error(error);
  process.exit(1);
});