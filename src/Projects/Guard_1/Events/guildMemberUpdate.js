const Discord = require("discord.js");
module.exports = async(oldMember, newMember) => {

    if (newMember.guild.id !== conf.guild.id) return;
    const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newMember.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard1Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
if(oldMember.roles !== newMember.roles) {
  let rol = user.roles.cache.filter(a => a.id !== newMember.guild.id && a.name !== guardConfig.booster).map(a => a.id)
  await newMember.roles.remove(newMember.roles.cache.filter(a => a.id !== newMember.guild.id && !oldMember.roles.cache.some(b => b.id === a.id)).map(a => a.id))
}
//////////////////
await user.ban({reason: "Kullanıcı rollerini düzenlemeye çalıştı!"})
await grd1Main.permLock(newMember.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newMember.guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcı rollerini düzenlemeye çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard1config = {
      name: "guildMemberUpdate"
    }