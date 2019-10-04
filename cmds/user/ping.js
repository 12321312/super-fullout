const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    message.delete(15000);
    message.reply('да нормальный у тебя пинг `' + `${message.createdTimestamp - Date.now()}` + '` м/с, успокойся').then(async msg => await msg.delete(15000));
};
module.exports.command = {
    name: 'ping',
    aliases: ["пинг", "показатьпинг", "пингклиент"],
    description: "Показывает пинг, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 