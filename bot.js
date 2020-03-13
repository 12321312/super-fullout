const Discord = require("discord.js");
const bot = new Discord.Client();
let config = require('./config.json');
let prefix = config.prefix;
const mysql = require("mysql");
const fs = require('fs');
const superagent = require("superagent");
const invites = {};
const wait = require('util').promisify(setTimeout);
const yourID = "294844223675564034"; 
const setupCMD = "!роль2";
const roles = ["secret-key"];
const reactions = ["🔞"];
const embedColor = "#000000"; 
const embedThumbnail = true; 
const embedThumbnailLink = "https://rating.pegi.info/images/games/age_threshold_icons/18.png"; 
let cooldown = new Set();
let cdseconds = 7;



// бот реакции
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

function generateEmbedFields() {
    return roles.map((r, e) => {
        return {
            emoji: reactions[e],
            role: r
        };
    });
}

function checkRole(guild, role) {
    const checkRole = guild.roles.find(r => r.name === role);
    if (checkRole) return true;
    else return false;
}

bot.on('error', console.error);


const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};


bot.on('raw', async event => {

    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (message.author.id === bot.user.id && ((message.embeds[0]))) {

            const fields = message.embeds[0].fields;

            for (let i = 0; i < fields.length; i++) {
                if (member.id !== bot.user.id) {
                    const role = message.guild.roles.find(r => r.name === fields[i].value);
                    if ((fields[i].name === reaction.emoji.name) || (fields[i].name === reaction.emoji.toString())) {
                        if (event.t === "MESSAGE_REACTION_ADD") {
                            member.addRole(role.id);
                            break;
                        } else {
                            member.removeRole(role.id);
                            break;
                        }
                    }
                }
            }
    }
});

process.on('unhandledRejection', err => {
    let msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error(`Unhandled Rejection: \n ${msg}`);
});

async function update() {
    let memstatus = bot.users.size;
    let memonline = bot.users.filter(m => m.presence.status === 'online').size + bot.users.filter(m => m.presence.status === 'idle').size + bot.users.filter(m => m.presence.status === 'dnd').size;
    let vflolow = bot.users.filter(m => m.presence.game != null && m.presence.game.type == 0 && m.presence.game.name === 'Fallout 76').size;
    let voiceChannels = bot.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    let voiceChs = bot.guilds.get('584827387607515137').channels.filter(c => c.id === '628604126149869569' || c.id === '584832686208843826' || c.id === '584832761123307541' || c.id === '584832781201309717' || c.id === '629554985331326996' || c.id === '629555066537508894' || c.id === '629555098523271178' || c.id === '629554945359872020')
    voiceChs.forEach(function(c, i) {
    let altolow = bot.guilds.get('584827387607515137').channels.get(c.id).members.filter(m => m.presence.game != null && m.presence.game.type == 0 && m.presence.game.name === 'ATLAS')
    });
    let xip = await superagent
    .get(`https://api.bethesda.net/status/ext-server-status?product_id=8`);
    let status = xip.body.platform.response.fallout76;   

    bot.channels.get("679181672482209840").setName(`📎Всего участников: ${memstatus}`);
    if(memstatus === 0) {
    bot.channels.get("679187435749507083").setName(`📎В онлайне никого нет`);
    } else {
    bot.channels.get("679187435749507083").setName(`📎Всего онлайн: ${memonline}`);
    };
    if(count === 0) {
    bot.channels.get("679195786856235018").setName(`📎В голосе никого нет`);
    } else {
    bot.channels.get("679195786856235018").setName(`📎В голосе: ${count}`);
    };
    if(vflolow > 0) {
    bot.channels.get("687890570894508032").setName(`📎В игре: ${vflolow}`);
    } else {
      bot.channels.get("687890570894508032").setName(`📎Никто не играет.`);
    };
    if(status === "UP") {
     bot.channels.get("679187372100812800").setName(`📎Сервера Fallout: ✅`);
    } else {
     bot.channels.get("679187372100812800").setName(`📎Сервера Fallout: ⛔`);
    };
    if(altolow) {
    altolow.forEach(function(m, i) {
      m.setVoiceChannel('671295673865601025');
     })
    };
}

