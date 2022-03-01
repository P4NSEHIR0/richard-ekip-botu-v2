const { Discord, MessageEmbed } = require("discord.js");


module.exports = async () => {

  client.user.setPresence({ activity: { name: conf.activity }, status: "IDLE" });
  client.channels.cache.get(conf.guild.voice).join();
}

module.exports.config = {

  name: "ready",
}
