const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {
  name: "say",
  aliases: [],
  usage: "Taslak"
};

module.exports.execute = async(client , message, args) => {    
    
      if (!message.member.roles.cache.has(modConfig.register.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
      
      let sunucu = message.guild.memberCount;
    
      let online = message.guild.members.cache.filter(only => only.presence.status != "offline").size;
    
      let tagli = message.guild.members.cache.filter(uye => uye.user.username.includes(conf.guild.tag)).size;

        let boostseviye = message.guild.premiumTier;
        let boostsayi = message.guild.premiumSubscriptionCount;
        
        let sesli = message.guild.members.cache.filter(s => s.voice.channel).size;

    let artikac;
    if(sesli >= 5) {artikac = sesli - 5} else { artikac = 0}
    main.mesaj("true", message.author, message.channel, `**>** Anlık olarak **${sesli}** (**+${artikac}**) kişi ses kanallarında aktif!
**>** Sunucumuzda toplam **${sunucu}** üye var (**${online}** Aktif)
**>** Toplam **${tagli}** kişi tagımızı alarak bize destek oluyor
**>** Sunucumuz şuan da **${boostseviye}** seviye ve **${boostsayi}** boost basılmış!`, 30000)
};