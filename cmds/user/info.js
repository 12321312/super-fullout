const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
 let channels = message.guild.channels.filter(c => c.type === 'voice');

  let infore = new Discord.RichEmbed()
  .setTitle("Информация о сервере ~F76-Свидетели полураспада~")
  .setThumbnail(message.guild.iconURL)
  .setFooter("Твой милый бот", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
  .setTimestamp()
  .setColor("#FFDF00")
  .addField("Всего участников:", message.guild.members.size, true)
  .addField("Всего онлайн:", message.guild.members.filter(m => m.presence.status === 'online').size, true)
  .addField("Участников в голосе:", channels.members, false)
  .addField("Мой пинг:", "-" + bot.ping , true)
  .addField("Твой пинг:", message.createdTimestamp - Date.now(), true)
  .addField("ID сервера:", message.guild.id)
  .addField("Регион сервера:", message.guild.region)
  .addField("Вы вошли на сервер:",message.member.joinedAt)
  .addField("Создан сервер:", message.guild.createdAt, true);



    message.channel.send({embed:infore}).then(async msg => await msg.delete(15000));
    message.delete(15000);
};
module.exports.command = {
  name: 'info',
  aliases: ["серверинфо", "инфосервер", "инфопросервер", "инфо"],
  description: "Инфа о сервере, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 