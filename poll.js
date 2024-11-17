const { MessageEmbed } = require("discord.js");

const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "d!"

module.exports = {
  name: 'poll',
  description: 'Makes a poll',
  cooldown: 1000 * 5, //1000ms = 1s

  async run(bot, message, args) {
    if (message.content.startsWith(prefix)) {
      if (message.deletable) {
        message.delete();
      }

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('you are not cool enough to use this command, dodo!').then(m => m.delete({ timeout: 5000 }));

      if (!args.length) {
        return message.channel.send("Please dodo type your poll after the command!").then(m => m.delete({ timeout: 5000 }));
      }

      let channel = message.guild.channels.cache.find((x) => (x.name === "polls", "suggestions"))

      if (!channel) {
        return message.channel.send("Dodo-error! Could not find the polls channel!").then(m => m.delete({ timeout: 5000 }));
      }

      let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor('#9ef2ff')
        .addField('Poll', [
          args.join(" "),
        ])
        .setFooter("Dodo Bot")
        .setTimestamp()

      channel.send(embed).then(m => {
        m.react("✔️")
        m.react("➖")
        m.react("✖️")
      })

      message.channel.send("Successfully dodo-sent your poll!").then(m => m.delete({ timeout: 5000 }));
    }
  }

}