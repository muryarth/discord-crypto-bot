import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import listener from "./controllers/commands/cryptoCommands.js";

// Cria uma instância do BOT
const client = new Client({
  // Lista de "intents", gateways usados para fazer interações no discord
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages
  ],
});

// Debuga a execução do código no console da aplicação
client.on("ready", (clientEvent) => {
  console.log(`${clientEvent.user.tag} is ready to roll.`);
});

// Escuta o chat do discord
listener(client);

// Conecta a APP com o discord
client.login(process.env.DISCORD_TOKEN);