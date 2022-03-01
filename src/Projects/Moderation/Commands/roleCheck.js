const { Discord, MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports.config = {
  name: "rolbilgi",
  aliases: ["rolbilgi", "rolecheck", "rolinfo"],
  usage: "rolbilgi @Role/ID",
};

module.exports.execute = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.react(emojis.hata);
  const rol =
    message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

  if (!rol) return message.react(emojis.hata);
  let sesli = message.guild.members.cache
    .filter((s) => s.roles.cache.has(rol.id))
    .filter((s) => s.voice.channel)
    .map((s) => s)
    .join(", ");
  let sessiz = message.guild.members.cache
    .filter((s) => s.roles.cache.has(rol.id))
    .filter((s) => !s.voice.channel)
    .map((s) => s)
    .join(", ");
  let uyeler = message.guild.members.cache
    .filter((s) => s.roles.cache.has(rol.id))
    .map((s) => s)
    .join(`, `);

  let Button1 = new MessageButton()
    .setStyle("blurple")
    .setEmoji("◀")
    .setLabel("Önceki Sayfa")
    .setID("Button1");

  let Button2 = new MessageButton()
    .setStyle("blurple")
    .setEmoji("▶")
    .setLabel("Sonraki Sayfa")
    .setID("Button2");

  let Button3 = new MessageButton()
    .setStyle("gray")
    .setEmoji("❌")
    .setID("Button3");

  let mesaj = await message.channel.send({
    embed: {
      description: `**${rol} Rolünün Bilgileri**

**>** \`Rol Adı:\` **${rol.name}**
**>** \`Rol ID:\` **${rol.id}**
**>** \`Roldeki Üye Sayısı:\` **${rol.members.size}**`,
      footer: { text: conf.footer },
      color: rol.color,
      thumbnail: {
        url: message.author.avatarURL({ dynamic: true, size: 2048 }),
      },
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL({ dynamic: true, size: 2048 }),
      },
    },
    buttons: [Button1, Button2, Button3],
  }).sil(40000);

  client.on("clickButton", async (button) => {
    if (button.id === "Button1") {
      if (button.clicker.member.id === message.author.id) {
        await mesaj.edit({
          embed: {
            description: `**${rol} Rolünün Bilgileri**

**>** \`Rol Adı:\` **${rol.name}**
**>** \`Rol ID:\` **${rol.id}**
**>** \`Roldeki Üye Sayısı:\` **${rol.members.size}**`,
            footer: { text: conf.footer },
            color: rol.color,
            thumbnail: {
              url: message.author.avatarURL({ dynamic: true, size: 2048 }),
            },
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL({ dynamic: true, size: 2048 }),
            },
          },
          buttons: [Button1, Button2, Button3],
        });
        await button.defer();
      } else {
        await button.think(true);
        await button.reply.edit(
          `${answer.hata} Sadece mesaj sahibi kullanabilir!`
        );
      }
    }

    if (button.id === "Button2") {
      if (button.clicker.member.id === message.author.id) {
        await mesaj.edit({
          embed: {
            description: `**Rolde Bulunanlar**
${uyeler || "Kimse bulunmamaktadır."}

**Rolün Seste Olanları**
${sesli || "Kimse bulunmamaktadır."}

**Rolün Seste Olmayanları**
${sessiz || "Kimse bulunmamaktadır."}`,
            footer: { text: conf.footer },
            color: rol.color,
            thumbnail: {
              url: message.author.avatarURL({ dynamic: true, size: 2048 }),
            },
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL({ dynamic: true, size: 2048 }),
            },
          },
          buttons: [Button1, Button2, Button3],
        });
        await button.defer();
      } else {
        await button.think(true);
        await button.reply.edit(
          `${answer.hata} Sadece mesaj sahibi kullanabilir!`
        );
      }
    }

    if (button.id === "Button3") {
      if (button.clicker.member.id === message.author.id) {
        if(mesaj) await mesaj.delete();
        await message.react(emojis.onay);
      } else {
        await button.think(true);
        await button.reply.edit(
          `${answer.hata} Sadece mesaj sahibi kullanabilir!`
        );
      }
    }
  });
  
};
