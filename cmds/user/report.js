const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
    if(args[0] == "help"){
      message.reply("Не правильная жалоба, напиши так: ```!репорт <юзер упоминание> <причина>```");
      return;
    }
    if (!(args[0])) {message.reply("Не правильная жалоба, напиши так: ```!репорт <юзер упоминание> <причина>```"); return; }
    if (!(args[1])) {message.reply("Не правильная жалоба, напиши так: ```!репорт <юзер упоминание> <причина>```"); return; }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let rFox = message.guild.members.get("294844223675564034");
    if (rUser == rFox) return message.reply("Нахуй сходи, ок?"); 
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Репорт")
    .setColor('#c10020')
    .setTimestamp()
    .setThumbnail("http://pngimg.com/uploads/gavel/gavel_PNG45.png")
    .setFooter("Репорт систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .addField("На:", `${rUser} ID: ${rUser.id}`)
    .addField("От:", `${message.author} ID: ${message.author.id}`)
    .addField("Канал:", message.channel)
    .addField("Время:", message.createdAt)
    .addField("Причина:", rreason);

    let reportschannel = message.guild.channels.get("636142949318787072");
    if(!reportschannel) return message.channel.send("Нет такого канала.");


    message.delete().catch(O_o=>{});
    reportschannel.send({embed:reportEmbed}).then(async msg => {
      await msg.react("📕");
  });

}

module.exports.command = {
  name: 'report',
  aliases: ["репорт", "жалоба", "репортет"],
  description: "Доёбывается до пользователя, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 