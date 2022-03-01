const Discord = require("discord.js");
module.exports = async(guild, member) => {

    if (guild.id !== conf.guild.id) return;
    const entry = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard2Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
guild.members.unban(member.id)
//////////////////
await user.ban({reason: "Kullanıcıyı yasaklamaa çalıştı"})
await grd2Main.permLock(guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Kullanıcısı sağ tık ile kullanıcı yasaklamaya çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard2config = {
      name: "guildBanAdd"
    }