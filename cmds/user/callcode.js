const Discord = module.require("discord.js");
const fs = require("fs");
const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://nukacrypt.com/`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

exports.run = async (bot, message, args) => { 
  rp(options)
  .then(($) => {
    let code = $('#nuclearcodess').text();
    let mcode = code.replace(/\s+/g, '');
    let alfa;
    let brava;
    let charli;
    let ckakogo;
    
    if (mcode.length == 96) {
     alfa = mcode.slice(48, -40);
     brava = mcode.slice(56, -32);
     charli = mcode.slice(64, -24);
     ckakogo = mcode.slice(17, -69);
    } else if (mcode.length == 97) {
     alfa = mcode.slice(49, -40);
     brava = mcode.slice(57, -32);
     charli = mcode.slice(65, -24);
     ckakogo = mcode.slice(18, -69);
    } else if (mcode.length == 95) {
      alfa = mcode.slice(49, -40);
      brava = mcode.slice(57, -32);
      charli = mcode.slice(65, -24);
      ckakogo = mcode.slice(18, -69);
    } else if (mcode.length == 69) {
      alfa = mcode.slice(45, -16);
      brava = mcode.slice(53, -8);
      charli = mcode.slice(61, 0);
      ckakogo = mcode.slice(0, 0);
     } else return message.reply("создатели nuka-script снова что-то намудрили, коды пока-что не доступны через меня, посмотри их на сайте: https://nukacrypt.com/");

    if (charli === "UNSOLVED") charli = "Нет данных.";
    if (brava === "UNSOLVED") brava = "Нет данных.";
    if (alfa === "UNSOLVED") alfa = "Нет данных.";
    
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle(`Коды запуска ракет:`)
    .setDescription(`https://nukacrypt.com/`)
    .setTimestamp()
    .setFooter("Система запуска.", "https://vignette.wikia.nocookie.net/fallout/images/c/c2/Icon_Vault_76.png/revision/latest?cb=20181217214332&path-prefix=ru")
    .setColor('#c10020')
    .addField("Альфа:", `**${alfa}**`, true)
    .addField("Браво:", `**${brava}**`, true)
    .addField("Чарли:", `**${charli}**`, true);
    if (args[0] == "+") ambed.addField("length:", `**${mcode.length}**`, false)
    if (args[0] == "+") ambed.addField("mcode:", `**${mcode}**`, false)

    if (message.author.id == "382528907544625155") { 
      message.reply('ты Фокса обижаешь, тебе коды не скажу.');
    } else message.channel.send({embed:ambed}); 
  })
  .catch((err) => {
    console.log(err);
  })
}; 


module.exports.command = {
    name: 'callcode',
    aliases: ["код", "коды", "бункер", "запуск", "ракеты"],
    description: "Показывает пинг, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 
