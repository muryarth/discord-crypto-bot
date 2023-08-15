import { Client, IntentsBitField } from "discord.js";
import HandleCryptoCommands from "./handleCryptoCommands.js";

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

client
    // Debuga a execução do código no console da aplicação
    .on("ready", (clientEvent) => {
        console.log(`${clientEvent.user.tag} is ready to roll.`);
    })
    // Escuta o chat do discord
    .on("messageCreate", async (message) => {
        HandleCryptoCommands(message);
    });

export default client;