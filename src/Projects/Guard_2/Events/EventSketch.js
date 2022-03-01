const { Discord, MessageEmbed } = require("discord.js");


module.exports = async () => {

  Guard2Client.user.setPresence({ activity: { name: conf.activity }, status: "IDLE" });
  Guard2Client.channels.cache.get(conf.guild.voice).join();
}

module.exports.guard2config = {

  name: "ready",
}
