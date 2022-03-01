const {Discord,MessageEmbed} = require('discord.js');

class Main {    
    ////////////// EMBED KATEGORİSİ //////////////

    static mesaj(embed, sahip, kanal, mesaj, süre) {
        let sure;
        if(süre) {sure = süre} else {sure = 9999999}

        if(embed === "true") {
        main.embedOlustur(sahip, kanal, mesaj, "RANDOM").sil(sure);
                             } else {
        kanal.send(mesaj).sil(sure)
                             }

    }
    ////////////// EMBED KATEGORİSİ //////////////
    static hata(embed, sahip, kanal, mesaj, süre) {
        let sure;
        if(süre) {sure = süre} else {sure = 9999999}

        if(embed === "true") {
        main.embedOlustur(sahip, kanal, mesaj, "RED").sil(sure);
                             } else {
        kanal.send(mesaj).sil(sure)
                             }

    }
    ////////////// EMBED KATEGORİSİ //////////////
    static basari(embed, sahip, kanal, mesaj, süre) {
        let sure;
        if(süre) {sure = süre} else {sure = 9999999}

        if(embed === "true") {
        main.embedOlustur(sahip, kanal, mesaj, "GREEN").sil(sure);
                             } else {
        kanal.send(mesaj).sil(sure)
                             }
    }
    ////////////// EMBED KATEGORİSİ //////////////
    static embedOlustur(uye, kanal, aciklama, color) {
        return kanal.send(new MessageEmbed()
    .setDescription(aciklama)
    .setColor(color)
    .setFooter(conf.footer)
    .setAuthor(uye.tag, uye.avatarURL({ dynamic: true, size: 2048 })));
    
      }   
      static embedBasari(uye, kanal, aciklama) {
       return kanal.send(new MessageEmbed()
       .setDescription(aciklama)
       .setColor("#00ff00")
       .setFooter(conf.footer)
       .setAuthor(uye.tag, uye.avatarURL({dynamic: true, size: 2048}))); 
      }
      static embedHata(uye, kanal, aciklama) {
        return kanal.send(new MessageEmbed()
    .setDescription(aciklama)
    .setColor("#ff0000")
    .setFooter(conf.footer)
    .setAuthor(uye.tag, uye.avatarURL({ dynamic: true, size: 2048 })));
      }   
////////////// CEZA KATEGORİSİ //////////////
    static test() {
}

}
module.exports = Main;
