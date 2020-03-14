const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
if(!message.member.roles.some(r=>["Розовое чудо", "Администрация", "Модератор"].includes(r.name))) return message.reply('У вас нет прав на вызов админ-меню.');
let zhanei = message.member.roles.filter(r => r.name !=="@everyone" && r.name == "Розовое чудо" || r.name == "Администрация" || r.name == "Модератор").map(r => r).join(', ')
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Админ Команды:")
    .setDescription(`Доступны для: ${zhanei}`)
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#c10020')
    .setThumbnail("http://www.sclance.com/pngs/admin-png/admin_png_17235.jpg")
    .addField("!админка","Вызывает это окно");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация", "Модератор"].includes(r.name))) ambed.addField("!варн *<юзер> <причина>*","Выдает варн пользователю. Подробнее '!варн'");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!мут *<юзер> <время(1s|1m|1h|1d|1w)> <причина>*","Запрещает писать в чат на указанное время.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!унмут *<юзер>*","Снимает мут.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!бан *<юзер> <причина>*","Банит юзера на сервере.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!кик *<юзер>*","Кикает юзера на сервере.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!регион *<регион>*","Меняет на нужный регион сервер.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!удалить *<юзер> <кол-во>*","Удаляет сообщение пользователя в указаном кол-ве, можно удалить все, указав только кол-во.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!мув *<id канала из> <d канала в>*","Перетаскивает всех пользователей в нужный канал.");
    if(message.member.roles.some(r=>["Розовое чудо", "Администрация"].includes(r.name))) ambed.addField("!промо *<юзер>*","Выдает не много монет и звание 'избранный', действует как промо-акция для активных игроков.");
    if(message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) ambed.addField("!поинт *<юзер> <кол-во> <изменить/добавить/снять>*","Изменяет кол-во поинтов у выбранного пользователя");
    if(message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) ambed.addField("!хп *<юзер> <кол-во> <изменить/добавить/снять>*","Изменяет кол-во хп у выбранного пользователя");
    if(message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) ambed.addField("!канал *<сообщение>*","Пишет сообщение в канал от имени бота");
    if(message.member.roles.some(r=>["Розовое чудо"].includes(r.name))) ambed.addField("!лс *<юзер> <сообщение>*","Пишет сообщение в в лс от имени бота");

    message.delete(15000);
    message.channel.send({embed:ambed}).then(async msg => await msg.delete(15000));

};
module.exports.command = {
    name: 'admincommand',
    aliases: ["админка", "админкоманды", "админменю", "adminmenu"],
    description: "обычная админка, чо доебался?",
    usage: "admincommand",
    category: "admin",
    enabled: true
}; 
