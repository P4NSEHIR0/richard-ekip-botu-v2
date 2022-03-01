const Discord = require("discord.js");
module.exports = async(webhook) => {

    if (webhook.guild.id !== conf.guild.id) return;
    const entry = await webhook.guild.fetchAuditLogs({ type: 'WEBHOOK_CREATE' }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = webhook.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(entry.executor.id === Guard1Client.user.id) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
//////////////////
webhook.delete()
//////////////////
await user.ban({reason: "WebHook düzenlemeye çalıştı"})
await grd1Main.permLock(webhook.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
  await webhook.guild.channels.cache.get(guardConfig.log).send(
    new Discord.MessageEmbed()
    .setDescription(`${user} (${user.user.tag}) **Webhook düzenlemeye çalıştı**`)
    .setColor("RANDOM")
    .setFooter(user.id, user.user.avatarURL())
  )
//////////////////
}; 
  module.exports.guard1config = {
      name: "webhookUpdate"
    }