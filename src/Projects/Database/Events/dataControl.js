const { Discord, MessageEmbed } = require("discord.js");


module.exports = async () => {

    setInterval(() => {
        dbMain.roleUpload();
        dbMain.channelUpload();
        DatabaseClient.guilds.cache.get(conf.guild.id).channels.cache.get(dataConfig.control).send(`${answer.onay} Veritabanı yedeği başarıyla oluşturuldu.`)
    }, 1000*60*30); // 1 saat. 1000*60*60*1
}

module.exports.databaseconfig = {

  name: "ready",
}
