const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "lock",
    aliases: ["kilit"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(ModerationClient , message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    let permObjesi = {};
    let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
    everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
    });
    everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
    });
    if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.react(emojis.onay);
    main.embedHata(message.author,message.channel,"Kanal kilitlendi!")
    } else {
    permObjesi["SEND_MESSAGES"] = true;
    message.channel.createOverwrite(everyone, permObjesi);
    message.react(emojis.onay);
    main.embedBasari(message.author,message.channel,"Kanal kilidi açıldı!")
    };
      };