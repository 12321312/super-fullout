const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 
exports.run = async (bot, message, args,) => { 
if (message.author.id == "294844223675564034" || message.author.id == "517592996149985291" || message.author.id == "220916275562545153" || message.author.id == "336832506898939904") {
if (!(args[0])) return message.reply("Вы не указали участника.");
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!tomute) return message.reply("Участник не найден.");
message.delete();
let donrole = message.guild.roles.find('name', "Бригада");

if(tomute.roles.get('636042097085906946')){
await(tomute.removeRole(donrole.id));
message.reply(`Забрал роль <@&${donrole.id}> у пользователя <@${tomute.id}>.`);
} else {
await(tomute.addRole(donrole.id));
message.reply(`Выдал роль <@&${donrole.id}> пользователю <@${tomute.id}>.`);
};
} else return message.reply('нет доступа.'); 

};
module.exports.command = {
    name: 'brigada',
    aliases: ["бригада", "brigada", "brig"],
    description: "Выдаёт кик нахуй, чо доебался?",
    usage: "admincommand",
    category: "admin",
    enabled: true
}; 
