const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Команды:")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#FFFF00')
    .addField("!хелп","Вызывает это окно")
    .addField("!пинг","Устанавливает точное время соединение клианта с сервером")
    .addField("!ролл <цифра>","выдает рандомное число из нужного диапозона")
    .addField("!юзеринфо","Показывает всю информацию о клиенте")
    .addField("!серверинфо","Показывает информацию о сервере")
    .addField("!правила","Отправляет вам в личные сообщения правила дискорд сервера")
    .addField("!ютуб <название ролика>","Выводит ролик с ютуба в чат по названию.")
    .addField("!репорт <юзер> <причина>","Отправляет репорт администрации сервера на участника.")
    .addField("!коды","Покажет коды от бункеров альфа, брава и чарли.")
    .addField("!статус","Покажет доступ к серверам фаллаут.")
    .setThumbnail("http://pngimg.com/uploads/question_mark/question_mark_PNG73.png")

    message.delete(15000);
    message.channel.send({embed:ambed}).then(async msg => await msg.delete(15000));

};
module.exports.command = {
    name: 'help',
    aliases: ["хелп", "хелпменю", "меню"],
    description: "Открывает меню, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 
