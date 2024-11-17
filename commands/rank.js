const Discord = require('discord.js');
const Canvacord = require('canvacord');
const db = require('quick.db');
const prefix = "d!"

module.exports = {
    name: 'rank',
    description: 'Checks rank of user',

    async run(bot, message, args) {
        xp(message)
        if (message.content.startsWith(`${prefix}rank`)) {
            if (message.author.bot) return;
            var user = message.mentions.users.first() || message.author || args[0];

            var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
            var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
            var xpNeeded = level * 275 + 275
            const rankcard = new Canvacord.Rank()
                .setAvatar(user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
                .setRequiredXP(xpNeeded)
                .setStatus(user.presence.status)
                .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
                .setRank(1, 'RANK', false)
                .setProgressBar("#FF0000", "COLOR")
                .setOverlay("#000000")
                .setUsername(user.username)
                .setDiscriminator(user.discriminator)
                .setBackground("COLOR", "#808080")
            rankcard.build()
                .then(data => {
                    const atta = new Discord.MessageAttachment(data, "rank.png")
                    message.channel.send(atta)
                })
        }

        function xp(message) {
            setTimeout(function () {
                if (message.author.bot) return

                const randomNumber = 17;

                db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
                db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
            }, 10000);
            var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1

            var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
            var xpNeeded = level * 100;
            var user = message.mentions.users.first() || message.author || args[0];

            if (xpNeeded < xp) {
                var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
                db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)

                const embed = new Discord.MessageEmbed()
                .setTitle([`${user.tag} has leveled up to ${newLevel}`,
                    `✅`,
                ])
                .setColor('#002afc')
                message.channel.send(embed).then(m => m.delete({ timeout: 5000 }));
            }
        }
    }
}
