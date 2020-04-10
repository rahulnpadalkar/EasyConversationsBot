module.exports = {
    accessMessages(bot, guildName, channelName, filterTag) {
        if (filterTag.charAt(0) !== "#") {
            filterTag = "#" + filterTag
        }
        return new Promise((resolve, reject) => {
            const guild = bot.guilds.cache.find((guild) => {
                if (guild.name === guildName) {
                    return true
                }
            })
            if (!guild) {
                reject(`❌ EasyConversations bot isn't added to ${guildName}. Add it to the server and then try`)
            }

            const guildChannel = guild.channels.cache.find((channel) => {
                if (channel.name === channelName) {
                    return true
                }
            })

            if (!guildChannel) {
                reject(`❌ Channel ${channelName} doesn't exist for ${guildName} server.`)
            }
            guildChannel.messages.fetch({
                limit: 100
            }).then((messages) => {
                let thread = messages.filter(message => {
                    let regex = new RegExp('\\B' + filterTag + '\\b')
                    return regex.test(message.content)
                });
                resolve(thread)
            })
        })
    },

    getFormattedMessage(username, time, content) {
        return `\`\`\`${username} wrote on ${time} ✏️ \n\n> ${content}\`\`\`\n`
    }
}