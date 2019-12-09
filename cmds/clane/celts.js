const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 
exports.run = async (bot, message, args,) => { 
if (message.author.id == "294844223675564034" || message.author.id == "526355222814130177") {
if (!(args[0])) return message.reply("Вы не указали участника.");
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!tomute) return message.reply("Участник не найден.");
message.delete();
let donrole = message.guild.roles.find('name', "Кельты");

if(tomute.roles.get('647189942308438026')){
await(tomute.removeRole(donrole.id));
message.reply(`Забрал роль <@&${donrole.id}> у пользователя <@${tomute.id}>.`);
} else {
await(tomute.addRole(donrole.id));
message.reply(`Выдал роль <@&${donrole.id}> пользователю <@${tomute.id}>.`);
};
} else return message.reply('нет доступа.'); 

};
module.exports.command = {
    name: 'celts',
    aliases: ["кельты", "келт", "celts"],
    description: "Выдаёт кик нахуй, чо доебался?",
    usage: "admincommand",
    category: "admin",
    enabled: true
}; 
