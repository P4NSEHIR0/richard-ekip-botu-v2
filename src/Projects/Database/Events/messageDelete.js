const { Discord, MessageEmbed } = require("discord.js");


module.exports = async (message) => {
  if(message.author.bot) return;

    guildDatabase.ayarla(`${message.guild.id}.snipe`, {
        "content": message.content,
        "author": message.author.id,
        "channel": message.channel.id
    })
    main.mesaj("true", message.author, DatabaseClient.guilds.cache.get(conf.guild.id).channels.cache.get(dataConfig.message), `Sunucumuzda bir mesaj silindi, verileri aşağıdadır;

**Mesaj Sahibi**: ${message.member} (\`${message.author.id}\`)
**Mesaj Kanalı**: ${message.channel} (\`${message.channel.id}\`)

**Mesaj İçeriği**
\`\`\`fix
${message.content}
\`\`\``)

}

module.exports.databaseconfig = {

  name: "messageDelete",
}
