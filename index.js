const discord = require('discord.js')
const messages = require("./services/messages")
require('dotenv').config()
const bot = new discord.Client()
bot.on("ready", () => {
    console.log("Connected!")
})

bot.on("message", (msg) => {
    if (msg.channel instanceof discord.DMChannel && !msg.author.bot) {
        brokencmd = msg.content.split(" ")
        if (brokencmd[0] === "/fetch") {
            messages.accessMessages(bot, brokencmd[1], brokencmd[2], brokencmd[3]).then((msgs) => {
                msgs = msgs.array()
                msgs = msgs.reverse()
                if (msgs.length < 1) {
                    msg.reply(`No messages found with **#${brokencmd[3]}**`)
                    return;
                }
                msgs.forEach(filteredmsg => {
                    let markdownreply = messages.getFormattedMessage(filteredmsg.author.username, filteredmsg.createdAt, filteredmsg.content)
                    msg.reply(markdownreply)
                });
            }).catch((e) => {
                msg.reply(e)
            })
        } else if (brokencmd[0] === "/help") {
            msg.reply("```\n Supported command \n\n /fetch {severname} {channelname} {search-hashtag}\n\nNote: Avoid adding hashtag to the search term, as it is already added by the command internally.```")
        } else {
            msg.reply("Command not supported.")
            return;
        }
    }
})
bot.login(process.env.token)
