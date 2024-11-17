const Discord = require('discord.js')

const prefix = "d!"

module.exports = {
    name: 'avatar',
    description: 'Someone\'\s avatar',
    cooldown: 1000 * 3, //1000ms = 1s

    async run(bot, message, args) {
        if (message.content.startsWith(prefix)) {
            const user = message.mentions.users.first() || message.author;

            var embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setTitle(`${user.username}'s avatar!`)
                .setColor('#00fc76') //Light Green\\
                .setDescription(`Links:\n[png](${user.displayAvatarURL({ format: "png", size: 2048 })}) | [jpg](${user.displayAvatarURL({ format: "jpg", size: 2048 })}) | [gif](${user.displayAvatarURL({ format: "gif", size: 2048, dynamic: true })})`)
                .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
                .setFooter("Dodo Bot")
                .setTimestamp()
            message.channel.send(embed)
        }
    }
}
