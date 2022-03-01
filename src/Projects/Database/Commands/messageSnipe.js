const { Discord, MessageEmbed } = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

  module.exports.databaseconfig = {

  name: "snipe",
  aliases: ["snipe"],
  usage: "snipe @Role/ID",
  
                          };

module.exports.execute = async(client, message, args) => {
  
    if(message.author.id !== conf.owner) return;
    let veri = guildDatabase.cek(`${message.guild.id}.snipe`)
    if(!veri) return message.react(emojis.hata);
    let embed = new MessageEmbed().setColor("RANDOM").setFooter(conf.footer).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
    message.lineReplyNoMention(embed.setDescription(`Veritabanında bulunan son mesaj aşağıdadır;

**Mesaj Sahibi**: <@${veri.author}> (\`${veri.author}\`)
**Mesaj Kanalı**: <#${veri.channel}> (\`${veri.channel}\`)

**Mesaj İçeriği**
\`\`\`fix
${veri.content}
\`\`\``));
  };