// При загузке
bot.on('ready', () => {
    bot.setInterval(update, 30000);
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


// Подгрузка команд 
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const loadCommands = module.exports.loadCommands = (dir = "./cmds/") => {
    fs.readdir(dir, (error, files) => {                 
        if (error) return console.log(error);                    

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

// My SQL
// mysql
var consql = {
    host: process.env.HOST_MYSQL,
    user: process.env.LOGIN_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL
};

var connection;
 function handleDisconnect() {
    connection = mysql.createConnection(consql); 

    connection.connect(function(err) {              
        if(err) {                                     
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); 
        }                                    
      });  
      connection.on('error', function(err) {
        //console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
          handleDisconnect();                         
        } else {                                      
          throw err;                                  
        }
      });
    }
    handleDisconnect();

// XP
function generateXp() {
    let min = 2;
    let max = 98;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Ивент мессенжер
bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    bot.emit('checkMessage', message);
    bot.send = function (msg){
          message.channel.send(msg);
    };
    let inviteLink = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-zA-Z0-9]/gi;
    if (message.content.match(inviteLink)) {
       console.log(`Удален инвайт ${message.content} пользователя ${message.author.tag}`);
       message.delete();
    };

    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {
        const roleEmbed = new Discord.RichEmbed()
            .setTitle(`**Специализированные каналы:**`)
            .setDescription("```Если Вы хотите получить доступ к специализированным каналам с контентом +18, каналам без правил и полностью соглашаетесь с увиденным контентом в них, поставьте ниже реакцию.```")
            .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
            .setTimestamp();
    
        if (embedColor) roleEmbed.setColor(embedColor);
        if (embedThumbnail) roleEmbed.setThumbnail(embedThumbnailLink);
    
        const fields = generateEmbedFields();
        if (fields.length >= 25) throw "Максимум 25 ролей!";
    
        for (const f of fields) {
            if (!checkRole(message.guild, f.role)) throw `Роль '${role}' не найдена!`;
    
            const emoji = f.emoji;
            const customEmote = bot.emojis.find(e => e.name === emoji);
            
            if (!customEmote) roleEmbed.addField(emoji, f.role, true);
            else roleEmbed.addField(customEmote, f.role, true);
        }
    
        message.channel.send({embed:roleEmbed}).then(async m => {
            for (const r of reactions) {
                const emoji = r;
                const customEmote = bot.emojis.find(e => e.name === emoji);
                
                if (!customEmote) await m.react(emoji);
                else await m.react(customEmote.id);
            }
        });
    };  

// XP LOGGER
connection.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length < 1) {
     sql = `INSERT INTO xp (id, xp, point, zvania, mute) VALUES ('${message.author.id}', ${generateXp()}, 0, 0, 0)`
    } else {
     let target = message.member;
     let xp = rows[0].xp;
     let point = rows[0].point;
     let zvaniad = rows[0].zvania;
     let zvarl = `UPDATE xp SET zvania = ${zvaniad} WHERE id = '${message.author.id}'`
     sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`
 
    let xprole0 = message.guild.roles.find('name', "Выходец из убежища");
    let xprole1 = message.guild.roles.find('name', "Неизвестный");
    let xprole2 = message.guild.roles.find('name', "Житель");
    let xprole3 = message.guild.roles.find('name', "Опытный");
    let xprole4 = message.guild.roles.find('name', "Потрошитель");
    let xprole5 = message.guild.roles.find('name', "Охотник на зверожогов");
    let xprole6 = message.guild.roles.find('name', "Легенда пустошей");
    if(!message.member.roles.some(r=>["Розовое чудо", "zxz-tv"].includes(r.name)) ){
    if (xp > 0 && xp < 5000) {
    if (!target.roles.get(xprole0.id)) target.addRole(xprole0.id); 
    if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
    if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
    if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
    if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
    if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
    if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);    
    };       
    if (xp > 5000 && xp < 10000) { 
      if(zvaniad == 0) zvarl = `UPDATE xp SET zvania = 1 WHERE id = '${message.author.id}'`
      connection.query(zvarl);
        if (!message.member.roles.find('name', "Неизвестный")) {
        if (target.roles.get(xprole0.id)) target.removeRole(xprole0.id); 
        if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
        if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
        if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
        if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
        if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
        if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);       
        message.member.addRole(xprole1.id);  
         if (zvaniad == 0) {
          message.reply("поздравляю с новым званием <@&629545463506534401>! Вы набрали 5 уровень. Выдал вам **5 донат поинтов.**");
          let poitadd = `UPDATE xp SET point = ${point}+5 WHERE id = '${message.author.id}'`
          connection.query(poitadd);
         } else if (zvaniad == 1) {
          message.reply("Восстановил вам звание <@&629545463506534401>!");
         };
     }}
     if (xp > 10000 && xp < 20000) { 
      if(zvaniad == 1 || zvaniad == 0) zvarl = `UPDATE xp SET zvania = 2 WHERE id = '${message.author.id}'`
      connection.query(zvarl);
         if (!message.member.roles.find('name', "Житель")) {
            if (target.roles.get(xprole0.id)) target.removeRole(xprole0.id); 
            if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
            if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
            if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
            if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
            if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
            if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);     
          message.member.addRole(xprole2.id); 
           if (zvaniad == 1) {
            message.reply("поздравляю с новым званием <@&629545925223776266>! Вы набрали 10 уровень. Выдал вам **10 донат поинтов.**");
            let poitadd = `UPDATE xp SET point = ${point}+10 WHERE id = '${message.author.id}'`
            connection.query(poitadd);
           } else if (zvaniad == 2 || zvaniad == 0) {
            message.reply("Восстановил вам звание <@&629545925223776266>!");
           };
     }}
     if (xp > 20000 && xp < 35000) { 
       if(zvaniad == 2 || zvaniad == 0) zvarl = `UPDATE xp SET zvania = 3 WHERE id = '${message.author.id}'`
       connection.query(zvarl);   
         if (!message.member.roles.find('name', "Опытный")) {
            if (target.roles.get(xprole0.id)) target.removeRole(xprole0.id); 
            if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
            if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
            if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
            if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
            if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
            if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);     
          message.member.addRole(xprole3.id); 
           if (zvaniad == 2) {
            message.reply("поздравляю с новым званием <@&629546131969409024>! Вы набрали 20 уровень. Выдал вам **20 донат поинтов.**");
            let poitadd = `UPDATE xp SET point = ${point}+20 WHERE id = '${message.author.id}'`
            connection.query(poitadd);
           } else if (zvaniad == 3 || zvaniad == 0) {
            message.reply("Восстановил вам звание <@&629546131969409024>!");
           };
     }}
     if (xp > 35000 && xp < 70000) {
       if(zvaniad == 3 || zvaniad == 0) zvarl = `UPDATE xp SET zvania = 4 WHERE id = '${message.author.id}'`
       connection.query(zvarl); 
         if (!message.member.roles.find('name', "Потрошитель")) {
            if (target.roles.get(xprole0.id)) target.removeRole(xprole0.id); 
            if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
            if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
            if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
            if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
            if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
            if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);     
         message.member.addRole(xprole4.id);
          if (zvaniad == 3) { 
           message.reply("поздравляю с новым званием <@&629545985030488074>! Вы набрали 35 уровень. Выдал вам **40 донат поинтов.**");
           let poitadd = `UPDATE xp SET point = ${point}+40 WHERE id = '${message.author.id}'`
           connection.query(poitadd);
          } else if (zvania == 4 || zvania == 0) {
           message.reply("Восстановил вам звание <@&629545985030488074>!");
          };
     }}
     if (xp > 70000 && xp < 100000) {
       if(zvaniad == 4 || zvaniad == 0) zvarl = `UPDATE xp SET zvania = 5 WHERE id = '${message.author.id}'`
       connection.query(zvarl); 
         if (!message.member.roles.find('name', "Охотник на зверожогов")) {
            if (target.roles.get(xprole0.id)) target.removeRole(xprole0.id); 
            if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
            if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
            if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
            if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
            if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
            if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);     
         message.member.addRole(xprole5.id);
         if (zvaniad == 4) { 
         message.reply("поздравляю с новым званием <@&629546774213689346>! Вы набрали 70 уровень. Выдал вам **70 донат поинтов.**");
         let poitadd = `UPDATE xp SET point = ${point}+70 WHERE id = '${message.author.id}'`
         connection.query(poitadd);
         } else if (zvaniad == 5 || zvaniad == 0) {
         message.reply("Восстановил вам звание <@&629546774213689346>!");
         };
     }}
     if (xp > 100000) {
       if(zvaniad == 5 || zvaniad == 0) zvarl = `UPDATE xp SET zvania = 6 WHERE id = '${message.author.id}'`
       connection.query(zvarl); 
         if (!message.member.roles.find('name', "Легенда пустошей")) {
            if (target.roles.get(xprole0.id)) target.removeRole(xprole0.id); 
            if (target.roles.get(xprole1.id)) target.removeRole(xprole1.id); 
            if (target.roles.get(xprole2.id)) target.removeRole(xprole2.id); 
            if (target.roles.get(xprole3.id)) target.removeRole(xprole3.id); 
            if (target.roles.get(xprole4.id)) target.removeRole(xprole4.id); 
            if (target.roles.get(xprole5.id)) target.removeRole(xprole5.id); 
            if (target.roles.get(xprole6.id)) target.removeRole(xprole6.id);     
         message.member.addRole(xprole6.id); 
         if (zvaniad == 5) { 
         message.reply("поздравляю с новым званием <@&629546991331835923>! Вы набрали 100 уровень, максимальный на этом сервере. Выдал вам в награду **100 донат поинтов.**");
         let poitadd = `UPDATE xp SET point = ${point}+100 WHERE id = '${message.author.id}'`
         connection.query(poitadd);
         } else if (zvaniad == 6 || zvaniad == 0) {
         message.reply("Восстановил вам звание <@&629546991331835923>!");
         };
     }}
     };
 }
 
    connection.query(sql);
   });
// END XP LOGGER

  if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
      message.delete();
      return message.reply("хэй! Подожди 7 секунд и пиши команду...")
    }
    if(!message.member.roles.some(r=>["Розовое чудо"].includes(r.name)) ){
      cooldown.add(message.author.id);
   } 

  await message.react(bot.emojis.get("629575624272510976"));

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let command;
  
  if (bot.commands.has(cmd)) {
      command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
      command = bot.commands.get(bot.aliases.get(cmd));
  }
  
  if (!message.content.startsWith(prefix)) return;
  
  if (command) {
     if (message.author.id !== "294844223675564034" && !command.command.enabled) return message.reply("извините. Команда была отключена!");
  } 
// if (!message.member.roles.some(r=>["Модератор"].includes(r.name)) && bot.commands.get(bot.usage.get(("moders")))) return message.reply("У вас нет доступа к данной команде, сорян");
  
  try {
     command.run(bot, message, args, connection);
  } catch (e) {
  }

   setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
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
  
  bot.on('roleCreate', async (role) => {
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
    let logs = role.guild.channels.find(channel => channel.name === "logs");
    let embed = new Discord.RichEmbed()
    .setTitle('Роль Создана')
    .addField('Название Роли:', `${role.name}`)
    .addField('Создал:', `${entry.executor}`)
    .setColor(0x43B581)
    .setTimestamp()
    await logs.send({embed:embed})
  })
  
  bot.on('roleDelete', async (role) => {
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
    let logs = role.guild.channels.find(channel => channel.name === "logs");
  
    let embed = new Discord.RichEmbed()
    .setTitle('Роль Удалена')
    .addField('Название Роли:', `${role.name}`)
    .addField('Удалил:', `${entry.executor}`)
    .setColor(0xF04747)
    .setTimestamp()
    await logs.send({embed:embed})
  })



// login 
bot.login(process.env.BOT_TOKEN);