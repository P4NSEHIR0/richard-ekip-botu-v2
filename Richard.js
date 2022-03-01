const {Discord,Client,MessageEmbed,Guild} = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const Guard1Client = global.Guard1Client = new Client({ fetchAllMembers: true });
const Guard2Client = global.Guard2Client = new Client({ fetchAllMembers: true });
const DatabaseClient = global.DatabaseClient = new Client({ fetchAllMembers: true });
require("discord-reply")
const logs = require('discord-logs');
logs(client,Guard1Client,Guard2Client, DatabaseClient);
require('discord-buttons')(client,Guard1Client,Guard2Client, DatabaseClient);

//// COMMAND HANDLER ////
const fs = require("fs");
const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;
//// COMMAND HANDLER ////



///////////////// GLOBALS /////////////////
const conf = global.conf = require("./src/Configs/Global.Config.json");
const emojis = global.emojis = require("./src/Configs/Global.Emojis.json");
//////////////// GLOBALS /////////////////

///////////////// MAINS /////////////////
const dbMain = global.dbMain = require("./src/Mains/Global.Main.Database.js");
const grd1Main = global.grd1Main = require("./src/Mains/Global.Main.Guard_1.js");
const grd2Main = global.grd2Main = require("./src/Mains/Global.Main.Guard_2.js");
const modMain = global.modMain = require("./src/Mains/Global.Main.Moderation.js");
const main = global.main = require("./src/Mains/Global.Main.js");
const cevap = require("./src/Mains/Global.Error.Answer");
cevap.replySetup()
modMain.setup()
grd1Main.setup()
grd2Main.setup()
dbMain.setup()
///////////////// MAINS /////////////////

///////////////// HELPER /////////////////
Promise.prototype.sil = function(time) {
    if (this) this.then(s => {
        if (s.deletable) s.delete({ timeout: time }).catch(e => {});
    });
};
///////////////// HELPER /////////////////
Guild.prototype.kanalBul = function(kanalisim) {
    let kanal = this.channels.cache.find(k => k.name === kanalisim)
    return kanal;
}
///////////////// HELPER /////////////////
Guild.prototype.log = async function log(cezaID, yetkili, uye, sebep, as, bz, tip, channelName) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(tip === "chatmute") tur = "metin kanallarından susturuldu!"
    if(tip === "voicemute") tur = "ses kanallarından susturuldu!"
    if(tip === "jail") tur = "cezalandırıldı!"
    if(tip === "warn") tur = "uyarıldı!"
    if(tip === "ban") tur = "yasaklandı!"
    if (channel) {
      main.embedOlustur(yetkili, channel, `${uye} adlı üye **${sebep}** sebebi ile ${yetkili} tarafından ${tur} **[**\`#${cezaID}\`**]**

➸ Ceza Sebebi: \`${sebep}\`
➸ Atılma tarihi: \`${as}\`
➸ Bitiş tarihi: \`${bz}\``, "RANDOM")
    }
}
///////////////// HELPER /////////////////
Guild.prototype.puanlog = async function puanlog(yetkili, uye, miktar, tip, channelName) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(tip === "chatmute") tur = "yazılı kanallarda susturulduğu için **+10** alarak"
    if(tip === "voicemute") tur = "ses kanallarda susturulduğu için **+10** alarak"
    if(tip === "jail") tur = "cezalandırıldığı için **+20** alarak"
    if(tip === "warn") tur = "uyarıldığı için **+5** alarak"
    if(tip === "ban") tur = "yasaklandığı için **+60** alarak"
    if (channel) {
        main.embedOlustur(yetkili, channel, `<@${uye}> adlı üye <@${yetkili}> tarafından ${tur} \`${miktar} Puan\` oldu!`, "RANDOM")
    }
}
///////////////// HELPER /////////////////
Guild.prototype.unlog = async function unlog(cezaID, yetkili, uye, sebep, as, bz, tip, channelName) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(tip === "chatmute") tur = "metin kanallarındaki susturulması bitti!"
    if(tip === "voicemute") tur = "sesli kanallardaki susturulması bitti!"
    if(tip === "jail") tur = "cezası bitti!"
    if (channel) {
      main.embedOlustur(yetkili, channel, `${uye} adlı üyenin ${yetkili} tarafından atılan ${tur}. **[**\`#${cezaID}\`**]**`, "RANDOM")
    }
}

///////////////// HELPER /////////////////

