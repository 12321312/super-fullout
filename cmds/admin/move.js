const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');  
    let targetChannels = bot.channels.get(args[0]);
    let moveChannels = bot.channels.get(args[1]);

    console.log(targetChannels.members);

};
module.exports.command = {
    name: 'move',
    aliases: ["мув", "перетащить", "перенести"],
    description: "Отправляет в канал какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 