const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');
    let target = message.mentions.members.first() || message.guild.members.get(args[0]);      
    let game = target.presence.game;  

    let infore = new Discord.RichEmbed()
    .setTitle("Game Status by lousyfox")
    .setThumbnail(target.presence.game.assets.largeImageURL)
    .setFooter("Твой милый бот", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setTimestamp()
    .setColor("#FFDF00")
    .addField("Название игры:", target.presence.game.name, true)
    .addField("Статус игры:", target.presence.game.state, true)
    .addField("URL иконки игры:", target.presence.game.assets.largeImageURL, true)
    .addField("Тип игры:", target.presence.game.type, true)
    .addField("Детали игры:", target.presence.game.details, true)
    .addField("Фулл с консоли:", target.presence.game);

    message.channel.send({embed:infore})
    console.log(game);
};
module.exports.command = {
    name: 'gamestats',
    aliases: ["статс", "тестстатус", "тс"],
    description: "Отправляет в канал какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 