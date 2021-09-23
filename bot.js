const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json')
const play = require("./play");
let express = require('express');
global.app = express();
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');


client.login(config.token);
var video;

client.on("ready", async () => {

  console.log('ta piscando, ta gravando !');
})

client.on("message", async (message) => {

  const voiceChannel = message.member.voice.channel;

  if (message.author.bot ||
    message.channel.type == "dm")
    return

    console.log(message.content);
    let obj = JSON.parse(message.content);
    // console.log('teste');
    // let obj2 = JSON.parse('{"firstname":"John","Data":"13/07/200"}')
    console.log(obj);
    // console.log(obj2);
  if (message.content.startsWith(config.prefix)) {
    if (message.content == 'zoe')
    message.channel.send('> Olá miguxo')
    if (message.content == `${config.prefix} tudo bem?`)
      message.channel.send('> Estou ótima! 🧏‍♀️ e você ? 🤸‍♀️')

    if (message.content.startsWith(`${config.prefix}`) && message.content.includes('play')) {
      const { voice } = message.member
      let args = message.content.split('zoe play ')[1]
      let command = message.content.substring(`$(config.prefix.length) play`).split(" ")[1]

      if (!voiceChannel) return message.channel.send('> You need to be in a voice channel to execute this command!');
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions')
      if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions')
      if (!args.length) return message.channel.send('You need to send the second argument')

      client.channels.fetch(voice.channelID).then(channel => {
        if (!channel) return console.error("The channel does not exist!");
        let connection = channel.join().then(async (connection) => {
          // Yay, it worked!
          console.log("Successfully connected.");
          message.channel.send(`> Estou procurando sua musica **"${args}"**, só um momento Gatx! 🎶`);

          const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
          }

          const video = await videoFinder(args);

          if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly', type: 'opus', dlChunkSize: 2000000, highWaterMark: 1<<25 })
            connection.play(stream, { seek: 0, volume: 1 })
              .on('finish', () => {
                voiceChannel.leave();
              });

            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
          } else {
            message.channel.send('> Sorry, não encontrei nenhuma música com esse nome 😢 !');
          }

        }).catch(e => {
          // Oh no, it errored! Let's log it to console :slight_smile:
          console.error(e);
        });
      })
    }

    const { voice } = message.member

    if (message.content === (`${config.prefix} lança a braba`)){
      await message.reply(`😊Estou procurando a braba pra você!`)
      if (!voiceChannel) return message.channel.send('> You need to be in a voice channel to execute this command!');
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions')
      if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions')

      client.channels.fetch(voice.channelID).then(channel => {
        if (!channel) return console.error("The channel does not exist!");
        let connection = channel.join().then(async (connection) => {
          // Yay, it worked!
          console.log("Successfully connected.");
          playVideo();

           async function playVideo(){
          const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
          }
                                                                                                            
          video = await videoFinder('lofi-radio');

          if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' , type: 'opus', dlChunkSize: 2000000, highWaterMark: 1<<25})
            connection.play(stream, { seek: 0, volume: 1 })
              .on('finish', async() => {
                playVideo();
              });

            await message.reply(`😘 Lançando a braba versão ***${video.title}***`)
          } else {
            message.channel.send('> Sorry, não encontrei nenhuma música com esse nome 😢 !');
          }
        }
        }).catch(e => {
          // Oh no, it errored! Let's log it to console :slight_smile:
          console.error(e);
        });
      })
    }

    if(message.content === 'zoe ?'){
      if(video && video.title)
      await message.reply(`😘 Estou tocando ***${video.title}***`)
      else
      await message.reply(`🤸‍♀️ Não estou tocando nada`)
    }

    if(message.content === 'zoe vaza'){
      message.channel.send('> Bye Bye Lindx! 💋😘');
      voiceChannel.leave();
    }
  }
})


      // if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!");
      // message.member.voice.channel.join();
