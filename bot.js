const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
const invites = {};
const wait = require('util').promisify(setTimeout);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const loadCommands = module.exports.loadCommands = (dir = "./cmds/") => {
    fs.readdir(dir, (error, files) => {                 
        if (error) return console.log(error); 
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
        console.log(`Загружено ${jsfiles.length} комманд`);                   
        files.forEach((file) => {   
            if (fs.lstatSync(dir + file).isDirectory()) {
                loadCommands(dir + file + "/");
                return;
            }

            delete require.cache[require.resolve(`${dir}${file}`)];

            let props = require(`${dir}${file}`);

            bot.commands.set(props.command.name, props);

            if (props.command.aliases)  props.command.aliases.forEach(alias => { 
                bot.aliases.set(alias, props.command.name); 
            });
        });
    });
};
loadCommands();


// При загузке
bot.on('ready', () => {
    wait(1000);
    console.log('Запущен, сэр!');
    bot.user.setPresence({
           status: "online",
           game: {
               name: "запуск ядерной бомбы",
               url: "https://www.youtube.com/watch?v=6uCTdjTjbWA",
               type: "STREAMING"
           }
       });   
    bot.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
          invites[g.id] = guildInvites;
        });
      });
  });


// Автороль + логирование
bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.get("629544609185267723");
    member.addRole(role);
    console.log('User ' + member.user.tag + ' зашёл на сервер!');
    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => !ei.get(i.code) || ei.get(i.code).uses < i.uses);
        const inviter = invite.user || 'Неизвестно';
        let channel = bot.channels.get("629570190769913876");
        let Vshde = new Discord.RichEmbed()
        .setTitle("Зашёл на сервер")
        .setTimestamp()
        .setThumbnail("https://i.ibb.co/9r6FD3J/image.png")
        .setFooter("Лог мастер 2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
        .setColor("#54ff9f")
        .setTimestamp()
        .addField("Зашёл:", `<@${member.user.id}>`, true);
        Vshde.addField("Пригласил:", `<@${invite.inviter.id}>`, true);
        Vshde.addField("Ссылка:", `https://discord.gg/${invite.code}`, true);
        if (invite.maxUses > 0) Vshde.addField("Инвайт использован:", `${invite.uses}/${invite.maxUses} раз`, true); 
        if (invite.maxUses == 0) Vshde.addField("Инвайт использован:", `${invite.uses}/∞ раз`, true); 
        channel.send({embed:Vshde});
    });
});

bot.on('guildMemberRemove', member => {
    console.log('User ' + member.user.tag + ' вышел с сервера!');
    let gggrole = member.roles.filter(r => r.name !=="@everyone").map(r => r).join(', ')
    if (!gggrole) gggrole = "не было";
    let channel = bot.channels.get("629570190769913876");
    let Vshdex = new Discord.RichEmbed()
    .setTitle("Вышел с сервера")
    .setTimestamp()
    .setThumbnail("https://i.ibb.co/QkmrYsK/image.png")
    .setFooter("Лог мастер 2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setColor("#f80000")
    .addField("Вышел:", `<@${member.user.id}>`, true)
    .addField("Были роли:", gggrole, false);
    channel.send({embed:Vshdex});
  });
  

// login 
bot.login(process.env.BOT_TOKEN);