exports.run = (bot, message, args) => {
message.channel.send("", {
  embed : new Discord.RichEmbed()
  .addField("Ping", `${new Date().getTime() - message.createdTimestamp} ms.`)
  .setTimestamp()
})
}
  exports.help = {
    name: "ping"
  };