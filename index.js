global.Discord = require("discord.js");
global.bot = new Discord.Client({disableeveryone: true});
global.fs = require("fs");
global.serversettings = require("./json/serversettings.json");
global.botconfig = require("./json/botconfig.json");
global.ms = require("ms");

var now = new Date();
global.logger = fs.createWriteStream('logs/log-'+ now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() + '.txt', {
   flags: 'a' // 'a' means appending (old data will be preserved)
 })
 global.errorlogger = fs.createWriteStream('logs/error-log-'+ now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() + '.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
//events
fs.readdir("./events/", (err, files) => {
    if(err) return console.log(err), errorlogger.write(err);
     files.forEach(file => {
         require(`./events/${file}`);
         logger.write(`[EVENT]${file} Loaded!\n`)
         console.log(`[EVENT]${file} Loaded!`)
     });
 })
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) bot.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        logger.write("Couldn't find commands.\n")
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)];
        let props = require(`./commands/${f}`);
        logger.write(`[CMDS]${f} loaded!\n`)
        console.log(`[CMDS]${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});
 // commands
 bot.on("message", async message => {
  let msg = message.content.toLowerCase();
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.content.startsWith("<@" + bot.user.id +">") || message.content.startsWith("<@!" + bot.user.id +">")) {
    message.reply("Guild prefix is `" + serversettings[message.guild.id].prefix + "`. View the help command with: `" + serversettings[message.guild.id].prefix + "help`")
  }
  let unneeded = msg.split(" ");
  let messageArray = message.content.split(" ");
  let cmd = unneeded[0];
  let args = messageArray.slice(1);
  let prefix = serversettings[message.guild.id].prefix;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (!msg.startsWith(prefix)) return;
  if(commandfile) commandfile.run(bot,message,args);
  const commandargs = message.content.split(' ').slice(1).join(' ');
  const command = message.content.split(' ').slice(0).join(' ');
  logger.write(`[${message.guild.name}] [${message.author.username} (${message.author.id})] >> ${command} ${commandargs}\n`)
  console.log(`[${message.guild.name}] [${message.author.username} (${message.author.id})] >> ${command} ${commandargs}`)
});
bot.login(botconfig.token);