const { Discord, MessageEmbed } = require("discord.js");


module.exports = async (member) => {

    modMain.memberJoin(member, modConfig.register.channel)
}

module.exports.config = {

  name: "memberAdd",
}
