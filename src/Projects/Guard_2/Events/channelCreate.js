const Discord = require("discord.js");
module.exports = async(channel) => {

    if (channel.guild.id !== conf.guild.id) return;
    const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = channel.guild.members.cache.get(id)
    if(id === conf.owner) return;
    if(guardConfig.safezone.includes(id)) return;
    if(guardConfig.safebots.includes(id)) return;
    if(!user.bannable) return;
    if (entry.executor.id === Guard2Client.user.id) return;
    await channel.delete()
    await user.ban({reason: "Kanal açmaya çalıştı"})
    await grd2Main.permLock(channel.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
      await channel.guild.channels.cache.get(guardguardConfig.log).send(
        new Discord.MessageEmbed()
        .setDescription(`${user} (${user.id}) **Kullanıcısı sunucumuzda bir kanal açmaya çalıştı**`)
        .setColor("RANDOM")
        .setFooter(user.id, user.user.avatarURL())
      )
  
    }; 
  module.exports.guard2config = {
      name: "channelCreate"
    }