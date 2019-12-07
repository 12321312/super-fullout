const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot,message,args,connection) => {
if(!message.member.roles.some(r=>["Розовое чудо", "Администрация", "Модератор"].includes(r.name))) return message.reply('Отказано в доступе.');

let WarnES = new Discord.RichEmbed()
.setTitle(`Подробнее о варнах:`)
.setTimestamp()
.setThumbnail("https://png.pngtree.com/svg/20170421/4d1c159c9e.png")
.setFooter("Варн систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.setColor("#F5F5DC")
.addField(`Узнать варны:`, `!варн *<юзер упоминание>*`)
.addField(`Отправить варны:`, `!варн *<юзер упоминание> <причина>*`);
if (message.member.roles.some(r=>["Лисий повелитель", "Куратор"].includes(r.name))) WarnES.addField(`Снять варн:`, `!варн *<юзер упоминание> снять*`);
if (!(args[0])) { 
message.delete(15000)
message.channel.send({embed:WarnES}).then(async msg => await msg.delete(15000));
return;
}
let wReason = args.slice(1).join(" ") || "---";
let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!target) return message.reply("такого участника нету");
if(target.roles.some(r=>["Розовое чудо", "Администрация", "Модератор"].includes(r.name))) return message.reply("админов варнить нельзя");
if(target.roles.some(r=>["NPC"].includes(r.name))) return message.reply("ботов варнить нельзя");  

connection.query(`SELECT * FROM warn WHERE id = '${target.id}'`, (err, rows) => {
    let logEmbed = new Discord.RichEmbed()
    .setTitle("Выдан варн.")
    .setColor('#F5F5DC')
    .setTimestamp()
    .setThumbnail("https://png.pngtree.com/svg/20170421/4d1c159c9e.png")
    .setFooter("Варн систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .addField("Был выдан:", `${target}`, true)
    .addField("Администратор:", `${message.author}`, true)
    .addField("Канал:", message.channel, true)
    .addField("Причина:", wReason, false);    
 if(err) throw err;
   let sql;
    if(rows.length < 1) {
      message.delete();  
      if (!(args[1])) return message.reply(`у пользователя <@${target.id}> нет варнов.`).then(async msg => await msg.delete(15000));    
      if ((args[1]) == "снять") return message.reply(`у пользователя <@${target.id}> нет варнов.`).then(async msg => await msg.delete(15000));
      sql = `INSERT INTO warn (id, one, onea, two, twoa, tri, tria) VALUES ('${target.id}', '${wReason}', '${message.author.id}', NULL, NULL, NULL, NULL)`;
      bot.send(`Выдал варн <@${target.id}> с причиной **"${wReason}"**`);
      connection.query(sql);
     } else {
     let warn1 = rows[0].one;
     let warn1a = rows[0].onea;
     let warn2 = rows[0].two;  
     let warn2a = rows[0].twoa;
     let warn3 = rows[0].tri;
     let warn3a = rows[0].tria;
     let muterole = message.guild.roles.find('name', "muted");
     
     if ((args[1]) == "снять") {
     if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор"].includes(r.name))) return message.reply('Отказано в доступе.');    
     sql = `DELETE FROM warn WHERE id = '${target.id}'`
     message.delete();    
     message.channel.send(`Снял все варны с <@${target.id}>`);
     connection.query(sql);
     if (target.roles.get(muterole.id)) target.removeRole(muterole.id);
     return; 
     }

     if (!(args[1])) {
        let WarnEmbed = new Discord.RichEmbed()
        .setTitle(`Варны пользователя:`)
        .setDescription(`${target}`)
        .setTimestamp()
        .setThumbnail("https://png.pngtree.com/svg/20170421/4d1c159c9e.png")
        .setFooter("Варн систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
        .setColor("#F5F5DC")
        .addField(`Первый варн`, `От <@${warn1a}> с причиной: **${warn1}**`);
        if (warn2) WarnEmbed.addField(`Второй варн`, `От <@${warn2a}> с причиной: **${warn2}**`);
        if (warn3) WarnEmbed.addField(`Третий варн`, `От <@${warn3a}> с причиной: **${warn3}**`);

         message.channel.send({embed:WarnEmbed}).then(async msg => await msg.delete(15000));
         message.delete(15000);
         return; 
     }                   
      if (!warn2) {
      sql = `UPDATE warn SET two = '${wReason}', twoa = ${message.author.id} WHERE id = '${target.id}'`
      message.channel.send(`Выдал второй варн <@${target.id}> с причиной **"${wReason}"**`);
      connection.query(sql);
      message.delete();
      } else if (!warn3) {
        sql = `UPDATE warn SET tri = '${wReason}', tria = ${message.author.id} WHERE id = '${target.id}'`
        message.channel.send(`Выдал третий варн <@${target.id}> с причиной **"${wReason}"** и замутил **НАВСЕГДА**`);
        connection.query(sql);
        message.delete();
        target.addRole(muterole.id)
        logEmbed.addField("Был замучен навсегда", "Набрано 3 варна.", false);
      } else if (warn3) {
        if (target.roles.get(muterole.id)) return message.reply('Он в муте, выдать варн нельзя.'); 
        message.channel.send(`За большое кол-во варнов, замутил пользователя <@${target.id}>, повторно.`);
        target.addRole(muterole.id); 
        return;
      }  
     }
     
     let logsss = message.guild.channels.get("629570190769913876");
     if(!logsss) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");
     logsss.send({embed:logEmbed});      
});         
};
module.exports.command = {
  name: 'warn',
  aliases: ["варн", "варнед", "заварнить"],
  description: "Удаляет всё нахуй, чо доебался?",
  usage: "admincommand",
  category: "admin",
  enabled: true
}; 
