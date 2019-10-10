const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    let botmessage = args.join(" ");
    if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю'); 
    if (!(args[0])) return message.reply('Пустота в обращении...');
    message.delete().then(message.channel.send(botmessage));

};
module.exports.command = {
    name: 'canal',
    aliases: ["канал", "отправь", "отправить"],
    description: "Отправляет в канал какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 