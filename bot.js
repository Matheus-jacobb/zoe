const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json')
const play = require("./play");
let express = require('express');
global.app = express();
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

client.login(config.token);

client.on("ready", async () => {

  console.log('ta piscando, ta gravando !');
})

client.on("message", async (message) => {

  const voiceChannel = message.member.voice.channel;

  if (message.author.bot ||
    message.channel.type == "dm")
    return

  if (message.content.startsWith(config.prefix)) {
    if (message.content == 'zoe')
      message.channel.send('> Olá miguxo')
    if (message.content == `${config.prefix} tudo bem?`)
      message.channel.send('> Estou ótima! 🧏‍♀️ e você ? 🤸‍♀️')


    const { voice } = message.member
    let args = message.content.substring(config.prefix.length).split(' ')
    let command = message.content.substring(`$(config.prefix.length) play`).split(" ")[1]

    client.channels.fetch(voice.channelID).then(channel => {
      if (!channel) return console.error("The channel does not exist!");
      let connection = channel.join().then(async(connection) => {
        // Yay, it worked!
        console.log("Successfully connected.");

    // console.log(voice.channelId);

    // if(!voice.channelID){
    //   message.reply('You must be in a voice channel !')
    //   return
    // }
    // console.log(message);
    // args = message.content.slice(config.prefix.length).split(/ +/);


    // if (command === 'play')
    // client.commands.get('play').execute(message,args[2])

    // function play music
    // const voice_channel = message.members.voice.channel;
    // const server_queue = queue.get(message.guild.id)

    // const connection = await voiceChannel.join();

    if (!voiceChannel) return message.channel.send('You need to be in a voice channel to execute this command!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions')
    if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions')
    if (!args.length) return message.channel.send('You need to send the second argument')

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if (video) {
      const stream = ytdl(video.url, { filter: 'audioonly' })
      connection.play(stream, { seek: 0, volume: 1 })
        .on('finish', () => {
          voiceChannel.leave();
        });

      await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
    } else {
      message.channel.send('No video results found');
    }

  }).catch(e => {
    // Oh no, it errored! Let's log it to console :slight_smile:
    console.error(e);
  });
})

    //



    //   client.channels.fetch(voice.channelID).then(channel => {
    //     if (!channel) return console.error("The channel does not exist!");
    //     channel.join().then(connection => {
    //         // Yay, it worked!
    //         console.log("Successfully connected.");
    //     }).catch(e => {
    //         // Oh no, it errored! Let's log it to console :slight_smile:
    //         console.error(e);
    //     });
    // })



    // const { voice } = message.member
    // console.log(message.member.voice.channelId)

    // if(!voice.channelId){
    //   message.reply('You must be in a voice channel !')
    //   return
    // }

    // else{

    // }

    if (message.content == `${config.prefix} toca`) {
      channel.leave();
    }
  }

});

      // if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!");
      // message.member.voice.channel.join();
