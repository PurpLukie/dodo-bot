const Discord = require('discord.js')
const prefix = "d!"

module.exports = {
    name: "cat",
    description: "cats",

    async run (run, message, args) {
        if (message.content.startsWith(prefix))
        {
            const user = message.author;
        
            const embed = new Discord.MessageEmbed()
                .setTitle('cars')
                .setColor('#34e8eb') //Cyan\
                .setImage('https://i.imgur.com/ZGvJb5J.jpeg')
                .setTimestamp()
                .setFooter("Dodo Bot");
            message.channel.send(embed)
        };
    }
}