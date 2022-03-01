const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "clear",
    aliases: ["sil"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(ModerationClient , message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    let miktar = Number (args[0]);
    if (!miktar || miktar < 1 || miktar > 100) return main.embedBasari(message.author, message.channel, `Geçerli bir miktar belirtmelisin.`).sil(5000)
    message.channel.bulkDelete(miktar).then(x => main.embedBasari(message.author, message.channel, `\`${message.channel.name}\` kanalındaki **${x.size}** mesaj başarıyla silindi! ${emojis.onay}`)).sil(5000)
  };

