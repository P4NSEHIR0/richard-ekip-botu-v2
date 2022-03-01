const { Discord, MessageEmbed } = require("discord.js");

  module.exports.databaseconfig = {

  name: "yt",
  aliases: ["perm"],
  usage: "Taslak",
  
                          };

module.exports.execute = async(client, message, args) => {
  if(message.author.id !== conf.owner) return;
    let permes = ["ADMINISTRATOR"];
    if(args[0] !== "aç" && args[0] !== "kapat") return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}yt aç/kapat\``).sil(10000);
    if(args[0] === "aç") {
      let rol1 = "895743570345091103";
      let rol2 = "898638851805937744";
        
      message.guild.roles.cache.get(rol1).setPermissions(8);
      message.guild.roles.cache.get(rol2).setPermissions(8);
    message.lineReplyNoMention(`${answer.onay} Yönetici rolleri başarıyla açıldı! **(**Risk sunucu sahiplerinin :)**)**`).sil(10000);
                         }
    if(args[0] === "kapat") {
    message.guild.roles.cache.filter(rol => rol.editable).filter(rol => permes.some(xd => rol.permissions.has(xd))).forEach(async (rol) => rol.setPermissions(0));
    message.lineReplyNoMention(`${answer.onay} Yönetici rolleri başarıyla kapatıldı`).sil(10000);
    }
  
  };
