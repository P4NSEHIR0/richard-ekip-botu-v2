const Discord = require("discord.js");
module.exports = async(role) => {

    if (role.guild.id !== conf.guild.id) return;
    const entry = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = role.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard2Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
role.delete()
//////////////////
await user.ban({reason: "Rol açmaya çalıştı!"})
await grd2Main.permLock(role.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await role.guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Sunucuda rol açmaya çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard2config = {
      name: "roleCreate"
    }