const { Discord, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = async (message) => {

    if(message.author.bot) return;
    if(!message.guild) return;
    let prefix = conf.prefix;
    if(message.content.includes(prefix+`afk`)) return;
    if(guildb.cek(`${message.author.id}.afk`)) {
        var user = message.mentions.users.first();
      let kullanici = message.guild.members.cache.get(message.author.id);
     if(kullanici.manageable) kullanici.setNickname(kullanici.displayName.replace('〔AFK〕 ', ''))
        message.lineReplyNoMention(`:tada: Hoşgeldin ${message.author}, artık **AFK** modunda değilsin!`).sil(4000);
        guildb.sil(`${message.author.id}.afk.sebep`);
        guildb.sil(`${message.author.id}.afk`);
      
    
    }
    if(!message.guild || message.author.bot || message.content.toLowerCase().includes(`${conf.prefix}afk`)) return;
      if(message.mentions.users.size >= 1){
        let victim = message.mentions.users.first();
        if(guildb.cek(`${victim.id}.afk`)) {
          let data = guildb.cek(`${victim.id}.afk`);
          let reason = guildb.cek(`${victim.id}.sebep`);
        return message.lineReplyNoMention(`:tada: ${victim} adlı üye __${reason}__ nedeni ile **AFK** modunda.`).sil(4000);
        }
      };
   
}

module.exports.config = {

  name: "message",
}
