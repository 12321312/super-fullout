const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.'); 
    if (!args[0]) return message.reply("не указан канал из которого следует переместить");
    if (!args[1]) return message.reply("не указан канал в который следует переместить");
    let targetChannels = bot.channels.get(args[0]);
    if(!targetChannels) return message.reply("канала из которого вы хотите перетащить - нет");
    let moveChannels = bot.channels.get(args[1]);
    if(!moveChannels) return message.reply("канала в который вы хотите перетащить - нет");
    let tarhet = targetChannels.members;    
    if(!tarhet) return message.reply("В этом канале нет участников");
    let koltarhet = tarhet.size;
    if(koltarhet === 0) return message.reply("нет участников");
    let perepis = tarhet.filter(r => r).map(r => r).join(', ');

    let infore = new Discord.RichEmbed()
    .setTitle("Учасников перетащили")
    .setThumbnail("https://avatanplus.com/files/resources/original/5a16589dca5bc15fe74a2885.png")
    .setFooter("Твой милый бот", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setTimestamp()
    .setColor("#30D5C8")
    .addField("Администратор:", `<@${message.author.id}>`, false);
    infore.addField("Из канала:", targetChannels, false); 
    infore.addField("В канал:", moveChannels, false);
    infore.addField(koltarhet + " участников:", perepis, true);
    
     tarhet.forEach(function(r, i) {
      r.setVoiceChannel(moveChannels);
     });  
 

    let logchannel = message.guild.channels.get("629570190769913876");
    if(!logchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");
    //console.log(perepis);
    logchannel.send({embed:infore});
};
module.exports.command = {
    name: 'move',
    aliases: ["мув", "перетащить", "перенести"],
    description: "Отправляет в канал какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 