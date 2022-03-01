const { Discord, MessageEmbed } = require("discord.js");

  module.exports.config = {

  name: "afk",
  aliases: ["afk"],
  usage: "afk",
  
                          };

module.exports.execute = async(client, message, args) => {
  

    let user = message.guild.members.cache.get(message.author.id);
    if(user.displayName.includes("〔AFK〕")){
      message.lineReplyNoMention(`${answer.hata} Zaten **AFK** modundasın`).sil(5000)
      return;
    }
     if(guildb.cek(`${message.author.id}.afk`)) return message.lineReplyNoMention(`${answer.uyari} Zaten **AFK** modundasın!`).sil(5000);
    
    let sebep = args.slice(0).join(' ')
     if(!sebep) sebep = 'En Yakın Zamanda Geri Döneceğim!';
    
     let cezalı = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
    if(cezalı.some(a => message.content.includes(a))){
      return message.lineReplyNoMention(`${answer.uyari} Komutlar ile reklam yapamazsın!`).sil(5000)
    }
              
    if(user.manageable) user.setNickname('〔AFK〕 ' + user.displayName)
         guildb.ayarla(`${message.author.id}.afk`, true)
         guildb.ayarla(`${message.author.id}.sebep`, sebep)
        message.react(emojis.onay)
          
  };
