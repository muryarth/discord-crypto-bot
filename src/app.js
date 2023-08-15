import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages
  ],
});

async function getCryptoValue(token) {
  try {
    const response = await fetch(`https://data.messari.io/api/v1/assets/${token}/metrics/market-data`);
    if (!response.ok) {
      return ({
        status: response.status,
        message: `[Erro] Token não esperado: ${token}`
      });
    }
    const data = await response.json();
    return (data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// debuga a execução do código no console
client.on("ready", (clientEvent) => {
  console.log(`${clientEvent.user.tag} is ready to roll 👌`);
});

// ouve mensagens no chat do discord
client.on("messageCreate", async (message) => {
  // console.log(message);

  // verifica se a mensagem foi escrita por outro bot
  if (message.author.bot) {
    return;
  }

  const commandString = message.content.split(" ");

  if (commandString[0] === "$crypto") {
    if (commandString.length > 1) {
      const res = await getCryptoValue(commandString[1]);

      // console.log(res);

      if (res.status === 404) {
        message.reply(res.message)
      } else {
        const replyContent = {
          authorName: message.author.globalName,
          assetName: res.data.Asset.name,
          price: res.data.market_data.price_usd,
        }

        message.reply(
          `
        \`\`\`${replyContent.authorName}, aqui está o valor do ativo solicitado:\n${replyContent.assetName} (USD) $${replyContent.price}\`\`\`
        `
        );
      }
    }
    else {
      message.reply("[Erro] Você deve informar um Token.");
    }
  }

});

// conecta com a app do discord
client.login(process.env.DISCORD_TOKEN);
