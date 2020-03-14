const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
  let voiceChannels = bot.channels.filter(c => c.type === 'voice');
  
  voiceChannels.forEach(function(r, i) {
    let tarhet = voiceChannels.members.size;
    console.log(tarhet);
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