import CryptoRequests from "../requests/cryptoRequests.js";

// Escuta mensagens no chat do discord
function chatListener(client) {
  client.on("messageCreate", async (message) => {
    // Verifica se a mensagem foi escrita por outro BOT
    if (message.author.bot) {
      return;
    }

    const commandString = message.content.split(" ");

    if (commandString[0] === "$crypto") {
      if (commandString.length > 1) {
        const res = await CryptoRequests.GetAssetValue(commandString[1]);

        if (res.status === 404) {
          message.reply(res.message)
        } else {
          const replyContent = {
            authorName: message.author.globalName,
            assetName: res.data.Asset.name,
            price: res.data.market_data.price_usd > 1 ?
              res.data.market_data.price_usd.toFixed(2) :
              res.data.market_data.price_usd,
          }

          message.reply(`\`\`\`${replyContent.authorName}, aqui está:\n${replyContent.assetName} (USD) $${replyContent.price}\`\`\``);
        }
      }
      else {
        message.reply("[Erro] Você deve informar um Token.");
      }
    }

  });
}

export default chatListener;