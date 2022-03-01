const Discord = require("discord.js");
module.exports.execute = async(client, message, args) => {

    if (!message.member.roles.cache.has(modConfig.register.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}kayit @Richârd/ID <İsim> <Yaş>\``).sil(10000);
    let yazilacakisim;
    let isim = args[1];
    let yaş = Number(args[2]);
    if (yaş < conf.guild.minyas) return main.embedHata(message.author, message.channel, answer.yetersizyaş).sil(5000);
/*    if(!member.user.username.includes(conf.guild.tag) && !member.user.discriminator.includes("0017") && !member.roles.cache.has(modconfig.vip) && !member.roles.cache.has(registerConfig.booster)) return message.react(emojis.hata); */
    if (!Number(args[2])) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}kayıt <@Richârd/ID> İsim Yaş\``).sil(10000);
    if (!member || !isim) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}kayıt <@Richârd/ID> İsim Yaş\``).sil(10000);
    if(member === message.member) return main.embedHata(message.author, message.channel, `Kayıt komutlarını kendi üstünde kullanamazsın!`).sil(10000);
    if(!member.bannable) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcı yıkılmaz sallanmaz!`).sil(10000);
    if(message.member.roles.highest.position == member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının ile aynı roldesiniz!`).sil(10000);
    if(message.member.roles.highest.position <= member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının rolü senin üstünde!`).sil(10000);

    let collector = message.createReactionCollector((reaction, user) => user.id === message.author.id);
    /*    yazilacakisim = `${member.user.username.includes(settings.nicktag) ? settings.nicktag : (settings.nickuntag ? settings.nickuntag : (settings.nicktag || ""))} ${isim} | ${yaş}`; */
    yazilacakisim = `${conf.guild.tag} ${isim} | ${yaş}`;

       member.setNickname(`${yazilacakisim}`).catch();
       let embed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(conf.footer).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }))
       .setDescription(`${member} kişisinin ismi \`${isim} | ${yaş}\` olarak değiştirildi!`);
       let qwe = await message.channel.send(embed)
       await message.react("🙅‍♂️") //erkek emojisi
       await message.react("🙅‍♀️") //kız emojisi
       await message.react("❌")
       collector.on("collect", async(reaction, user) => {
        await message.reactions.removeAll()
        qwe.delete()
           if (reaction.emoji.name == "🙅‍♂️") { //erkek
            qwe.delete()
            modMain.kayitEt(member, message.author, "erkek", isim, yaş)
            message.react(emojis.onay)
          }

          if (reaction.emoji.name == "🙅‍♀️") { //kız
            qwe.delete()
            modMain.kayitEt(member, message.author, "kadin", isim, yaş)
            message.react(emojis.onay)
           }
           
           if (reaction.emoji.name == "❌") { //iptal
            qwe.delete()
            message.delete()
        }
       })

  };

module.exports.config = {
    name: "kayit",
    aliases: ["kayıt", "kız", "bay", "bayan", "k", "kadın", "kiz", "kadin", "erkek", "e"],
    usage: "Taslak",
    description: "Taslak Komutu."
};