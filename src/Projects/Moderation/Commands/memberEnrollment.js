const { Discord, MessageEmbed } = require("discord.js");
require("moment-duration-format");
require("moment-timezone");

module.exports.config = {
    name: "sicil",
    aliases: ["enrollment"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(ModerationClient , message, args) => {
 let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(conf.footer).setColor("RANDOM");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      let sicilsayi = penals.cek(`sicilsayi.${member.id}.${conf.guild.id}`);
   let soncezainfo = penals.cek(`sonceza.${member.id}.${conf.guild.id}`);
        let sicilminerdelanit = penals.cek(`sicil.${member.id}.${conf.guild.id}`);
     if (!sicilminerdelanit) return main.embedHata(message.author, message.channel, `**${message.guild.name}** sunucusunda kayıtlı ${member} kullanıcısının sicil kayıdı bulunmuyor.`)

    let sicilinfo = penals.cek(`sicil.${member.id}.${conf.guild.id}`);
   
  let sicilimm = sicilinfo.length > 0 ? sicilinfo.map((value, index) => ` **[${value.komut}]** \`${value.zaman}\` tarihinde **${value.sebep}** nedeniyle <@${value.mod}> tarafından cezalandırıldı. **#${value.id}**`).join("\n") : ""

  if(sicilsayi >= 7) {
    const filter = (reaction, user) => {
        return [emojis.onayemoji].includes(reaction.emoji.id) && user.id === message.author.id; 
        };

       message.channel.send(embed.setDescription(`**${message.guild.name}** sunucusunda kayıtlı ${member} kullanıcısının **7'den fazla** cezası bulunduğu için son cezası gösterilmekterdir,
\`\`\`cs
                [Kullanıcının Son Cezası]
> Ceza ID => #${soncezainfo.id}
> Ceza Durumu => ${soncezainfo.durum}
> Yetkili => ${soncezainfo.mod}
> Tür => ${soncezainfo.komut}
> Sebep => ${soncezainfo.sebep}
> Bitiş Tarihi => ${soncezainfo.bitis}
\`\`\``).setFooter(`Kullanıcının bütün sicilini görmek için tepkiye tıklayabilirsin.`))
.then(x => {
            x.react(emojis.onayemoji);
            x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
                  x.delete()
                        client.embedGenislet(`**${message.guild.name}** sunucusunda kayıtlı ${member} kullanıcısının tüm cezaları aşağıda listenmiştir,

${sicilimm}`,
                   {name: `${message.member.displayName}`, icon: message.author.avatarURL({dynamic: true})},
                   {name: conf.footer, icon: false},                 
                    {setColor: ["RANDOM"]}).then(list => {               
                  list.forEach(item => {
             message.channel.send(item);
})
});

                };
            });
        });

   } else {

  message.channel.send(embed.setDescription(`**${message.guild.name}** sunucusunda kayıtlı ${member} kullanıcısının tüm cezaları aşağıda listenmiştir,

${sicilimm}`));
}
  };