const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 
exports.run = async (bot, message, args,) => { 
if (message.author.id == "294844223675564034" || message.author.id == "522048666144342016" || message.author.id == "532243050601250816" || message.author.id == "372827085661667349" || message.author.id == "565177648683155524") {
if (!(args[0])) return message.reply("you did not specify a participant.");
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!tomute) return message.reply("member not found, sorry.");
message.delete();
let donrole = message.guild.roles.find('name', "Dukes of Nukes");

if(tomute.roles.get('632205691104395266')){
await(tomute.removeRole(donrole.id));
message.reply(`took a role <@&${donrole.id}> the user <@${tomute.id}>.`);
} else {
await(tomute.addRole(donrole.id));
message.reply(`issued a role <@&${donrole.id}> the user <@${tomute.id}>.`);
};
} else return message.reply('access denied, sorry.'); 

};
module.exports.command = {
    name: 'dukesofnukes',
    aliases: ["don", "дон", "nukes"],
    description: "Выдаёт кик нахуй, чо доебался?",
    usage: "admincommand",
    category: "admin",
    enabled: true
}; 
