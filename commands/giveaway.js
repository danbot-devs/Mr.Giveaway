let giveaways = JSON.parse(fs.readFileSync("./json/giveaways.json", "utf8"));
module.exports.run = async (bot, message, args) => {
      if(message.author.id !== "137624084572798976") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, but you can't do that!");
      }
    const filter2 = m => m.author.id === message.author.id;
    //giving away:
    message.channel.send("", {
        embed: new Discord.RichEmbed()
            .setColor(0x36393e)
            .setDescription("Please chose a what your giving away... Will expire in 20 seconds...")
            .setFooter("You can type 'cancel' to cancel the request")
    }).then((message2) => {
        //await messages 1  -- giving away ?
        message2.channel.awaitMessages(filter2, {
            max: 1,
            time: 20000,
            errors: ['time'],
        }).then((collected1) => {
            if (collected1.first().content === 'cancel') {
                message.channel.bulkDelete(3)
                return message.reply("Canceled.").then(q => q.delete(5000))
    }
            message2.channel.send("", {
                embed: new Discord.RichEmbed()
                    .setColor(0x36393e)
                    .setDescription(`Your Givingaway : **${collected1.first().content}**\n When should the Giveaway expire?. Will expire in 20 seconds...`)
                    .setFooter("You can type 'cancel' to cancel the request")
            }).then((message3) => {
                //await messages 2 -- time?
                message3.channel.awaitMessages(filter2, {
                    max: 1,
                    time: 20000,
                    errors: ['time'],
                }).then((collected2) => {
                    let giveawaytime = ms(collected2.first().content);
                    if (collected2.first().content === 'cancel') {
                        message.channel.bulkDelete(5)
                        return message.reply("Canceled.").then(q => q.delete(5000))
                    }
                    if(message.author.id !== "293841631583535106") {
                        if(giveawaytime > 259200000){
                          message.channel.bulkDelete(5)
                         return message.reply("`3 Days` is the max \n Canceled.").then(q => q.delete(5000))
                       }
                       if(giveawaytime < 60000) {
                        message.channel.bulkDelete(5)
                        return message.reply("`1 minute` is the min ! \n Canceled.").then(q => q.delete(5000))
    
                       }
                    }
                    if (!giveawaytime) {
                        message.channel.bulkDelete(5)
                        return message.reply("You didn't specify a time!\n Canceled.").then(q => q.delete(5000))
                    }
                    message3.channel.send("", {
                        embed: new Discord.RichEmbed()
                            .setColor(0x36393e)
                            .setDescription(`Your Givingaway : **${collected1.first().content}**\nYour Giveaway will end in: **${collected2.first().content}**\n Now how many winners do you want?(Max is 5)`)
                            .setFooter("You can type 'cancel' to cancel the request")
                    }).then((message4) => {
                        //await messsages 3 -- channel
                        message4.channel.awaitMessages(filter2, {
                            max: 1,
                            time: 20000,
                            errors: ['time'],
                        }).then((collected3) => {
                            let users = collected3.first().content;
                            if (collected3.first().content === 'cancel') {
                                message.channel.bulkDelete(7)
                                return message.reply("Canceled.").then(q => q.delete(5000))
                                    }
                            if (users > 5) {
                              message.channel.bulkDelete(7)
                              return message.reply("Sorry But the max ammout of winners is (5).\n Canceled!").then(q => q.delete(5000))
                            }
                            if (!users) {
                                message.channel.bulkDelete(7);
                                return message.reply("You didn't specify how many winner(s) you want!\n Canceled!").then(q => q.delete(5000))
                            }
                            message3.channel.send("", {
                                embed: new Discord.RichEmbed()
                                    .setColor(0x36393e)
                                    .setDescription(`Your giving away: **${collected1.first().content}**\n Will expire in : **${collected2.first().content}** \n There Will be : **${collected3.first().content} Winner(s)** \n Starting the giveaway right now !`)
                                    .setFooter("You can type 'cancel' to cancel the request")
                            }).then(q => q.delete(5000))
                            message.channel.bulkDelete(7)
                            console.log(`User ${message.author.username} Started a Giveaway in ${message.guild.name}`)
                            
                            
                            giveaways.RG ++;
                            giveaways.LG ++;
                            
                              fs.writeFile("./json/giveaways.json", JSON.stringify(giveaways), (err) => {
                                  if (err) console.log(err), errorlogger.write(err)
                            });
                            
                            
                            let giveawayembe = new Discord.RichEmbed()
                                .setTitle(`**${collected1.first().content}**`)
                                .setDescription(`To Enter The Giveaway You Must React To This Message With :hand_splayed: (**${collected3.first().content} Winner(s)**). \n GiveAway Ends In:**${collected2.first().content}**`)
                                .setTimestamp();
                            message.channel.send(":confetti_ball: __**GIVE AWAY**__ :confetti_ball:", giveawayembe).then(x => {
                                x.react('🖐')

                                const filter = (reaction, user) => reaction.emoji.name === '🖐' && user.id !== `${bot.user.id}`
                                x.awaitReactions(filter, {
                                        time: giveawaytime
                                    })
                                    .then(collected => {
                                          var winners = [];
                                          var winners2 = [];
                                        const users = x.reactions.get("🖐").users;
                                        const list2 = users.array().filter(u => u.id !== bot.user.id);
                                        var winnersIndexes = [];
                                        for (let i = 0; i < collected3.first().content; i++) {
                                            var winnerIndex = Math.floor(Math.random() * list2.length);
                                            while (winnersIndexes.includes(winnerIndex)) {
                                                winnerIndex = Math.floor(Math.random() * list2.length);
                                            }
                                            winnersIndexes.push(winnerIndex);
                                            let winner = list2[winnerIndex];
                                            winners2.push(winner);
                                            winners.push(":tada:" + winner);
                                            if(list2.length < collected3.first().content) {
                                                giveaways.RG --;
                                    fs.writeFile("./json/giveaways.json", JSON.stringify(giveaways), (err) => {
                                        if (err) console.log(err), errorlogger.write(err)
                                    });
                                          console.log(`Giveaway by ${message.author.username} has ended`)
                                            return x.edit(":confetti_ball: __**GIVE AWAY**__ :confetti_ball:", {
                                                embed: new Discord.RichEmbed()
                                                  .setDescription("Couldn't Find Enough Reactions To Choose A Winner!")
                                                  .setTimestamp()
                                              })
                                            }
                                        }

                                          x.edit(`:confetti_ball: __**GIVE AWAY**__ :confetti_ball:`, {
                                              embed: new Discord.RichEmbed()
                                               .setTitle(`Winner(s) Of The Giveaway: "__**${collected1.first().content}**__"`)
                                               .setDescription(`${winners.join("\n")}`)
                                          });
                                          message.channel.send(`:confetti_ball: | Congradulation ${winners.join(", ")} On Winning the "__**${collected1.first().content}**__" Giveaway | :confetti_ball:`)
                                          console.log(`Giveaway by ${message.author.username} has ended`)
                                          giveaways.RG --;
                                    fs.writeFile("./json/giveaways.json", JSON.stringify(giveaways), (err) => {
                                        if (err) console.log(err), errorlogger.write(err)
                                    });

                                    }).catch(console.error);
                            });
                        }).catch((err) => {
                            message.channel.bulkDelete(8)
                            return message.reply("Canceled!").then(x => x.delete(5000))
                        });
                    });
                }).catch((err) => {
                    message.channel.bulkDelete(4)
                    return message.reply("Canceled!").then(x => x.delete(5000))
                });
            });
        }).catch((err) => {
            message.channel.bulkDelete(2)
            return message.reply("Canceled!").then(x => x.delete(5000))
        });
    });
  }
  module.exports.help = {
      name: "giveaway",
      alias: "gw"
  }