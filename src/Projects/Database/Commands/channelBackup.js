const { Discord, MessageEmbed } = require("discord.js");

  module.exports.databaseconfig = {

  name: "cbackup",
  aliases: ["cbackup"],
  usage: "backup #Channel/ID",
  
                          };

module.exports.execute = async(client, message, args) => {
  

    if(message.author.id !== conf.owner) return;
    let icerik = args[0];
    const kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!icerik) return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}cbackup #Channel/ID\``).sil(10000);
    if(!kanal) return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}cbackup #Channel/ID\``).sil(10000);

    let permissionss = {};
    let sayi = Number(0);

    kanal.permissionOverwrites.forEach((perm) => {
      let thisPermOverwrites = {};
      perm.allow.toArray().forEach(p => {
        thisPermOverwrites[p] = true;
      });
      perm.deny.toArray().forEach(p => {
        thisPermOverwrites[p] = false;
      });
      permissionss[sayi] = {permission: perm.id == null ? guild.id : perm.id, thisPermOverwrites};
      sayi++;
    })

    if(kanal.type === "voice"){
    guildChannels.ayarla(`${kanal.id}.${conf.guild.id}`, { 
      "name": kanal.name,
      "parentID": kanal.parentID,
      "position": kanal.position,
      "type": kanal.type,
      "permissionOverwrites": permissionss,
      "userLimit": kanal.userLimit,
      "bitrate": kanal.bitrate
    })
    } else if(kanal.type === "category"){
    guildChannels.ayarla(`${kanal.id}.${conf.guild.id}`, { 
        "name": kanal.name,
        "position": kanal.position,
        "type": kanal.type,
        "permissionOverwrites": permissionss
    })   
    } else {
    guildChannels.ayarla(`${kanal.id}.${conf.guild.id}`, {
      "name": kanal.name,
      "parentID": kanal.parentID,
      "position": kanal.position,
      "nsfw": kanal.nsfw,
      "rateLimitPerUser": kanal.rateLimitPerUser,
      "type": kanal.type,
      "topic": kanal.topic ? kanal.topic : "Richard~ Backup =)",
      "permissionOverwrites": permissionss
    })
  }
      message.lineReplyNoMention(`${answer.onay} Belirtilen \`${kanal.name}\` isimli kanalın verileri veritabanına kayıt edildi.`).sil(10000);
  };
