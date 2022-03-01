const { Discord, MessageEmbed } = require("discord.js");


module.exports = async (oldMessage, newMessage) => {
    if(newMessage.author.bot) return;
    main.mesaj("true", newMessage.author, DatabaseClient.guilds.cache.get(conf.guild.id).channels.cache.get(dataConfig.message), `Sunucumuzda bir mesaj düzenlendi, verileri aşağıdadır;

**Mesaj Sahibi**: ${newMessage.member} (\`${newMessage.author.id}\`)
**Mesaj Kanalı**: ${newMessage.channel} (\`${newMessage.channel.id}\`)

**Eski Mesaj İçeriği**
\`\`\`fix
${oldMessage.content}
\`\`\`
**Yeni Mesaj İçeriği**
\`\`\`fix
${newMessage.content}
\`\`\``)

}

module.exports.databaseconfig = {

  name: "messageUpdate",
}
