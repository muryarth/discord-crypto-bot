import CryptoRequests from "../requests/cryptoRequests.js";

async function CheckCryptoCommands(message) {
  if (message.author.bot) {
    return;
  }

  const commandString = message.content.split(" ");

  if (commandString[0] === "$crypto") {
    if (commandString.length > 1) {
      const res = await CryptoRequests.GetAssetValue(commandString[1]);

      res.status !== 404 ?
        message.reply(`\`\`\`${message.author.globalName}, aqui está:\n${res.results.assetName} (USD) $${res.results.price}\`\`\``) :
        message.reply(res.message);
    }
    else {
      const res = await CryptoRequests.GetAllAssets();

      message.reply(`\`\`\`${message.author.globalName}, tente uma das opções abaixo:\n${res.results}\`\`\``);
    }
  }
}

export default CheckCryptoCommands;