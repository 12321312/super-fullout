const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot,message,args,connection) => {
    let a = message.author;
    let warn;
    let warn2;
    let warn3;
    connection.query(`SELECT * FROM xp WHERE id = '${a.id}'`, async (err, rows) => {
      connection.query(`SELECT * FROM warn WHERE id = '${a.id}'`, async (err, rowstwo) => {
     if(err) throw err;
     if(rowstwo[0] != undefined) {
     warn = rowstwo[0].one;
     warn2 = rowstwo[0].two;
     warn3 = rowstwo[0].tri;
     }
     let xpi = rows[0].xp;
     let point = rows[0].point; 

     let lvl;
     if (xpi && xpi >= 1000) {
        lvl = xpi / 1000
     } else {
        lvl = 1
     }

    if (lvl < lvl.toFixed(0)) lvl -= 1;

    let zhanei = message.member.roles.filter(r => r.name !=="@everyone" && r.name == "Розовое чудо" || r.name == "zxz-tv" || r.name == "Выходец из убежища" || r.name == "Администрация" || r.name == "Модератор" || r.name == "Охотник на зверожогов" || r.name == "Легенда пустошей" || r.name == "Потрошитель" || r.name == "Опытный" || r.name == "Житель" || r.name == "Неизвестный" || r.name == "Nitro Booster 🔰").map(r => r).join(', ')
    if(!zhanei) zhanei = "нету";
    
    let keys = message.member.roles.filter(r => r.name !=="@everyone" && r.name == "secret-key" || r.name == "music-key" || r.name == "key-hut" || r.name == "key01").map(r => r).join(', ')
    let pole = "Мужской"; 
    if (message.member.roles.find('name', `Девушка в пустоши`)) pole = "Женский";
    let fallo = 0;
    if (message.member.roles.find('name', `Избранный`)) fallo = 1;
    if (message.author.id == "294844223675564034") pole = "Ебёт лисичек";
    let oritn = "Не установленно";

    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setThumbnail(a.avatarURL)
    .setColor('#10c7e2')
    .addField("Имя",a.username, true)
    .addField("Тэг",a.tag, true)
    .addField("Пол:",pole, true)
    .addField("Статус",a.presence.status, true)
    .addField("Опыта:",xpi + " XP", true)
    .addField("Уровень:",lvl.toFixed(0), true) 
    .addField("Донат поинтов:",point, true)
    .addField("Звание:",zhanei, true)
    .addField("ID индификатор:",a.id, true);
    if(fallo === 1) ambed.addField("**Участник промо акции.**", "", true);
    if(keys) ambed.addField("Ключи:", keys, true);
    if(warn && !warn2) ambed.addField("Варны:", `**1**: ${warn}`, true);
    if(warn2 && !warn3) ambed.addField("Варны:", `**1**: ${warn}\n**2**: ${warn2}`, true);
    if(warn3) ambed.addField("Варны:", `**1**: ${warn}\n**2**: ${warn2}\n**2**: ${warn3}`, true);
    ambed.addField("Создание аккаунта:",a.createdAt, false);
     
     message.delete(15000);
     message.channel.send({embed:ambed}).then(async msg => await msg.delete(15000));
})});
};
module.exports.command = {
   name: 'userinfo',
   aliases: ["юзеринфо", "инфо", "карточка"],
   description: "показывает информацию о клиенте, чо доебался?",
   usage: "usercommand",
   category: "user",
   enabled: true
}; 