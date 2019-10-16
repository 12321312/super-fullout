const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent");

exports.run = async (bot, message, args) => { 
  let xip = await superagent
  .get(`https://api.bethesda.net/status/ext-server-status?product_id=8`);
  let status = xip.body.platform.response.fallout76;
  let urlst;
  let colorst;

  if(status === "UP") {
    status = "Онлайн";
    urlst = "https://cdn.icon-icons.com/icons2/894/PNG/512/Tick_Mark_icon-icons.com_69146.png";
    colorst = "#00FF00";
  } else {
    status = "Недоступен";
    urlst = "http://s1.iconbird.com/ico/0612/prettyoffice/w256h2561339405847Delete256.png";
    colorst = "#FF0000";
  };  

  console.log(xip.body.platform.response.fallout76); 

      let ambed = new Discord.RichEmbed()
      .setTimestamp()
      .setColor(colorst)
      .setThumbnail(urlst)
      .addField("Статус сервера:", status);

      message.channel.send({embed:ambed}); 

}; 


module.exports.command = {
    name: 'dostup',
    aliases: ["статус", "доступ", "сервер", "запущен", "с"],
    description: "Показывает пинг, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 
