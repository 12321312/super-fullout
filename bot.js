const Discord = require("discord.js");
const bot = new Discord.Client();
let config = require('./config.json');
let prefix = config.prefix;
const fs = require('fs');
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

  if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
      message.delete();
      return message.reply("хэй! Подожди 7 секунд и пиши команду...")
    }
    if(!message.member.roles.some(r=>["Смотритель"].includes(r.name)) ){
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
  
  try {
     command.run(bot, message, args);
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
  

// login 
bot.login(process.env.BOT_TOKEN);