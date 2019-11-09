bot.on("message", async message => {
let msg = message.content.toLowerCase();
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("", {
      embed: new Discord.RichEmbed()
       .setDescription("Sorry, but you can't do that in here!")
  })
if(msg == "--resetprefix") {
if(message.author.id !== message.guild.owner.id) {
    if(message.author.id !== "293841631583535106") {
    return message.channel.send("", {
     embed: new Discord.RichEmbed()
        .setColor(0x36393e)
        .setDescription(`Sorry, No Permission! (only server owners have access to this command) `)
        .setFooter("Mr.Giveaway | No permission!")
    }).then(q => q.delete(15000))
}
 }
serversettings[message.guild.id] = {
    prefix: "g?"
};
fs.writeFile("./json/serversettings.json", JSON.stringify(serversettings), (err) => {
    if (err) console.log(err), errorlogger.write(err);
    });   
    message.channel.send("", {
     embed : new Discord.RichEmbed()
     .setDescription(`The prefix has been restored: **g?** `)
     .setColor(0x36393e)
     .setFooter("Mr.Giveaway")
    });
   }
   });