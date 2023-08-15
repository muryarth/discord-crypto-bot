import "dotenv/config";
import client from "./controllers/commands/index.js";

// Conecta a APP com o discord
client.login(process.env.DISCORD_TOKEN);