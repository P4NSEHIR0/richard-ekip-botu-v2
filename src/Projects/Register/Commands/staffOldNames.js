const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client, message, args) => {
         if (!message.member.roles.cache.has(modConfig.register.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
        let oldnames = memberdb.cek(`isimler.${member.id}`);
         if (!oldnames) return main.embedBasari(message.author, message.channel,"İsim geçmişi temiz.")
    
        let oldsize = memberdb.cek(`isimmiktar.${member.id}`)
    
      let oldnamelist = oldnames.length > 0 ? oldnames.map((value, index) => ` \`${value.guildName}\` **(<@&${value.Komut}>) [<@${value.Yetkili}>]**`) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
    
      main.embedOlustur(message.author, message.channel,`${member} kullanıcının sunucudaki eski isimleri [**${oldsize || 0}**]
    
    ${oldnamelist.join("\n")}`, "RANDOM");
};

module.exports.config = {
    name: "oldnames",
    aliases: ["isimler"],
    usage: "Taslak",
    description: "Taslak Komutu."
};