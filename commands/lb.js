const Discord = require("discord.js");
const db = require("quick.db");
const prefix = "d!";
const Enmap = require("enmap");
const canvacord = require("canvacord");

module.exports = {
    name: 'lb',
    description: 'Rank leaderboard',

    async run(bot, message, args) {
        if (message.content.startsWith(prefix)) {
            message.delete();

            var user = message.mentions.users.first() || message.author;
            let level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0

            const difarr =[];
            bot.users.cache.forEach(user => {
                difarr.push(user)
            })

            message.channel.send(difarr)
        }
    }
}
