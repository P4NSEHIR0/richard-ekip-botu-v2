const { Discord, MessageEmbed } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageMenu,
  MessageMenuOption,
} = require("discord-buttons");

module.exports.config = {
  name: "settings",
  aliases: ["qweeeeeee"],
  usage: "Taslak",
};

module.exports.execute = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;

  let option_1 = new MessageMenuOption()
    .setLabel("Bilgilendirme")
    .setValue("1")
    .setDescription("Belirlenmiş kanal/rol/limit'leri listeler.")
    .setDefault()
    .setEmoji("📚");

  let option_2 = new MessageMenuOption()
    .setLabel("Kanal Ayarları")
    .setValue("2")
    .setDescription("Kanal ayar seçim menüsü")
    .setDefault()
    .setEmoji("🔱");

  let option_3 = new MessageMenuOption()
    .setLabel("Rol Ayarları")
    .setValue("3")
    .setDescription("Rol ayar seçim menüsü")
    .setDefault()
    .setEmoji("🔱");

  let option_4 = new MessageMenuOption()
    .setLabel("Limit Ayarları")
    .setValue("4")
    .setDescription("Limit ayar seçim menüsü")
    .setDefault()
    .setEmoji("🔱");

  let option_5 = new MessageMenuOption()
    .setLabel("Guard Ayarları")
    .setValue("5")
    .setDescription("Guard ayar seçim menüsü")
    .setDefault()
    .setEmoji("🔱");

  let option_6 = new MessageMenuOption()
    .setLabel("Database Ayarları")
    .setValue("6")
    .setDescription("Database ayar seçim menüsü")
    .setDefault()
    .setEmoji("🔱");

  let option_7 = new MessageMenuOption()
    .setLabel("Richard Ayar")
    .setValue("7")
    .setDescription("Richard özel ayar menüsü")
    .setDefault()
    .setEmoji("🔱");

  let selection = new MessageMenu()
    .setID("selector")
    .setPlaceholder("Sunucu Ayar Menüsü")
    .addOption(option_1)
    .addOption(option_2)
    .addOption(option_3)
    .addOption(option_4)
    .addOption(option_5)
    .addOption(option_6)
    .addOption(option_7);

  await message.channel.send(
    `Aşağıdaki menüden seçim yapmalısın dostum!`,
    selection
  );

  client.on("clickMenu", async (menu) => {
    let uye = menu.clicker.member;
    if(uye.id !== conf.owner) return menu.reply.defer();
    menu.reply.defer();
    if (menu.values[0] === "1") {
      message.channel.send({
        embed: {
          description: `${message.guild.name} (${conf.guild.id}) Sunucusunun ayarları aşağıda listelenmiştir;

**${emojis.onay} Sunucu Ayarları**

**Proje Sunucusu:** ${settings.cek("guild.id") || answer.ayarlanmadı}
**Sunucu Tagı:** ${settings.cek("guild.tag") || answer.ayarlanmadı}
**Proje Ses Kanalı:** ${settings.cek("guild.voice") || answer.ayarlanmadı}

**${emojis.onay} Database Ayarları**

**Yedek Sunucusu:** ${settings.cek("database.backup.guild") || answer.ayarlanmadı}
**Yedek Yükleme Kanalı:** ${settings.cek("database.upload") || answer.ayarlanmadı}
**Denetim Kaydı Kanalı:** ${settings.cek("database.log") || answer.ayarlanmadı}
**Denetim Kaydı (2) Kanalı:** ${settings.cek("database.log2") || answer.ayarlanmadı}
**Mesaj Kaydı Kanalı:** ${settings.cek("database.message.log") || answer.ayarlanmadı}

**${emojis.onay} Guard Ayarları**

**Güvenli Üye ID'leri:** ${settings.cek("guard.safe.member") || answer.ayarlanmadı}
**Güvenli Bot ID'leri:** ${settings.cek("guard.safe.bots") || answer.ayarlanmadı}
**Denetim Kaydı Kanalı:** ${settings.cek("guard.log") || answer.ayarlanmadı}
**Denetim Kaydı (2) Kanalı:** ${settings.cek("guard.log2") || answer.ayarlanmadı}
**Takviyeci Rolü:** ${settings.cek("guard.booster") || answer.ayarlanmadı}

**${emojis.onay} Moderation Ayarları**

**Kayıtsız Rolü:** ${settings.cek("register.unregister") || answer.ayarlanmadı}
**Erkek Rolü:** ${settings.cek("register.man") || answer.ayarlanmadı}
**Kadın Rolü:** ${settings.cek("register.woman") || answer.ayarlanmadı}
**Şüpheli Rolü:** ${settings.cek("register.suspect") || answer.ayarlanmadı}
**Kayıt Kanalı:** ${settings.cek("register.channel") || answer.ayarlanmadı}
**Cezalı Rolü:** ${settings.cek("moderation.penal.punished") || answer.ayarlanmadı}
**Cezalı Rolü:** ${settings.cek("moderation.penal.chatmuted") || answer.ayarlanmadı}
**Cezalı Rolü:** ${settings.cek("moderation.penal.voicemuted") || answer.ayarlanmadı}
**Cezalı Rolü:** ${settings.cek("moderation.penal.warned") || answer.ayarlanmadı}
**Uzaklaştırma Yetki Rolü:** ${settings.cek("moderation.penal.ban") || answer.ayarlanmadı}
**Sunucudan Atma Yetki Rolü:** ${settings.cek("moderation.penal.kick") || answer.ayarlanmadı}
**Cezalı Yetki Rolü:** ${settings.cek("moderation.penal.jail") || answer.ayarlanmadı}
**Yazılı Susturma Yetki Rolü:** ${settings.cek("moderation.penal.chatmute") || answer.ayarlanmadı}
**Sesli Susturma Yetki Rolü:** ${settings.cek("moderation.penal.voicemute") || answer.ayarlanmadı}
**Uyarı Yetki Rolü:** ${settings.cek("moderation.penal.warn") || answer.ayarlanmadı}
**Sesli Yetki Rolü:** ${settings.cek("moderation.penal.voice") || answer.ayarlanmadı}
**Yetenek Yetki Rolü:** ${settings.cek("moderation.penal.ability") || answer.ayarlanmadı}
**Susturma Denetim Kaydı Kanalı:** ${settings.cek("moderation.penal.log.mute") || answer.ayarlanmadı}
**Cezalı Denetim Kaydı Kanalı:** ${settings.cek("moderation.penal.log.jail") || answer.ayarlanmadı}
**Uzaklaştırma Denetim Kaydı Kanalı:** ${settings.cek("moderation.penal.log.ban") || answer.ayarlanmadı}
**Uyarı Denetim Kaydı Kanalı:** ${settings.cek("moderation.penal.log.warn") || answer.ayarlanmadı}`,
          footer: {
            text: "richard yaptı la :)",
            icon_url:
              message.author.avatarURL(),
          },
          color: "RANDOM",
          thumbnail: {
            url: message.author.avatarURL(),
          },
        },
      });
    }
    if (menu.values[0] === "2") {
      message.channel.send("as");
    }
    if (menu.values[0] === "3") {
      message.channel.send("hg");
    }
    if (menu.values[0] === "4") {
      message.channel.send("hb");
    }
    if (menu.values[0] === "5") {
      message.channel.send("nbr");
    }
    if (menu.values[0] === "6") {
      message.channel.send("ii senden");
    }
    if (menu.values[0] === "7") {
      message.channel.send("ok bb");
    }
  });
};

/*

        embed: {
          description: `sa`,
          footer: { text: "vigilante.tk | Purchase bot or code :)", icon_url: "https://cdn.discordapp.com/avatars/849021353301639168/67b14dc5f942c409d346b7119c23f31f.webp?size=80" },
          color: "RANDOM",
          thumbnail: {
            url: "https://cdn.discordapp.com/avatars/849021353301639168/67b14dc5f942c409d346b7119c23f31f.webp?size=80",
          },
          author: {
            name: "Buy Discord Bot / Custom Bot / Custom Code / Source Code",
            icon_url: "https://cdn.discordapp.com/avatars/849021353301639168/67b14dc5f942c409d346b7119c23f31f.webp?size=80",
          }
        }

*/
