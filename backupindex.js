const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const token = config.token
const prefix = config.prefix
const fs = require("fs");

bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        bot.commands.set(commandName, props);
    })
});

----------------(For advanced index)
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file = file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}

bot.on('ready', (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    let command = content[0];

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();
        const command = bot.commands.get(commandName);
        if (!command) return;
    }

    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
});