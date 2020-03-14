const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) return message.reply('Отказано в доступе.');  
    let targetChannels = bot.channels.get(args[0]);
    let tarhet = targetChannels.members.username;

    message.channel.send(tarhet);
/*   
     let targetChannels = bot.channels.get(args[0]);
    let moveChannels = bot.channels.get(args[1]);
    let tarhet = targetChannels.members;

    tarhet.forEach(function(r, i) {
        r.setVoiceChannel(moveChannels);
       });  
*/
};
module.exports.command = {
    name: 'move',
    aliases: ["мув", "перетащить", "перенести"],
    description: "Отправляет в канал какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 