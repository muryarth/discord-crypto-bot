import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import fs from "fs";

const token = process.env.DISCORD_TOKEN;
const cryptoValue = "null";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (clientEvent) => {
  console.log(`${clientEvent.user.tag} is ready to roll 👌`);
});

client.on("messageCreate", (message) => {
  console.log(message.content.split()[0]);
  //   if (message.content.split()[0] === ) {
  //     message.reply(`Current value: ${cryptoValue}`);
  //   }
});

client.login(process.env.DISCORD_TOKEN);
