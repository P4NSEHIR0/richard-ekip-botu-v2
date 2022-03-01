const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "join",
    aliases: ["git"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(client , message, args) => {
    let richardembed = new MessageEmbed().setFooter(conf.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return main.hata("true", message.author, message.channel, `${answer.hatalikullanim} \`Örnek: ${conf.prefix || '.'}git @Richârd/ID\``, 10000)
    if(member === message.member) return main.hata("true", message.author, message.channel, answer.sensin, 5000);
    if(!member.bannable) return main.hata("true", message.author, message.channel, answer.basedemezsin, 5000)
    if(message.member.roles.highest.position == member.roles.highest.position) return main.hata("true", message.author, message.channel, answer.aynirol, 5000)
    if(message.member.roles.highest.position <= member.roles.highest.position) return main.hata("true", message.author, message.channel, answer.ustrol, 5000)
    if (!message.member.voice.channel && !member.voice.channel) return main.hata("true", message.author, message.channel, message.channel, answer.sestedegilsiniz, 5000)
    if (!message.member.voice.channelID == member.voice.channelID) return main.hata("true", message.author, message.channel, message.channel, answer.aynikanal, 5000)
      if (message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(modConfig.penal.voiceHammer)) {
        message.member.voice.setChannel(member.voice.channelID).catch();
            message.react(emojis.onay)
        
    }else{
    
    const filter = (reaction, user) => {
        return [emojis.onay].includes(reaction.emoji.id) && user.id === member.id; 
        };
    
        message.channel.send(richardembed.setDescription(`${member}, ${message.author} adlı üye senin sesli kanalına girmek istiyor, kabul ediyor musun?`).setFooter(`Kabul etmek için 15 saniyen bulunuyor.`)).then(x => {
            x.react(emojis.onay);
            x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
                    message.member.voice.setChannel(member.voice.channelID).catch();
            x.delete()
            message.react(emojis.onay)
                };
            });
        });
    };
};