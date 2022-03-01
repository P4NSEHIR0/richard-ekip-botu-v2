const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "slowmode",
    aliases: ["slow", "yavasmod"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(ModerationClient , message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
let miktar = Number (args[0]);
message.channel.setRateLimitPerUser(miktar).catch();
message.react(emojis.onay);
  };
