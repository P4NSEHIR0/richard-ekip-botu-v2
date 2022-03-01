const Discord = require("discord.js");
module.exports = async(oldRole, newRole) => {

    if (newRole.guild.id !== conf.guild.id) return;
    const entry = await newRole.guild.fetchAuditLogs({ type: 'ROLE_UPDATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = newRole.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard2Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
if(oldRole.name !== newRole.name){
    newRole.setName(oldRole.name)
  }
//////////////////
if(oldRole.rawPosition !== newRole.rawPosition){
    newRole.setPosition(oldRole.rawPosition)
  }
//////////////////
if(oldRole.mentionable !== newRole.mentionable){
    newRole.setMentionable(oldRole.mentionable)
  }
//////////////////
if(oldRole.permissions !== newRole.permissions) {
newRole.setPermissions(oldRole.permissions);
}
//////////////////
if(oldRole.color !== newRole.color){
  newRole.setColor(oldRole.hexColor)
}
//////////////////
if(oldRole.hoist !== newRole.hoist){
  newRole.setHoist(oldRole.hoist)
}
//////////////////
await user.ban({reason: "Rol düzenlemeye çalıştı!"})
await grd2Main.permLock(newRole.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await newRole.guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Sunucu rollerini düzenlemeye çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard2config = {
      name: "roleUpdate"
    }