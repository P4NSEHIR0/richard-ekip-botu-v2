const {Discord,MessageEmbed} = require('discord.js');

class Guard1Main {    

    static setup() {
        Guard2Client.login(conf.token.guard2)
}
static permLock(obj, permes) {
    obj.roles.cache.filter(rol => rol.editable).filter(rol => permes.some(xd => rol.permissions.has(xd))).forEach(async (rol) => rol.setPermissions(0));
}


static test() {
}

}
module.exports = Guard1Main;
