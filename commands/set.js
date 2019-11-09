module.exports.run = async (bot, message, args) => {
    message.delete().catch();
    let msg = message.content.toLowerCase();
    if(!msg.split(" ").slice(1)[0]){
    return message.channel.send(`Please use ${serversettings[message.guild.id].prefix}set prefix`).then(x => x.delete(15000))
}
if(msg.split(" ").slice(1)[0] == "prefix"){
serversettings[message.guild.id] = {
    prefix: args[1].slice(0)
}
     let changeprefixembed = new Discord.RichEmbed()
   .addField(`New prefix:`, `${message.author.username} changed the bot prefix to : "${args[1].slice(0)}"`)
   .setTimestamp();
   message.channel.send(changeprefixembed).then(x => x.delete(15000))
}
fs.writeFile("./json/serversettings.json", JSON.stringify(serversettings), (err) => {
    if (err) console.log(err), errorlogger.write(err);
  });
   };
module.exports.help = {
    name: 'set'
}
