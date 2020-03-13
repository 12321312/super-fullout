const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');
    let target = message.mentions.members.first() || message.guild.members.get(args[0]);      
    let game = target.presence.game;  
    let icogame = target.presence.game.assets.largeImageURL;
    let namegame = target.presence.game.name;
    let statsgame = target.presence.game.state;
    let typegame = target.presence.game.type;
    let detailgame =  target.presence.game.details;


    let infore = new Discord.RichEmbed()
    .setTitle("Game Status by lousyfox")
    .setThumbnail(icogame)
    .setFooter("Твой милый бот", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setTimestamp()
    .setColor("#FFDF00")
    .addField("Название игры:", namegame, true)
    .addField("Статус игры:", statsgame, true)
    .addField("URL иконки игры:", icogame, true)
    .addField("Тип игры:", typegame, true)
    .addField("Детали игры:", detailgame, true)
    .addField("Фулл с консоли:", game);

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