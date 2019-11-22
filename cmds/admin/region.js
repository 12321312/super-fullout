const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');
message.delete(15000);

let regionEmbed = new Discord.RichEmbed()
.setTitle("Регион сервера изменен")
.setThumbnail("http://pngimg.com/uploads/earth/earth_PNG39.png")
.setFooter("Регион систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.setTimestamp()
.setColor("#FFDF00")
.addField("Администратор:", `<@${message.author.id}>`)
.addField("Был регион:", message.guild.region, true);

let logchannel = message.guild.channels.get("629570190769913876");
if(!logchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");


if ((args[0]) == "Россия" || (args[0]) == "россия" || (args[0]) == "рус" || (args[0]) == "rus" || (args[0]) == "russia" || (args[0]) == "Russia") {
  if (message.guild.region == "russia") return message.reply('Сейчас и так этот регион.').then(async msg => await msg.delete(15000));
  regionEmbed.addField("Изменен на:", "russia", true);
  logchannel.send({embed:regionEmbed});
message.guild.setRegion('russia');
message.reply('поставлен регион сервера: *"Россия"*.').then(async msg => await msg.delete(15000));
return;
} else if ((args[0]) == "Европа" || (args[0]) == "европа" || (args[0]) == "евро" || (args[0]) == "Eur" || (args[0]) == "eur" || (args[0]) == "eu-central") {
 if (message.guild.region == "eu-central") return message.reply('Сейчас и так этот регион.').then(async msg => await msg.delete(15000));
 regionEmbed.addField("Изменен на:", "eu-central", true);
 logchannel.send({embed:regionEmbed});
message.guild.setRegion('eu-central'); 
message.reply('поставлен регион сервера: *"Центральная Европа"*.').then(async msg => await msg.delete(15000));
return;
} else if ((args[0]) == "japan" || (args[0]) == "singapore" || (args[0]) == "eu-central" || (args[0]) == "india" || (args[0]) == "us-central" || (args[0]) == "london" || (args[0]) == "eu-west" || (args[0]) == "amsterdam" || (args[0]) == "brazil" || (args[0]) == "dubai" || (args[0]) == "us-west" || (args[0]) == "hongkong" || (args[0]) == "us-south" || (args[0]) == "southafrica" || (args[0]) == "us-east" || (args[0]) == "sydney" || (args[0]) == "frankfurt" || (args[0]) == "russia") {
 if (message.guild.region == (args[0])) return message.reply('Сейчас и так этот регион.').then(async msg => await msg.delete(15000));
 regionEmbed.addField("Изменен на:", args[0], true);
 logchannel.send({embed:regionEmbed});
message.guild.setRegion(args[0]);
message.reply(`поставлен регион сервера: *"${args[0]}"*.`).then(async msg => await msg.delete(15000));
return;
} else if (!(args[0])) {
message.reply("укажите нужный вам регион. Регион сейчас установлен: **" + `${message.guild.region}` + "**\n```js\n Список: 'japan', 'singapore', 'eu-central', 'india', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'dubai', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt', 'russia'```").then(async msg => await msg.delete(15000));
return;
} else return message.reply('сервер не правильно указан.').then(async msg => await msg.delete(15000));
};

module.exports.command = {
  name: 'region',
  aliases: ["Регион", "Сменитьрегион", "Регионнахуй"],
  description: "Удаляет всё нахуй, чо доебался?",
  usage: "admincommand",
  category: "admin",
  enabled: true
}; 