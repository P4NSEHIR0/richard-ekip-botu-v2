const { Discord, MessageEmbed } = require("discord.js");

  module.exports.databaseconfig = {

  name: "dagit",
  aliases: ["dagit"],
  usage: "dagit ID",
  
                          };

module.exports.execute = async(client, message, args) => {
  

if(message.author.id !== conf.owner) return;
let icerik = args[0];
if(!icerik) return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}dagit ID\``).sil(10000);
if(!Number(icerik)) return message.lineReplyNoMention(`${answer.hata} ${answer.hatalikullanim} \`Örnek: ${conf.prefix}dagit ID\``).sil(10000);

let veri = guildRoles.cek(`${icerik}.${conf.guild.id}`);
if(!veri) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait veri bulunamadı!`).sil(10000);
if(!veri.name) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [isim]`).sil(10000);
if(!veri.color) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [renk]`).sil(10000);
if(!veri.hoist) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [ayırma]`).sil(10000);
if(!veri.position) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [yer]`).sil(10000);
if(!veri.permissions) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [yetki]`).sil(10000);
if(!veri.members) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [üye]`).sil(10000);
if(!veri.count) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [miktar]`).sil(10000);
if(!veri.channelOverwrites) return message.lineReplyNoMention(`${answer.hata} Veritabanında belirtilen Rol ID'sine ait hasarlı veriler bulundu! [kanal]`).sil(10000);

let ayirma;
if(veri.hoist === true) ayirma = "Açık";
if(veri.hoist === false) ayirma = "Kapalı";
await message.lineReplyNoMention(`${answer.onay} Veritabanında belirtilen Rol ID'sine ait veri bulundu ve veriler aşağıda listelendi;

**Rolün Adı:** \`${veri.name}\` 
**Rolün Rengi:** \`${veri.color}\` 
**Rolün Ayırması:** \`${ayirma}\` 
**Rolün Yeri:** \`${veri.position}\`
**Rolün Üye Sayısı:** \`${veri.count}\``).then(msg => {
  msg.react("✅");

  const onay = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;

  const collect = msg.createReactionCollector(onay, { time: 60000 });
  
  collect.on("collect", async r => {
    msg.delete().catch(err => console.log(`Mesaj silinemedi.`));
    let yeniRol = await message.guild.roles.create({
      data: {
        name: veri.name,
        color: veri.color,
        hoist: veri.hoist,
        permissions: veri.permissions,
        position: veri.position,
        mentionable: veri.mentionable
      },
      reason: "Richard~ Backup =)"
    });
    await message.lineReplyNoMention(`${answer.onay} Rol Kuruldu kanal izinleri ayarlanıyor.`).sil(60000)

    setTimeout(() => {
      let kanalPermVeri = veri.channelOverwrites;
      if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
        let kanal = message.guild.channels.cache.get(perm.id);
        if (!kanal) return;
        setTimeout(() => {
          let yeniKanalPermVeri = {};
          perm.allow.forEach(p => {
            yeniKanalPermVeri[p] = true;
          });
          perm.deny.forEach(p => {
            yeniKanalPermVeri[p] = false;
          });
          kanal.createOverwrite(yeniRol, yeniKanalPermVeri).catch(console.error);
        }, index*5000);
      });
    }, 5000);
    await message.lineReplyNoMention(`${answer.onay} Rolün kanal izinleri ayarlandı dağıtıma başlanıyor, Rol toplam **${veri.count}** kişiye verilecektir. (Gecikmeye göre değişiklik gösterebilir.)`).sil(60000)

    let roleMembers = veri.members;
    roleMembers.forEach((member, index) => {
      let uye = message.guild.members.cache.get(member);
      if (!uye || uye.roles.cache.has(yeniRol.id)) return;
      setTimeout(() => {
        uye.roles.add(yeniRol.id).catch(console.error);
      }, index*3000);
    });
  })
  
});
};
