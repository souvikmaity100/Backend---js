import { REST, Routes } from 'discord.js';
import 'dotenv/config'

const commands = [
    {
        name: 'create',
        description: 'create a short URL',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.ACCESS_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})()