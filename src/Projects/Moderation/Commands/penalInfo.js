const { Discord, MessageEmbed } = require("discord.js");
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");

module.exports.config = {
    name: "ceza",
    aliases: ["ceza", "ci", "punishment", "cezainfo", "cezabilgi"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(ModerationClient , message, args) => {
    if (!message.member.roles.cache.has(modConfig.register.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
    if(!args[0]) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}punishment ID\``).sil(10000);
    if(Number(args[0]) && args[0].length < 15) {
        let ceza = penals.cek(`cezalar.${args[0]}.${conf.guild.id}`);
        if(!ceza){
            return main.embedHata(message.author, message.channel, `\`#${args[0]}\` numaralı ceza bulunamadı.`).then(x => x.delete({timeout:6500}));
        }
        main.embedBasari(message.author, message.channel, `**${message.guild.name}** sunucusunda kayıtlı \`#${args[0]}\` sayılı ceza işlemi <@${ceza.uye}> üzerinde uygulanmıştır ve bilgileri aşşağıda belirtilmiştir.
\`\`\`md
Ceza Durumu => ${ceza.durum}   
Cezalandırılan Üye => ${ceza.kisi}         
Cezalandıran Yetkili => ${ceza.mod}  
Ceza Türü => ${ceza.komut}
Ceza Sebebi => ${ceza.sebep} 
Ceza Başlama tarihi => ${ceza.zaman}
Ceza Bitiş tarihi => ${ceza.bitis}\`\`\``).then(x => x.delete({timeout: 30000}));
    }

};