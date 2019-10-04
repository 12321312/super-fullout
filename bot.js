const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');

// При загузке
bot.on('ready', () => {
    console.log('Запущен, сэр!');
    bot.user.setPresence({
           status: "online",
           game: {
               name: "запуск ядерной бомбы",
               url: "https://www.youtube.com/watch?v=6uCTdjTjbWA",
               type: "STREAMING"
           }
       });   
  });

// login 
bot.login(process.env.BOT_TOKEN);