const { Discord, MessageEmbed } = require("discord.js");


module.exports = async () => {

  Guard1Client.user.setPresence({ activity: { name: conf.activity }, status: "IDLE" });
  Guard1Client.channels.cache.get(conf.guild.voice).join();

}

module.exports.guard1config = {

  name: "ready",
}
