const Discord = require("discord.js");
module.exports = async(oldEmoji, newEmoji) => {

    if (newEmoji.guild.id !== conf.guild.id) return;
    const entry = await newEmoji.guild.fetchAuditLogs({ type: 'EMOJI_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newEmoji.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard1Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
if(oldEmoji.name !== newEmoji.name) {
    newEmoji.setName(oldEmoji.name) 
}
//////////////////
await user.ban({reason: "Emoji düzenlemeye çalıştı!"})
await grd1Main.permLock(newEmoji.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newEmoji.guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı emoji düzenlemeye çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard1config = {
      name: "emojiUpdate"
    }