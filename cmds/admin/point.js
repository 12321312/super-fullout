const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args,connection) => { 
    if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю');
    if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!поинт <юзер упоминание> <+/-поинты>```");
    let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!target) return message.reply("такого участника нету");
    
    
    connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length < 1) {
    sql = `INSERT INTO xp (id, xp, point, zvania, mute) VALUES ('${target.id}', 0, 0, 0, 0)`;
    message.reply(`успешно записал пользователя <@${target.id}> в базу данных`);
    } else {
    let point = rows[0].point;
    sql = `UPDATE xp SET point = ${point} WHERE id = '${target.id}'`
    if (!(args[1])) {
        message.reply(`остаток баланса <@${target.id}> на данный момент: ` + `\`\`\`js\n${point}\`\`\``);
      } else {
          if(!(args[2])){         
            message.delete();
            sql = `UPDATE xp SET point = ${args[1]} WHERE id = '${target.id}'`  
            bot.send(`Изменил кол-во поинтов у пользователя <@${target.id}>. \n остаток баланса пользователя на данный момент: ` + `\`\`\`js\n${args[1]}\`\`\``);
         } else if((args[2]) == "добавить") {
            message.delete();
            sql = `UPDATE xp SET point = ${point}+${args[1]} WHERE id = '${target.id}'`  
            bot.send(`Добавил пользователю <@${target.id}> - **${args[1]}** поинтов. \nОстаток баланса пользователя на данный момент: ` + `\`\`\`js\n${Number(point) + Number(args[1])}\`\`\``);
         } else if((args[2]) == "снять") {
            message.delete();
            sql = `UPDATE xp SET point = ${point}-${args[1]} WHERE id = '${target.id}'`  
            bot.send(`Снял пользователю <@${target.id}> - **${args[1]}** поинтов. \nОстаток баланса пользователя на данный момент: ` + `\`\`\`js\n${Number(point) - Number(args[1])}\`\`\``);
       } 
      };
    };
    connection.query(sql);

});
};
module.exports.command = {
  name: 'point',
  aliases: ["поинт", "поинты", "выдатьпоинты"],
  description: "Выдаёт поинты, чо доебался?",
  usage: "foxcommand",
  category: "fox",
  enabled: false
}; 
