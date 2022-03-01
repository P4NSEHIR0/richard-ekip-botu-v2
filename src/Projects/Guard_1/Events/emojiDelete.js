const Discord = require("discord.js");
module.exports = async(emoji) => {

    if (emoji.guild.id !== conf.guild.id) return;
    const entry = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_DELETE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = emoji.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard1Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
emoji.guild.emojis.create(emoji.url, emoji.name)
//////////////////
await user.ban({reason: "Emoji silmeye çalıştı"})
await grd1Main.permLock(emoji.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await emoji.guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı emoji silmeye çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard1config = {
      name: "emojiDelete"
    }