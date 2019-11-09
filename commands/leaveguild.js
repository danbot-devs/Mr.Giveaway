module.exports.run = async (bot, message, args) => {
if(message.author.id !== "293841631583535106") {
    return message.channel.send("", {
    embed: new Discord.RichEmbed()
        .setColor(0x36393e)
        .setDescription(`Sorry, No Permission (only Bot owners have access to this command!) `)
        .setFooter("Mr.Giveaway")
    }).then(q => q.delete(15000))
};
console.log(`Forcefully left the guild "${message.guild.name}!"`)
message.guild.leave()
};

module.exports.help = {
    name: 'leaveguild'
}