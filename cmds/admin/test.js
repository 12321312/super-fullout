const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
    message.delete().catch(O_o=>{});
    reportschannel.send("хуй").then(async msg => {
      await msg.react("📕");
  });

}

module.exports.command = {
  name: 'report',
  aliases: ["репорт", "жалоба", "репортет"],
  description: "Доёбывается до пользователя, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 