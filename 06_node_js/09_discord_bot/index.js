import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config'

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('messageCreate', message => {
    if (message.author.bot) return
    if (message.content.startsWith('create')) {
        const url = message.content.split('create')[1]
        return message.reply({
            content : "Generating ID for: " + url
        })
    }
    console.log(message.content);
    message.reply('Hii, This is a bot')
})

client.on('interactionCreate', interaction => {
    // console.log(interaction);
    interaction.reply('pong!')
})

client.login(process.env.ACCESS_TOKEN)