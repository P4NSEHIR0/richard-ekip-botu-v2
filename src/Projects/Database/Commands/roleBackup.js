const { Discord, MessageEmbed } = require("discord.js");

  module.exports.databaseconfig = {

  name: "rbackup",
  aliases: ["rbackup"],
  usage: "backup @Role/ID",
  
                          };

module.exports.execute = async(client, message, args) => {
  

    if(message.author.id !== conf.owner) return;
    let icerik = args[0];
    const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!icerik) return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}rbackup @Role/ID\``).sil(10000);
    if(!rol) return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}rbackup @Role/ID\``).sil(10000);

    let roleChannelOverwrites = [];
    message.guild.channels.cache.filter(c => c.permissionOverwrites.has(rol.id)).forEach(c => {
      let channelPerm = c.permissionOverwrites.get(rol.id);
      let pushlanacak = { id: c.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
      roleChannelOverwrites.push(pushlanacak);
    });

    guildRoles.ayarla(`${rol.id}.${conf.guild.id}`, {
            "name": rol.name,
            "color": rol.hexColor,
            "hoist": rol.hoist,
            "position": rol.position,
            "permissions": rol.permissions,
            "mentionable": rol.mentionable,
            "count": rol.members.size,
            "members": rol.members.map(m => m.id),
            "channelOverwrites": roleChannelOverwrites
    });
    message.lineReplyNoMention(`${answer.onay} Belirtilen \`${rol.name}\` isimli rolün verileri veritabanına kayıt edildi.`).sil(10000);
  };
