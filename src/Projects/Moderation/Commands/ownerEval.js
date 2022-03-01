const { Discord, MessageEmbed } = require("discord.js");

  module.exports.config = {

  name: "eval",
  aliases: ["eval"],
  usage: "eval [Functions]",
  
                          };

module.exports.execute = async(client, message, args) => {
  

    if (message.author.id === conf.owner) {
   
       
        try {
      
          let code = args.join(' ')
          let evaled = eval(code)
      
          evaled = require('util').inspect(evaled)
      
          if (!code) return message.channel.send("hani komut amk çocu")
    /*
          if (code.length > 1000) message.channel.send("hani komut amk çocu")
    */
      
          let embed = new MessageEmbed()
          .setColor('#000001')
          .addField('GİRDİ', `\`\`\`js\n${code}\`\`\``)
          .addField('ÇIKTI', `\`\`\`js\n${evaled.length > 1000 ? `${evaled.slice(0, 1000)}...` : `${clean(evaled)}` }\`\`\``)
          message.lineReplyNoMention(embed)
      
        } catch (err) {
      
          let embed = new MessageEmbed()
          .setColor('#000001')
          .addField('HATA', `\`\`\`js\n${clean(err).length > 1000 ? `${clean(err).slice(0, 1000)}...` : `${clean(err)}`}\n\`\`\``)
          message.lineReplyNoMention(embed).then(message.delete({timeout: 500}))
      
        }
    }
    
    function clean(text) {
      
        if (typeof(text) == 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
        else
        return text
      };
      
  };
