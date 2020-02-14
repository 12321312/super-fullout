const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
    message.delete().catch(O_o=>{});
    message.channel.send("хуй").then(async msg => {
      await msg.react("📕");
    });

}

module.exports.command = {
  name: 'test',
  aliases: ["тест", "test", "тестировать"],
  description: "Доёбывается до пользователя, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 