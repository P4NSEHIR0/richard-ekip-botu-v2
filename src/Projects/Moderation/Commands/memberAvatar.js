const { Discord, MessageEmbed } = require("discord.js");

module.exports.config = {
  name: "avatar",
  aliases: ["pp"]
};

module.exports.execute = async(client , message, args) => {
  let user = args.length > 0 ? message.mentions.users.first() || await this.client.users.fetch(args[0]) || message.author : message.author
  if(!user) return message.lineReplyNoMention(`${answer.hatali} \`${conf.prefix}avatar @Richârd/ID\``).sil(5000);
  let embed = new MessageEmbed()
  .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
  .setFooter(conf.footer)
  .setColor("RANDOM")
  message.lineReplyNoMention(embed)
    };
