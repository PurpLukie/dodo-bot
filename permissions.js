const Discord = require('discord.js')
const prefix = "d!"
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'permissions',
    description: 'Commands the bot has for staff',
    cooldown: 1000 * 5, //1000ms = 1s

    async run(bot, message, args) {
        if (message.content.startsWith(prefix)) {
            if (message.deletable) {
                message.delete();
            }

            var embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`${message.author.username} check your dms, dodo!`)
                .setColor('#191057') //Dark Blue\\
                .setFooter(`Dodo Bot - ID: ${message.author.id}`)
                .setTimestamp()
            message.channel.send(embed).then(m => m.delete({ timeout: 5000 }));

            const DMembed = new Discord.MessageEmbed()
                .setColor('#191057') //Dark Blue\\
                .setAuthor("Dodo Bot", bot.user.displayAvatarURL)
                .setTitle('Dodo Bot\'s Permissions')
                .addField('Moderation', [
                    "**ban -** ban members.",
                    "**kick -** kick members.",
                    "**mute -** ban members.",
                    "**tempmute -** kick members.",
                    "**addrole -** kick members.",
                    "**removerole -** kick members.",
                    "**unban -** ban members.",
                    "**unmute -** kick members.",
                    "**purge -** kick members.",
                    "**warn -** ban members.",
                    "**warnings -** kick members.",
                    "**removewarn -** kick members.",
                    `\u200b`
                ])
                .addField('Info', [
                    "**help -** none.",
                    "**ping -** none.",
                    "**uptime -** none.",
                    "**botinfo -** none.",
                    "**roleinfo -** none.",
                    "**serverinfo -** none.",
                    `\u200b`
                ])
                .addField('Utility', [
                    "**avatar -** none.",
                    "**dodo -** none.",
                    "**rank -** none.",
                    "**poll -** kick members, channel **suggestions** / **polls**.",
                    "**lb -** none.",
                    `\u200b`
                ])
                .setFooter(`Dodo Bot`)
                .setTimestamp()

            try {
                await message.author.send(DMembed)
                    .catch(() => message.channel.send(`<@${message.author.id}> your DMs are closed!`));
            } catch (err) {
                console.warn(err);
            };
        }
    }
}