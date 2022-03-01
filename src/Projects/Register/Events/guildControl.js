const Discord = require("discord.js");
module.exports = async () => {

  setInterval(() => {
    checkUnregister();
  }, 100000);
/*
  setInterval(() => {
    checkTagged();
  }, 10000);

  setInterval(() => {
    checkUnTagged();
  }, 20000);
*/
}; 
  module.exports.config = {
      name: "ready"
    }

    function checkUnregister() {
      let embed1 = new Discord.MessageEmbed().setAuthor(client.guilds.cache.get(conf.guild.id).name, client.guilds.cache.get(conf.guild.id).iconURL({dynamic: true})).setTimestamp().setFooter(conf.footer).setColor("RANDOM")
    
      if (modConfig.register.unregister) client.guilds.cache.get(conf.guild.id).members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => uye.roles.add(modConfig.register.unregister));
      client.guilds.cache.get(conf.guild.id).channels.cache.get(modConfig.register.control).send(embed1.setDescription("Sunucu içerisinde rolü bulunmayan herkese kayıtsız rolü verildi!"))
    }
    function checkTagged() {
      if (conf.guild.tag) {
        let embed2 = new Discord.MessageEmbed().setAuthor(client.guilds.cache.get(conf.guild.id).name, client.guilds.cache.get(conf.guild.id).iconURL({dynamic: true})).setTimestamp().setFooter(conf.footer).setColor("GREEN")
          client.guilds.cache.get(conf.guild.id).members.cache.filter(uye => uye.user.username.includes(conf.guild.tag) && (!uye.roles.cache.has(modConf.register.family))).array().forEach((uye, index) => {
            uye.setNickname(uye.displayName.replace(settings.untag, conf.guild.tag));
            if(uye.manageable) { if (modConf.register.family) uye.roles.add(modConf.register.family) }
          });
          client.guilds.cache.get(conf.guild.id).channels.cache.get(modConfig.register.control).send(embed2.setDescription("Tagımızı taşıyıp rolü olmayan herkese rolü verildi!"))
          }
    }
    function checkUnTagged() {
      if (conf.guild.tag) {
        let embed3 = new Discord.MessageEmbed().setAuthor(client.guilds.cache.get(conf.guild.id).name, client.guilds.cache.get(conf.guild.id).iconURL({dynamic: true})).setTimestamp().setFooter(conf.footer).setColor("RED")
          client.guilds.cache.get(conf.guild.id).members.cache.filter(uye => !uye.user.username.includes(conf.guild.tag) && (!uye.roles.cache.has(modConf.register.family))).array().forEach((uye, index) => {
            if(uye.manageable) { if (modConf.register.family) uye.roles.remove(modConf.register.family) }
          });
            client.guilds.cache.get(conf.guild.id).channels.cache.get(modConfig.register.control).send(embed3.setDescription("Tagımızı taşımayan herkesten rol başarıyla alındı!"))
          }
    }
