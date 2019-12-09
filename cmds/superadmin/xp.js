const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot,message,args,connection) => {
    if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю'); 
    if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!хп <юзер упоминание> <+/-хп>```");
    let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!target) return message.reply("такого участника нету");

    connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length < 1) {
    sql = `INSERT INTO xp (id, xp, point, zvania, mute) VALUES ('${target.id}', 0, 0, 0, 0)`;
    message.reply(`успешно записал пользователя <@${target.id}> в базу данных`);
    } else {
    let xp = rows[0].xp;
    sql = `UPDATE xp SET xp = ${xp} WHERE id = '${target.id}'`
    if (!(args[1])) {
        bot.send(`остаток опыта <@${target.id}> на данный момент: ` + `\`\`\`js\n${xp} XP\`\`\``);
      } else {
          if(!(args[2])){         
            message.delete();
            sql = `UPDATE xp SET xp = ${args[1]} WHERE id = '${target.id}'`  
            bot.send(`Изменил кол-во XP у пользователя <@${target.id}>. \nВсего опыта у пользователя: ` + `\`\`\`js\n${args[1]} XP\`\`\``);
        } else if ((args[2]) == "добавить") {
            message.delete();
            sql = `UPDATE xp SET xp = ${xp}+${args[1]} WHERE id = '${target.id}'`  
            bot.send(`Добавил пользователю <@${target.id}> - **${args[1]}** XP. \nВсего опыта у пользователя на данный момент: ` + `\`\`\`js\n${Number(xp) + Number(args[1])} XP\`\`\``);
        } else if ((args[2]) == "снять") {
            message.delete();
            sql = `UPDATE xp SET xp = ${xp}-${args[1]} WHERE id = '${target.id}'`  
            bot.send(`Снял пользователю <@${target.id}> - **${args[1]}** XP. \nВсего опыта у пользователя на данный момент: ` + `\`\`\`js\n${Number(xp) - Number(args[1])} XP\`\`\``);
        } 
      };
    };
    connection.query(sql);

});
};
module.exports.command = {
    name: 'xp',
    aliases: ["xp", "хп"],
    description: "хп ебанное, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 
