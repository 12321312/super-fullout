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
    
    let alfa = mcode.slice(47, -40);
    let brava = mcode.slice(55, -32);
    let charli = mcode.slice(63, -24);
    let ckakogo = mcode.slice(17, -69);

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

    message.channel.send({embed:ambed});    
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
