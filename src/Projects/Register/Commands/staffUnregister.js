const { Discord, MessageEmbed } = require("discord.js");
module.exports.execute = async(client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}kayitsiz @Richârd/ID\``).sil(10000);
    if(member === message.member) return main.embedHata(message.author, message.channel, `Kayıt komutlarını kendi üstünde kullanamazsın!`).sil(10000);
    if(!member.bannable) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcı yıkılmaz sallanmaz!`).sil(10000);
    if(message.member.roles.highest.position == member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının ile aynı roldesiniz!`).sil(10000);
    if(message.member.roles.highest.position <= member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının rolü senin üstünde!`).sil(10000)

    modMain.kayitSil(member)
    main.embedBasari(message.author, message.channel, `${member.user.tag} kullanıcısı başarıyla kayıtsıza atıldı!`).sil(10000);
};

module.exports.config = {
    name: "unregister",
    aliases: ["unreg", "kayitsiz"],
    usage: "Taslak",
    description: "Taslak Komutu."
};