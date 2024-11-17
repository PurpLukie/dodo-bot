const Discord = require('discord.js')
const axios = require('axios');

const prefix = "d!"

module.exports = {
    name: 'dodo',
    description: 'Dodo',

    async run(bot, message, args) {
        if (message.content.startsWith(prefix)) {

            const url = 'https://results.dogpile.com/serp?qc=images&q=sun+conure';

            let data, response;

            try {
                response = await axios.get(url);
                data = response.data;
            } catch (e) {
                return message.channel.send('An error occured, please try again!')
            }    
            
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setTitle('Dodo Bird')
                    .setColor('#34e8eb') //Cyan\\
                    .setImage(data.link)
                    .setTimestamp()
                    .setFooter("Dodo Bot");
                message.channel.send(embed)
        }
    }
}