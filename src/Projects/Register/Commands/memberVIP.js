const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client, message, args) => {
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.roles.cache.has(modConfig.register.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    if (!user) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}vip @Richârd/ID\``).sil(10000);
    if(user === message.member) return main.embedHata(message.author, message.channel, `Kayıt komutlarını kendi üstünde kullanamazsın!`).sil(10000);
    if(!user.bannable) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcı yıkılmaz sallanmaz!`).sil(10000);
    if(message.member.roles.highest.position == user.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının ile aynı roldesiniz!`).sil(10000);
    if(message.member.roles.highest.position <= user.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının rolü senin üstünde!`).sil(10000)

     
    if (!user) return main.embedHata(message.author, message.channel, answer.hatalikullanim + ` \`${conf.prefix}vip <@Richârd/ID>\``)
    
    
     if(user.manageable) user.roles.add(modConfig.vip)
      message.react(emojis.onay)
      };

module.exports.config = {
    name: "vip",
    aliases: ["ozel"],
    usage: "Taslak",
    description: "Taslak Komutu."
};