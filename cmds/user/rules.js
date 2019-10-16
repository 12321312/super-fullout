const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
    let ambed = new Discord.RichEmbed()
    ambed.setTitle("Привет выходец из убежища!");
    ambed.setDescription(`Обитель умиротворения  создан для общения, торговли и обмена.
    Главное не забывай быть вежливым и не нарушай правила.`);
    ambed.setTimestamp();
    ambed.setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg");
    ambed.setColor('#d95030');


    ambed.addField(`
На нашем сервере запрещено:
`,`
**1:** Ники содержащие оскорбления и нецензурную лексику.
**2:** Оскорбление участников и администрации сервера.
**3:** Злоупотребление ненормативной лексикой.
**4:** Размещение материалов категории 18+.
**5:** Разжигание межнациональных, религиозных и политических споров.
**6:** Пропаганда и призыв к насилию и экстремизму.
**7:** РМТ (торговля за реальные деньги)
**8:** Реклама сторонних ресурсов без согласования с администрацией сервера.
**9:** Спам, а так же бессмысленный набор цифр, букв, смайлов.
`);

    message.delete();
    if(args[0] == "app" && message.author.id == "294844223675564034") {
    message.channel.send({embed:ambed});
    } else {
    message.author.sendMessage({embed:ambed});
    }
};

module.exports.command = {
  name: 'rules',
  aliases: ["правила", "показатьправила", "правиласервера"],
  description: "Ебанные правила, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 