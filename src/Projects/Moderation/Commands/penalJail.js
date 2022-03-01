const { Discord, MessageEmbed } = require("discord.js");
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");

module.exports.config = {
    name: "jail",
    aliases: ["cezalı", "jail"],
    usage: "Taslak",
    description: "Taslak Komutu."
};

module.exports.execute = async(ModerationClient , message, args) => {
  //////////
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let sebep = args.splice(2).join(" ") || false; 
  let zaman = args[1] 
  let sahtezaman = zaman;
  if (!message.member.roles.cache.has(modConfig.penal.jailHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(emojis.hata);
  if (!member) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}jail @Richârd/ID Sebep Süre\``).sil(10000);
  if (!sebep) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}jail @Richârd/ID Sebep Süre\``).sil(10000);
  if (!zaman) return main.embedHata(message.author, message.channel, `Komutu doğru kullanmalısın. \`Örnek: ${conf.prefix || '.'}jail @Richârd/ID Sebep Süre\``).sil(10000);
  if(member === message.member) return main.embedHata(message.author, message.channel, `Moderasyon komutlarını kendi üstünde kullanamazsın!`).sil(10000);
  if(!member.bannable) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcı yıkılmaz sallanmaz!`).sil(10000);
  if(message.member.roles.highest.position == member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının ile aynı roldesiniz!`).sil(10000);
  if(message.member.roles.highest.position <= member.roles.highest.position) return main.embedHata(message.author, message.channel, `Belirtilen kullanıcının rolü senin üstünde!`).sil(10000);
  //////////
  
  let cezaID = penals.cek(`cezanumarasi.${message.guild.id}`)+1;
  
//////////

    zaman = zaman.replace("sn","s").replace("dk","m").replace("sa","h").replace("g","d");
    zaman = zaman.replace("saniye","s").replace("dakika","m").replace("saat","h").replace("gün","d");    
    let zamanimizlar = sahtezaman.replace("s","second").replace("m","minute").replace("h","hours").replace("d","day")
    let zamanimiz = zamanimizlar.replace("second"," saniye").replace("minute"," dakika").replace("hours"," saat").replace("day"," gün")


       let atilanAy = moment(Date.now()).format("MM");
      let saat = parseInt(moment(Date.now()).format("HH"))+3;
      let dakika = moment(Date.now()).format("mm");
      let atilanSaat = `${saat}:${dakika}` 
      let atilanYıl = moment(Date.now()).format("YYYY");
      let atilanGün = moment(Date.now()).format("DD");
      let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanYıl} ${atilanSaat}`;
      let bitişAy = moment(Date.now()+ms(zaman)).format("MM");
      let bitissaat = parseInt(moment(Date.now()+ms(zaman)).format("HH"))+3;
      let bitisdakika = moment(Date.now()+ms(zaman)).format("mm");
      let bitişSaat = `${bitissaat}:${bitisdakika}` 
      let bitişGün = moment(Date.now()+ms(zaman)).format("DD");
      let bitişYıl = moment(Date.now()+ms(zaman)).format("YYYY");
      let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişYıl} ${bitişSaat}`;
  

      message.react(emojis.onay)
      modMain.embedBasari(message.author, message.channel, `${member} kullanıcısı **${zamanimiz}** cezalıya atıldı (\`#${cezaID}\`)`)
    
//////////
modMain.cezaEkle(cezaID, member.id, member.displayName, message.member.displayName, message.author.id, "TEMP-JAIL", sebep, zamanimiz, muteAtılma, muteBitiş, "jail")
let ceza = {  
    mod: message.author.id, 
    sebep: sebep, 
    kisi: member.displayName, 
    id: cezaID, 
    zaman: muteAtılma,
    bitis: muteBitiş, 
    komut: "TEMP-JAIL" 
    };
  let soncezaaktif = {
    mod: message.member.displayName, 
    sebep: sebep, 
    id: cezaID,  
    durum: `✔️ [AKTIF]`,
    bitis: muteBitiş, 
    komut: "TEMP-JAIL" 
  };
penals.degerekle(`sicil.${member.id}.${conf.guild.id}`, ceza);
penals.ekle(`sicilsayi.${member.id}.${conf.guild.id}`, 1);
penals.ayarla(`sonceza.${member.id}.${conf.guild.id}`, soncezaaktif);
penals.ekle(`cezanumarasi.${conf.guild.id}`, +1);
let roller = member.roles.cache.filter(r => r.name !== "@everyone" && r.id !== modConfig.booster).map(r => r.id)
/*db.set(`jroles.${member.id}`, roller)*/
if(member.voice.channel) member.voice.kick()
member.roles.cache.has(modConfig.booster) ? member.roles.set([modConfig.booster, modConfig.penal.jailed]) : member.roles.set([modConfig.penal.jailed]);
message.guild.log(cezaID, message.author, member, sebep, muteAtılma, muteBitiş, "jail", "penal-log")
//////////
setTimeout(() => {
    message.guild.unlog(cezaID, message.author, member, sebep, muteAtılma, muteBitiş, "jail", "penal-log")
    member.roles.remove(modConfig.penal.jailed)
    member.roles.remove(modConfig.penal.jailed)
    member.roles.add(roller)
    member.roles.add(roller)
    /*    await member.roles.set(db.get(`jroles.${member.id}`))
    await db.delete(`jroles.${member.id}`);  */
    let cezalar = {  mod: message.member.displayName, 
        sebep: sebep, 
        uye: member,
        kisi: member.displayName, 
        id: cezaID, 
        durum: `❌ [PASIF]`,
        zaman: muteAtılma,
        bitis: muteBitiş,
        komut: "TEMP-JAIL" 
        };
          penals.ayarla(`cezalar.${cezaID}.${conf.guild.id}`, cezalar);
      
    penals.ayarla(`sonceza.${member.id}.${message.guild.id}`, { 
mod: message.member.displayName, 
sebep: sebep, 
id: cezaID,  
durum: `❌ [PASIF]`,
bitis: muteBitiş,
komut: "TEMP-JAIL" 
});    
}, ms(zaman))

};
