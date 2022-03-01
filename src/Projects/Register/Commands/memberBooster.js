const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client, message, args) => {
  
    if (!message.member.roles.cache.has(modConfig.booster)) return message.react(emojis.hata);
     let yazilacakisim;
    
    let isim = args.slice(0).join(` `)
     
/*    yazilacakisim = `${message.member.user.username.includes(conf.guild.tag) ? conf.guild.tag : (conf.guild.tag ? conf.guild.tag : (conf.guild.tag || ""))} ${isim}`;*/
    if (!isim) return main.embedHata(message.author, message.channel, answer.hatalikullanim + ` \`${conf.prefix}booster isim\``)
    
yazilacakisim = `${conf.guild.tag} ${isim}`;
    
     if(message.member.manageable) message.guild.members.cache.get(message.author.id).setNickname(`${isim.replace("  "," ").replace("   "," ").replace("    "," ")
     .replace("    "," ").replace("     "," ").replace("      "," ").replace("       "," ").replace("        "," ").replace("         "," ").replace("          "," ").replace("           "," ")
     .replace("           "," ").replace("            "," ").replace("             "," ").replace("              "," ").replace("               "," ").replace("                "," ").replace("                 "," ")}`)
      message.react(emojis.onay)
      };

module.exports.config = {
    name: "booster",
    aliases: ["booster", "rich"],
    usage: "Taslak",
    description: "Taslak Komutu."
};