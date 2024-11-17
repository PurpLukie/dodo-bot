const Discord = require('discord.js');
const Canvacord = require('canvacord');
const db = require('quick.db');
const prefix = "d!"

module.exports = {
    name: 'addxp',
    description: 'Adds xp',

    async run(bot, message, args) {
        if (message.content.startsWith(prefix)) {
            message.delete();

            if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('you are not cool enough to use this command, dodo!').then(m => m.delete({ timeout: 5000 }));

            var user = message.mentions.users.first() || message.author || args[0];
            var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
            var xpNeeded = level * 275 + 275

            var xp = db.get(`guild_${message.guild.id}_xp_${user.id}`)

            const randomNumber = args[1];

            db.add(`guild_${message.guild.id}_xp_${user.id}`, randomNumber)
            db.add(`guild_${message.guild.id}_xptotal_${user.id}`, randomNumber)

            var xpNeeded = level * 100;

            if (xpNeeded < xp) {
                var newLevel = db.add(`guild_${message.guild.id}_level_${user.id}`, 1)
                db.subtract(`guild_${message.guild.id}_xp_${user.id}`, xpNeeded)

                const embed = new Discord.MessageEmbed()
                .setTitle([`${user.tag} has leveled up to ${newLevel}`,
                    `✅`,
                ])
                .setColor('#002afc')
                message.channel.send(embed).then(m => m.delete({ timeout: 5000 }));
            }

            var embed1 = new Discord.MessageEmbed()
                .setTitle([`Added **${randomNumber} EXP** to **${user.tag}**!`,
                    `✅`,
                ])
                .setColor('#002afc')
            message.channel.send(embed1).then(m => m.delete({ timeout: 5000 }));
        }
    }
}