/////////////////// HANDLER ///////////////////
client.on("message", (message) => {
  if (message.author.bot ||!message.content.startsWith(conf.prefix) || !message.channel || message.channel.type == "dm") return;
  let args = message.content
      .substring(conf.prefix.length)
      .split(" ");
  let command = args[0];
  var veriler = ["settings","url","taslak", "kb", "info", "kullanicibilgi", "me", "join", "git",
      "get", "gel", "lock", "kilit", "afk", "avatar", "pp", "clear", "sil",
      "slowmode", "slow", "yavasmod", "say", "voicecontrol", "ses", "sesli", "rollog",
      "sicil", "enrollment", "chatmute", "cm", "yazilimute", "yazilisustur", "chatsustur", 
      "cmute", "csustur", "csustur", "ceza", "ci", "punishment", "cezainfo", "cezabilgi",
      "voicemute", "vm", "seslimute", "seslisustur", "voicesustur", "vmute", "vsustur",
      "ysustur", "cezalı", "jail", "warn", "uyar", "uyarı", "uyari", "yargı", "yasakla",
      "uçur", "ucur", "uçuş", "infaz", "ban", "karantinaal", "unkarantina", "uk", "rq",
      "removequarantine", "private", "priv", "voice", "rolbilgi", "rolecheck", "rolinfo", "i",
      "rolecontrol", "rcontrol","eval", "nerede", "booster", "rich", "vip", "ozel", 
      "name", "n", "isim", "oldnames", "isimler", "kayit", "kayıt", "kız", "bay", 
      "bayan", "k", "kadın", "kiz", "kadin", "erkek", "e", "unregister", "davetsayim",
      "unreg", "kayitsiz", "inv", "invite", "davetlerim", "davetler" ]
      if(veriler.includes(command)) {
  let moderasyonbotu = message.client;
  args = args.splice(1);
  let calistirici;
  if (commands.has(command)) {
    calistirici = commands.get(command);
    calistirici.execute(moderasyonbotu, message, args);
  } else if (aliases.has(command)) {
    calistirici = aliases.get(command);
    calistirici.execute(moderasyonbotu, message, args);
  }
  }
})
    /////////////////// HANDLER ///////////////////
fs.readdir("./src/Projects/Moderation/Commands", (err, files) => {
  if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    console.log('\x1b[32m%s\x1b[0m', `[ MODERATION CONNECTED ]`);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} COMMANDS LOADED ]`);
    files.forEach(file => {
let prop = require(`./src/Projects/Moderation/Commands/${file}`);
  if(!prop.config) return;
  if(typeof prop.onLoad === "function") prop.onLoad(client);
    commands.set(prop.config.name, prop);
  if(prop.config.aliases) prop.config.aliases.forEach(aliase => aliases.set(aliase, prop));
  });
});
    ///////////////////
fs.readdir("./src/Projects/Moderation/Events", (err, files) => {
  if(err) return console.error(err);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    files.filter(file => file.endsWith(".js")).forEach(file => {
  let prop = require(`./src/Projects/Moderation/Events/${file}`);
  if(!prop.config) return;
      client.on(prop.config.name, prop);
      });
    });
/////////////////// HANDLER ///////////////////

    /////////////////// HANDLER ///////////////////
fs.readdir("./src/Projects/Register/Commands", (err, files) => {
  if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    console.log('\x1b[32m%s\x1b[0m', `[ REGISTER CONNECTED ]`);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} COMMANDS LOADED ]`);
    files.forEach(file => {
let prop = require(`./src/Projects/Register/Commands/${file}`);
  if(!prop.config) return;
  if(typeof prop.onLoad === "function") prop.onLoad(client);
    commands.set(prop.config.name, prop);
  if(prop.config.aliases) prop.config.aliases.forEach(aliase => aliases.set(aliase, prop));
  });
});
    ///////////////////
fs.readdir("./src/Projects/Register/Events", (err, files) => {
  if(err) return console.error(err);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    files.filter(file => file.endsWith(".js")).forEach(file => {
  let prop = require(`./src/Projects/Register/Events/${file}`);
  if(!prop.config) return;
      client.on(prop.config.name, prop);
      });
    });
/////////////////// HANDLER ///////////////////


