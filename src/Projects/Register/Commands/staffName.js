const Discord = require("discord.js");
module.exports.execute = async(client, message, args) => {

    if (!message.member.roles.cache.has(modConfig.register.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}isim @Richârd/ID <İsim> <Yaş>\``).sil(10000);
    let yazilacakisim;
    let isim = args[1];
    let yaş = Number(args[2]);
    if (yaş < conf.guild.minyas) return main.embedHata(message.author, message.channel, answer.yetersizyaş).sil(5000);
    if (!Number(args[2])) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}isim <@Richârd/ID> İsim Yaş\``).sil(10000);
    if (!member || !isim) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}isim <@Richârd/ID> İsim Yaş\``).sil(10000);
    if(member === message.member) return main.embedHata(message.author, message.channel, `Kayıt komutlarını kendi üstünde kullanamazsın!`).sil(10000);
    if(!member.bannable) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcı yıkılmaz sallanmaz!`).sil(10000);
    if(message.member.roles.highest.position == member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının ile aynı roldesiniz!`).sil(10000);
    if(message.member.roles.highest.position <= member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının rolü senin üstünde!`).sil(10000);

/*    yazilacakisim = `${member.user.username.includes(settings.nicktag) ? settings.nicktag : (settings.nickuntag ? settings.nickuntag : (settings.nicktag || ""))} ${isim} | ${yaş}`; */
yazilacakisim = `${conf.guild.tag} ${isim} | ${yaş}`;
       member.setNickname(`${yazilacakisim}`).catch();
       let embed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(conf.footer).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }))
       .setDescription(`${member} kişisinin ismi \`${isim} | ${yaş}\` olarak değiştirildi!`)
       message.channel.send(embed).sil(5000);
            message.react(emojis.onay)
    modMain.kayitEt(member, message.author, "isim", isim, yaş)


  };

module.exports.config = {
    name: "isim",
    aliases: ["i", "name", "n"],
    usage: "Taslak",
    description: "Taslak Komutu."
};