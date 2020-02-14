const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args, connection) => { 
if(!message.member.roles.some(r=>["Администрация", "Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');
message.delete();
let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!target) return message.reply("такого участника нету");
//if (target.id == "294844223675564034") return message.reply('да не трогайте фокса бл');
if (target.roles.get('677908522041868293')) return message.reply('он уже полчил бонус.');
let logchannel = message.guild.channels.get("629570190769913876");
if(!logchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");


let promorole = message.guild.roles.find('name', "Избранный");

connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length < 1) {
    sql = `INSERT INTO xp (id, xp, point, zvania, mute) VALUES ('${target.id}', 0, 0, 0, 0)`;
    message.reply(`успешно записал пользователя <@${target.id}> в базу данных, напишите команду снова.`);
    } else {
        let xp = rows[0].xp;
        let point = rows[0].point;
        let pointadd = point+5;
        let xpadd = xp+500;
    let regionEmbed = new Discord.RichEmbed()
        .setTitle("Выдан промо")
        .setThumbnail("http://www.pngall.com/wp-content/uploads/2016/07/Special-offer-PNG-Images.png")
        .setFooter("Special v2020", "https://upload.wikimedia.org/wikipedia/commons/8/88/Mini-Robot.png")
        .setTimestamp()
        .setColor("#FFDF00")
        .addField("Администратор:", `<@${message.author.id}>`)
        .addField("Пользователь:", `${target}`, true)
        .addField("Поинты:", `${pointadd}`, false);    

    
    if(xp >= 7500) {
    sql = `UPDATE xp SET xp = ${xpadd}, point = ${pointadd} WHERE id = '${target.id}'`  
    } else { 
    sql = `UPDATE xp SET xp = 7500, point = ${pointadd} WHERE id = '${target.id}'`      
    };
    if (!target.roles.get(promorole.id)) target.addRole(promorole.id);
    if (xp >= 7500) regionEmbed.addField("xp:", `${xpadd}`, true);   

    if (target.roles.get('629544609185267723')) { 
        target.addRole('629545463506534401'); 
        target.removeRole('629544609185267723');  
    };

    logchannel.send({embed:regionEmbed});
    };
    message.channel.send('Пользователю ' + `<@${target.id}>` + ' было выдано промо.');

    connection.query(sql);
});

};

module.exports.command = {
  name: 'promo',
  aliases: ["promo", "бонус", "промо"],
  description: "Удаляет всё нахуй, чо доебался?",
  usage: "admincommand",
  category: "admin",
  enabled: true
}; 