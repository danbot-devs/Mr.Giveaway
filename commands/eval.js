exports.run = async (bot, message, args) => {
    if(message.author.id !== "137624084572798976") {
        
    return message.channel.send("", {
    embed: new Discord.RichEmbed()
        .setColor(0x36393e)
        .setDescription(`Sorry, No Permission (only Bot owners have access to this command!) `)
        .setFooter("Mr.Giveaway")
    }).then(q => q.delete(15000))
};
message.delete().catch();
    const code = args.join(" ");
    try {      
    const say = message.channel.send
      const evaled = eval(code);
    

   
    } catch (err) {
        console.log(err), errorlogger.write(err)
    }
  }; 

  exports.help = {
    name: "eval"
  };