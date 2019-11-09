module.exports.run = async (bot, message, args) => {
/*
 let pusage = serversettings[message.guild.id].prefix+module.exports.help;
 let helpcommand = "**>>**"+module.exports.help.name + "           " +module.exports.help.description
 var helplist = helpcommand+"\n\n"
 message.channel.send(helplist)
*/
    
    message.channel.send("", {
     embed : new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(`__**Help List | prefix: ${serversettings[message.guild.id].prefix}**__`)
      .addField(`**${serversettings[message.guild.id].prefix}Help**`, `**>Description**: Show you this list!`)
      .addField(`**${serversettings[message.guild.id].prefix}Giveaway**`, `**>Description**: Start a giveaway. Ill ask you few questions .(Do it in the giveaway Channel).\n**>Usage**:${serversettings[message.guild.id].prefix}giveaway `)
      .addField(`**${serversettings[message.guild.id].prefix}Ping**`, `**>Description**: Shows you my \`Ping\`.\n**>Usage**:${serversettings[message.guild.id].prefix}ping`)
      .addField(`**${serversettings[message.guild.id].prefix}Uptime**`, `**>Description**: Shows informations about me. \n**>Usage**:${serversettings[message.guild.id].prefix}uptime`)
    })
    
    };
    
module.exports.help = {
  name: "help",
  description: "Show you this list",
  usage: "help"
}