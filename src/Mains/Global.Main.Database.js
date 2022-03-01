const { Discord, MessageEmbed } = require("discord.js");
const Veritabani = require("richard.db");
const path = require("path");
const moment = require("moment");
class DatabaseMain {
    
  static setup() {
    DatabaseClient.login(conf.token.database);
    const dataConfig =
      (global.dataConfig = require("../Configs/Global.Config.Database.json"));

    const settings = global.settings = new Veritabani(
      "./src/Projects/Database/Models/Guild.Settings.json"
    );

    const guildDatabase = (global.guildDatabase = new Veritabani(
      "./src/Projects/Database/Models/Guild.Database.json"
    ));
    const guildRoles = (global.guildRoles = new Veritabani(
      "./src/Projects/Database/Models/Guild.Roles.json"
    ));
    const guildChannels = (global.guildChannels = new Veritabani(
      "./src/Projects/Database/Models/Guild.Channels.json"
    ));
  }

  static roleUpload() {
    DatabaseClient.guilds.cache
      .get(dataConfig.backupguild)
      .channels.cache.get(dataConfig.upload)
      .send(`Veritabanı Rol Yedeği Aşağıda Bulunmaktadır.`, {
        files: [
          {
            attachment: path.resolve(
              "./src/Projects/Database/Models/Guild.Roles.json"
            ),
            name: `${conf.guild.id}.roller.json`,
          },
        ],
      });
  }

  static channelUpload() {
    DatabaseClient.guilds.cache
      .get(dataConfig.backupguild)
      .channels.cache.get(dataConfig.upload)
      .send(`Veritabanı Kanal Yedeği Aşağıda Bulunmaktadır.`, {
        files: [
          {
            attachment: path.resolve(
              "./src/Projects/Database/Models/Guild.Channels.json"
            ),
            name: `${conf.guild.id}.kanallar.json`,
          },
        ],
      });
  }

  static roleBackup() {
    let guild = DatabaseClient.guilds.cache.get(conf.guild.id);
    if (guild) {
      guild.roles.cache
        .filter((r) => r.name !== "@everyone" && !r.managed)
        .forEach((role) => {
          let roleChannelOverwrites = [];
          guild.channels.cache
            .filter((c) => c.permissionOverwrites.has(role.id))
            .forEach((c) => {
              let channelPerm = c.permissionOverwrites.get(role.id);
              let pushlanacak = {
                id: c.id,
                allow: channelPerm.allow.toArray(),
                deny: channelPerm.deny.toArray(),
              };
              roleChannelOverwrites.push(pushlanacak);
            });

          guildRoles.ayarla(`${role.id}.${conf.guild.id}`, {
            name: role.name,
            color: role.hexColor,
            hoist: role.hoist,
            position: role.position,
            permissions: role.permissions,
            mentionable: role.mentionable,
            count: role.members.size,
            members: role.members.map((m) => m.id),
            channelOverwrites: roleChannelOverwrites,
          });
        });
    }
  }

  static channelBackup() {
    let guild = client.guilds.cache.get(conf.guild.id);
    if (guild) {
      guild.channels.cache
        .filter((kanal) => kanal.deleted !== true)
        .forEach((channel) => {
          let permissionss = {};
          let sayi = Number(0);

          channel.permissionOverwrites.forEach((perm) => {
            let thisPermOverwrites = {};
            perm.allow.toArray().forEach((p) => {
              thisPermOverwrites[p] = true;
            });
            perm.deny.toArray().forEach((p) => {
              thisPermOverwrites[p] = false;
            });
            permissionss[sayi] = {
              permission: perm.id == null ? guild.id : perm.id,
              thisPermOverwrites,
            };
            sayi++;
          });

          if (channel.type === "voice") {
            guildChannels.ayarla(`${channel.id}.${conf.guild.id}`, {
              name: channel.name,
              parentID: channel.parentID,
              position: channel.position,
              type: channel.type,
              permissionOverwrites: permissionss,
              userLimit: channel.userLimit,
              bitrate: channel.bitrate,
            });
          } else if (channel.type === "category") {
            guildChannels.ayarla(`${channel.id}.${conf.guild.id}`, {
              name: channel.name,
              position: channel.position,
              type: channel.type,
              permissionOverwrites: permissionss,
            });
          } else {
            guildChannels.ayarla(`${channel.id}.${conf.guild.id}`, {
              name: channel.name,
              parentID: channel.parentID,
              position: channel.position,
              nsfw: channel.nsfw,
              rateLimitPerUser: channel.rateLimitPerUser,
              type: channel.type,
              topic: channel.topic ? channel.topic : "Richard~ Backup =)",
              permissionOverwrites: permissionss,
            });
          }
        });
    }
  }

  static backup(kanal) {
    dbMain.roleBackup();
    dbMain.channelBackup();
    DatabaseClient.guilds.cache.get(conf.guild.id).channels.cache.get(kanal).send(`${answer.onay} ${moment(Date.now()).format("L")} Tarihi itibari ile veritabanı güncellendi!`)

  }
}

DatabaseClient.on("ready", () => {
    setInterval(() => {
        dbMain.roleBackup();
        dbMain.channelBackup();
        DatabaseClient.guilds.cache.get(conf.guild.id).channels.cache.get(dataConfig.control).send(`${answer.onay} ${moment(Date.now()).format("L")} Tarihi itibari ile veritabanı güncellendi!`)
    }, 1000*60*20); // 1 saat. 1000*60*60*1
  })
  
module.exports = DatabaseMain;
