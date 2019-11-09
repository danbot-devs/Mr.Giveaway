bot.on("guildCreate", async (guild) => {
  console.log(`Joined: ${guild.name} Whith The ID: (${guild.id})`)
    let joinembed = new Discord.RichEmbed()
    .setDescription(`Hey <@${guild.owner.id}>. Thanks for inviting me to your server, But you should know this bot is still being worked on. More commands coming soon.\n If you found any bugs or problems message me on discord : Hadi1010#4189\n __Prefix__ : **g?**`)
    .setFooter("Mr.Giveaway | Thank you")
    .setTimestamp();
    bot.users.get(guild.owner.id).send(joinembed);

    if(!serversettings[guild.id]) {
     serversettings[guild.id] = {
        prefix: "g?"
        };
      fs.writeFile("./json/serversettings.json", JSON.stringify(serversettings), (err) => {
        if (err) console.log(err), errorlogger.write(err);
      });
    }

})