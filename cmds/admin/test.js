const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
  let targetChannels = bot.channels.get(args[0]);
  let tarhet = targetChannels.members.size;
  
  message.reply(tarhet)
}

module.exports.command = {
  name: 'test',
  aliases: ["тест", "test", "тестировать"],
  description: "Доёбывается до пользователя, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 