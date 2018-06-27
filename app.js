const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! and in only ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }

    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }

    if (command === "clear") {
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.reply("How many shall I devour?");
        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
        message.channel.send("Be grateful, for Shade has cleaned up your mess.")

            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

    }
});

client.login(config.token);
