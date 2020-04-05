const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
let randonciks = Math.floor(Math.random() * 9999999999999) + 1 ;
let randonnaplrr = Math.floor(Math.random() * (args[0])) + 1 ;   

if (isNaN(args[0])) return message.reply("Ты бы число указывал, да? Откуда мне брать его? Ну на рандомное: **"+randonciks+"**, первое что на ум пришло."); 
if ((args[0]) >= 100000) return message.reply('А не жирно будет? Го меньше символов.');
if (1 >= (args[0])) return message.reply('А не ну збс, результат сам знаешь.');
message.reply("**" + randonnaplrr + "**"); 
};
module.exports.command = {
    name: 'roll',
    aliases: ["ролл", "рандомноечисло", "рандомн"],
    description: "Ебанный ролл, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 
