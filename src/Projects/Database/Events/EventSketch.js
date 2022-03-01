const { Discord, MessageEmbed } = require("discord.js");


module.exports = async () => {

  DatabaseClient.user.setPresence({ activity: { name: conf.activity }, status: "IDLE" });
  DatabaseClient.channels.cache.get(conf.guild.voice).join();

}

module.exports.databaseconfig = {

  name: "ready",
}
