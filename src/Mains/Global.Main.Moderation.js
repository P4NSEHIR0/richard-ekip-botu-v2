const { Discord, MessageEmbed } = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
const Veritabani = require("richard.db");

const penals = (global.penals = new Veritabani(
  "./src/Projects/Register/Models/Penals.json"
));

const memberdb = (global.memberdb = new Veritabani(
  "./src/Projects/Register/Models/Member.json"
));

const guildb = (global.guildb = new Veritabani(
  "./src/Projects/Moderation/Models/Guild.json"
));

class ModerationMain {
  static setup() {
    client.login(conf.token.moderation);
    const modConfig =
      (global.modConfig = require("../Configs/Global.Config.Moderation.json"));
  }

  static memberJoin(member, channel) {
    let memberDay = Date.now() - member.user.createdTimestamp;
    var toplamüye = member.guild.memberCount;
    let sure = moment
      .duration(memberDay)
      .format("Y [Yıl], M [Ay], W [Hafta], DD [Gün], HH [saat], mm [dakika]")
      .replace(" 0 Gün,", "")
      .replace("0 Saat,", "")
      .replace("00 Saat,", "")
      .replace(" 0 Dakika,", "")
      .replace(" 01 Gün", " 1 Gün")
      .replace(" 02 Gün", " 2 Gün")
      .replace(" 03 Gün", " 3 Gün")
      .replace(" 04 Gün", " 4 Gün")
      .replace(" 05 Gün", " 5 Gün")
      .replace(" 06 Gün", " 6 Gün")
      .replace(" 07 Gün", " 7 Gün")
      .replace(" 08 Gün", " 8 Gün")
      .replace(" 09 Gün", " 9 Gün")
      .replace(", 0 Hafta,", "")
      .replace("0 Yıl,", "")
      .replace(", 0 Ay,", "")
      .replace(" 00 Ay", "")
      .replace(" 00 Dakika,", "")
      .replace(" 00 Saniye,", "")
      .replace(", 00 saat,", "")
      .replace(" 00 Hafta", "")
      .replace(" 00 Gün", "")
      .replace(", 0 Gün", "")
      .replace(", 00 Hafta,", "")
      .replace(" 00 Yıl,", "")
      .replace(", 00 Ay,", "")
      .replace(", 00 Gün", "")
      .replace(" 01 Gün", " 1 Gün")
      .replace(" 02 Gün", " 2 Gün")
      .replace(" 03 Gün", " 3 Gün")
      .replace(" 04 Gün", " 4 Gün")
      .replace(" 05 Gün", " 5 Gün")
      .replace(" 06 Gün", " 6 Gün")
      .replace(" 07 Gün", " 7 Gün")
      .replace(" 08 Gün", " 8 Gün")
      .replace(" 09 Gün", " 9 Gün")
      .replace(" 0 Gün,", "")
      .replace("0 Saat,", "")
      .replace(" 0 Dakika,", "")
      .replace(" 01 Gün", " 1 Gün")
      .replace(" 02 Gün", " 2 Gün")
      .replace(" 03 Gün", " 3 Gün")
      .replace(" 04 Gün", " 4 Gün")
      .replace(" 05 Gün", " 5 Gün")
      .replace(" 06 Gün", " 6 Gün")
      .replace(" 07 Gün", " 7 Gün")
      .replace(" 08 Gün", " 8 Gün")
      .replace(" 09 Gün", " 9 Gün");

    const tarihle = (date) => {
      const startedAt = Date.parse(date);
      var msecs = Math.abs(new Date() - startedAt);

      const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
      msecs -= years * 1000 * 60 * 60 * 24 * 365;
      const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
      msecs -= months * 1000 * 60 * 60 * 24 * 30;
      const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
      msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
      const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
      msecs -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(msecs / (1000 * 60 * 60));
      msecs -= hours * 1000 * 60 * 60;
      const mins = Math.floor(msecs / (1000 * 60));
      msecs -= mins * 1000 * 60;
      const secs = Math.floor(msecs / 1000);
      msecs -= secs * 1000;

      var string = "";
      if (years > 0) string += `${years} yıl`;
      else if (months > 0)
        string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`;
      else if (weeks > 0)
        string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`;
      else if (days > 0)
        string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`;
      else if (hours > 0)
        string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`;
      else if (mins > 0)
        string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`;
      else if (secs > 0) string += `${secs} saniye`;
      else string += `saniyeler`;

      string = string.trim();
      return `\`${string} önce\``;
    };
    client.guilds.cache.get(conf.guild.id).channels.cache.get(channel)
      .send(`:sparkles: Merhabalar **${member}** aramıza hoş geldin. Seninle beraber sunucumuz **${toplamüye}** üye sayısına ulaştı. 
    
Hesabın **${moment(member.user.createdAt).format(
      "Do MMMM YYYY"
    )}** tarihinde oluşturulmuş. (\`${sure} önce\`)
    
Tagımızı (\`${conf.guild.tag}\`) aldıktan sonra sol tarafta bulunan **Ses teyit** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin. :tada:`);
    if (member.manageable) {
      member.roles.add(modConfig.register.unregister);
    }
  }
    ////////////// KAYIT KATEGORİSİ //////////////
    
