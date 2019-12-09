const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');
let mention = message.mentions.users.first();
message.delete();
    if (!mention) {
if (!(args[0])) return message.reply('А сколько удалять то? \n Напиши: `!удалить <число>`');
if ((args[0]) >= 100) return message.reply('Больше 100 за раз не могу ;с');
const fetched = await message.channel.fetchMessages({limit: args[0]});
let mutechannel = message.guild.channels.get("629570190769913876");
if(!mutechannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");
let clearmess = new Discord.RichEmbed()
.setDescription("Удалены сообщения")
.setColor('#FFFFFF')
.setThumbnail("https://api.icons8.com/download/62a92be89dfeaf8aad2ac897c989cae6875429c2/windows8/PNG/512/Industry/trash-512.png")
.setFooter("Клеар месседжер v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.addField("Администратор:", `${message.author}`, true)
.addField("Канал:", message.channel, true)
.addField("Удалено:", fetched.size, true);

console.log(fetched.size + ' сообщения найдены, удаление...'); 
message.channel.send('Удалено `' + fetched.size + '` сообщений');            
message.channel.bulkDelete(fetched)
mutechannel.send({embed:clearmess})
.catch(error => message.channel.send(`Error: ${error}`)); 

} else {
  if (!(args[1])) return message.reply('А сколько удалять то? \n Напиши: `!удалить <упоминание> <число>`');
  if ((args[1]) >= 100)  return message.reply('Больше 100 за раз не могу ;с'); 
  
  let mention = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if (mention.id == "294844223675564034") return message.reply('а пизды не дать?');
  if (mention.id == "565899297187692544") return message.reply('я тя ща сам удалю, сука');
  if (mention.roles.get("565899297187692544")) return message.reply('ботов, сука, не трогай');
  fetched = await message.channel.fetchMessages({limit: args[1]});
  fetched = fetched .filter(m => m.createdTimestamp >= Date.now() - 1179360000);
  if (mention) fetched = fetched.filter(m => m.author.id === mention.id || m.content === message.content);
  

  let mutechannel = message.guild.channels.get("629570190769913876");
  if(!mutechannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");
  let clearmess = new Discord.RichEmbed()
  .setDescription("Удалены сообщения участника")
  .setColor('#FFFFFF')
  .setTimestamp()
  .setThumbnail("https://api.icons8.com/download/62a92be89dfeaf8aad2ac897c989cae6875429c2/windows8/PNG/512/Industry/trash-512.png")
  .setFooter("Клеар месседжер v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
  .addField("Администратор:", `${message.author}`, true)
  .addField("Канал:", message.channel, true)
  .addField("Удаленного:", `<@${mention.id}>`, true)
  .addField("Удалено:", fetched.size, true);


  console.log(fetched.size + ' сообщения пользователя ' + `${mention.user.tag}` + ' найдены, удаление...'); 
  message.channel.send('Удалено `' + fetched.size + '` сообщений пользователя ' + `<@${mention.id}>`);       
  message.channel.bulkDelete(fetched)
  mutechannel.send({embed:clearmess})
  .catch(error => message.channel.send(`Error: ${error}`)); 
};
};
module.exports.command = {
    name: 'clear',
    aliases: ["очистить", "удалить", "стереть"],
    description: "Удаляет всё нахуй, чо доебался?",
    usage: "admincommand",
    category: "admin",
    enabled: true
}; 