const Discord = require("discord.js");
require('discord-reply');
module.exports = (msg) => {
if(msg.author.id === conf.owner) {

	msg.react("<:yalnzm:896271027187904534>");

				       }
    if (
  
      msg.content === "<@744229839137144925>"

    ) {
      msg.lineReply("küfür yemek istemiosan bunu bir daha deneme :)");
      
    }
  };
  module.exports.config = {
      name: "message"
    }