    static kayitSil(uye) {
      let rol = uye.roles.cache.filter(a => a.id !== uye.guild.id && a.id !== modConfig.register.unregister && a.id !== modConfig.booster).map(a => a.id)
      uye.roles.remove(rol)
      uye.roles.add(modConfig.register.unregister)
      uye.setNickname(`${conf.guild.tag} İsim | Yaş?`).catch();
    
    }   
    static kayitEt(uye, yetkili, cinsiyet, isim, yas) {
      if(cinsiyet === "erkek") {
        uye.roles.remove(modConfig.register.unregister)
        uye.roles.remove(modConfig.register.unregister)
       
        uye.roles.add(modConfig.register.man)
        uye.roles.add(modConfig.register.man)
                if (uye.user.username.includes(conf.guild.tag) && !uye.roles.cache.has(modConfig.register.family)) {
                  uye.roles.add(modConfig.register.family);
                  uye.roles.add(modConfig.register.family);
                } 
                              memberdb.ayarla(`kullanici.${uye}.cinsiyet`, "erkek")
                memberdb.degerekle(`isimler.${uye.id}`, {
                    guildName: `${isim} | ${yas}`,
                    Name: isim,
                    Yetkili: yetkili.id,
                    Komut: modConfig.register.man
                });
                memberdb.ekle(`isimmiktar.${uye.id}`, +1);
                memberdb.ayarla(`sonisim.${uye.id}`, isim);
                memberdb.ayarla(`sonyas.${uye.id}`, yas);
      } else if(cinsiyet === "kadin") {
        uye.roles.remove(modConfig.register.unregister)
        uye.roles.remove(modConfig.register.unregister)
        
        uye.roles.add(modConfig.register.woman)    
        uye.roles.add(modConfig.register.woman)    
        if (uye.user.username.includes(conf.guild.tag) && !uye.roles.cache.has(modConfig.register.family)) {
          uye.roles.add(modConfig.register.family);
          uye.roles.add(modConfig.register.family);
        } 
                      memberdb.ayarla(`kullanici.${uye}.cinsiyet`, "kadin")
        memberdb.degerekle(`isimler.${uye.id}`, {
            guildName: `${isim} | ${yas}`,
            Name: isim,
            Yetkili: yetkili.id,
            Komut: modConfig.register.woman
        });
        memberdb.ekle(`isimmiktar.${uye.id}`, +1);
        memberdb.ayarla(`sonisim.${uye.id}`, isim);
        memberdb.ayarla(`sonyas.${uye.id}`, yas);
      } else if(cinsiyet === "isim") {
        let durum;
        if (uye.roles.cache.has(modConfig.register.man) && !uye.roles.cache.has(modConfig.register.woman)) durum = modConfig.register.man;
        if (uye.roles.cache.has(modConfig.register.woman) && !uye.roles.cache.has(modConfig.register.man)) durum = modConfig.register.woman;
        if (!uye.roles.cache.has(modConfig.register.man) && !uye.roles.cache.has(modConfig.register.woman)) durum = modConfig.register.unregister;
        memberdb.degerekle(`isimler.${uye.id}`, {
            guildName: `${isim} | ${yas}`,
            Name: isim,
            Yetkili: yetkili.id,
            Komut: durum
        });
        memberdb.ekle(`isimmiktar.${uye.id}`, +1);
        memberdb.ayarla(`sonisim.${uye.id}`, isim);
        memberdb.ayarla(`sonyas.${uye.id}`, yas);
    
      }
    }   
    ////////////// KAYIT KATEGORİSİ //////////////

static cezaEkle(cezanumarasi, uye, uyename, yetkili, yetkiliid, tur, sebep, sure, as, bz, veritipi) {
  let server = conf.guild.id;
  let cezalar = {  mod: yetkili, 
  sebep: sebep, 
  uye: uye,
  kisi: uyename, 
  id: cezanumarasi, 
  durum: `✔️ [AKTIF]`,
  zaman: as,
  bitis: bz, 
  komut: tur 
  };
    penals.ayarla(`cezalar.${cezanumarasi}.${server}`, cezalar);
/*
    if(veritipi === "chatmute") {
penals.ekle(`cezapuan.${uye.id}.${server}`, 10);
penals.ekle(`cezasayi.${uye.id}.${server}`, 1);
let puan = penals.cek(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(settings.server).puanlog(yetkiliid, uye, puan, "chatmute", "puan-log")
    } else if(veritipi === "voicemute") {
penals.ekle(`cezapuan.${uye.id}.${server}`, 10);
penals.ekle(`cezasayi.${uye.id}.${server}`, 1);
let puan = penals.cek(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(settings.server).puanlog(yetkiliid, uye, puan, "voicemute", "puan-log")
    } else if(veritipi === "jail") {
penals.ekle(`cezapuan.${uye.id}.${server}`, 20);
penals.ekle(`cezasayi.${uye.id}.${server}`, 1);
let puan = penals.cek(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(settings.server).puanlog(yetkiliid, uye, puan, "jail", "puan-log")
    } else if(veritipi === "ban") {
penals.ekle(`cezapuan.${uye.id}.${server}`, 60);
penals.ekle(`cezasayi.${uye.id}.${server}`, 1);
let puan = penals.cek(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(settings.server).puanlog(yetkiliid, uye, puan, "ban", "puan-log")
    } else if(veritipi === "warn") {
penals.ekle(`cezapuan.${uye.id}.${server}`, 5);
penals.ekle(`cezasayi.${uye.id}.${server}`, 1);
let puan = penals.cek(`cezapuan.${uye.id}.${server}`);
client.guilds.cache.get(settings.server).puanlog(yetkiliid, uye, puan, "warn", "puan-log")
    } 
*/}
////////////// CEZA KATEGORİSİ //////////////

  
  static test() {}
}
module.exports = ModerationMain;
