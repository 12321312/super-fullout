const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);  
    let botmessage = args.slice(1).join(" ");
    if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю'); 
    message.delete(); 
    if (!(args[0]) && (args[1])) return message.reply('пусто везде бл...');
    if (!member) return  message.reply('Такого нету...');
    if (!(args[1])) return message.reply('Пустота в описании...');

    member.sendMessage(botmessage);
};
module.exports.command = {
    name: 'ls',
    aliases: ["лс", "отправить в лс"],
    description: "Отправляет в лс какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 