/////////////////// HANDLER ///////////////////
DatabaseClient.on("message", (message) => {
  if (message.author.bot ||!message.content.startsWith(conf.prefix) || !message.channel || message.channel.type == "dm") return;
  let args = message.content
      .substring(conf.prefix.length)
      .split(" ");
  let command = args[0];
  var veriler = ["taslak2", "rbackup", "yt", "cbackup", "dagit", "setup", "snipe"]
      if(veriler.includes(command)) {
  let guardbotu = message.DatabaseClient;
  args = args.splice(1);
  let calistirici;
  if (commands.has(command)) {
    calistirici = commands.get(command);
    calistirici.execute(guardbotu, message, args);
  } else if (aliases.has(command)) {
    calistirici = aliases.get(command);
    calistirici.execute(guardbotu, message, args);
  }
  }
})
    ///////////////////
fs.readdir("./src/Projects/Database/Commands", (err, files) => {
  if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log('\x1b[32m%s\x1b[0m', `[ DATABASE CONNECTED ]`);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} COMMANDS LOADED ]`);
    files.forEach(file => {
let prop = require(`./src/Projects/Database/Commands/${file}`);
  if(!prop.databaseconfig) return;
  if(typeof prop.onLoad === "function") prop.onLoad(DatabaseClient);
    commands.set(prop.databaseconfig.name, prop);
  if(prop.databaseconfig.aliases) prop.databaseconfig.aliases.forEach(aliase => aliases.set(aliase, prop));
  });
});
    ///////////////////
fs.readdir("./src/Projects/Database/Events", (err, files) => {
  if(err) return console.error(err);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    files.filter(file => file.endsWith(".js")).forEach(file => {
  let prop = require(`./src/Projects/Database/Events/${file}`);
  if(!prop.databaseconfig) return;
  DatabaseClient.on(prop.databaseconfig.name, prop);
      });
    });
//////////////////////////////////////

/////////////////// HANDLER ///////////////////
fs.readdir("./src/Projects/Guard_1/Events", (err, files) => {
  if(err) return console.error(err);
    console.log('\x1b[32m%s\x1b[0m', `[ Guard 1 CONNECTED ]`);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    files.filter(file => file.endsWith(".js")).forEach(file => {
  let prop = require(`./src/Projects/Guard_1/Events/${file}`);
  if(!prop.guard1config) return;
  Guard1Client.on(prop.guard1config.name, prop);
      });
    });
//////////////////////////////////////

/////////////////// HANDLER ///////////////////
fs.readdir("./src/Projects/Guard_2/Events", (err, files) => {
  if(err) return console.error(err);
    console.log('\x1b[32m%s\x1b[0m', `[ Guard 2 CONNECTED ]`);
    console.log('\x1b[36m%s\x1b[0m', `[ ${files.length} EVENTS LOADED ]`);
    console.log('\x1b[31m%s\x1b[0m', `[ -------------------------------- ]`);
    files.filter(file => file.endsWith(".js")).forEach(file => {
  let prop = require(`./src/Projects/Guard_2/Events/${file}`);
  if(!prop.guard2config) return;
  Guard2Client.on(prop.guard2config.name, prop);
      });
    });
//////////////////////////////////////
/*
///////////////////
client.on('guildMemberRoleAdd', async(member, role) =>  {
  let atilanAy = moment(Date.now()).format("MM");
  let saat = parseInt(moment(Date.now()).format("HH"))+3;
  let dakika = moment(Date.now()).format("mm");
  let atilanSaat = `${saat}:${dakika}` 
  let atilanYıl = moment(Date.now()).format("YYYY");
  let atilanGün = moment(Date.now()).format("DD");
  let tarihxd = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanYıl} ${atilanSaat}`;
  console.log("qwe")
      const Log = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first());
      if (!Log || !Log.executor || Log.createdTimestamp < (Date.now() - 5000) || member.guild.roles.cache.get(role.id).position < member.guild.roles.cache.get(regiserConfig.register).position) return;
      memberdb.ekle(`rolsayi_${member.id}`, +1)
      memberdb.degerekle(`rollogu.${member.id}_qwe`, {
      verilenrol: role.id,
      emoji: emojis.onay,
      roldurum: "verildi",
      yetkili: Log.executor.id,
      tarih: tarihxd
      })
  })
  */
///////////////////
client.embedGenislet = async function(description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};

/*

if(!['s', 'sn', 'saniye', 'm', 'minute', 'dk', 'dakika', 'h', 'hour', 'st', 'saat', 'd', 'day', 'g', 'gün'].some(arg => duration.includes(arg))) return message.channel.send(`Sadece \`saniye(s)\` , \`dakika(m)\` , \`saat(h)\` , \`gün(d)\` cinsinden bir süre belirtmelisin!`);


*/