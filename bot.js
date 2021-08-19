const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json')
const yts = require("yt-search");
const play = require("./play");

client.login(config.token);

client.on("ready", async () => {
  args
  let status = play();

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
    if (message.content == `${config.prefix} toca`) {
      const { voice } = message.member
      let args = message.content.substring(PREFIX.length).split("zoe toca ")
      
      // console.log(voice.channelId);

      if(!voice.channelID){
        message.reply('You must be in a voice channel !')
        return
      }

      client.channels.fetch(voice.channelID).then(channel => {
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            // Yay, it worked!
            console.log("Successfully connected.");
        }).catch(e => {
            // Oh no, it errored! Let's log it to console :slight_smile:
            console.error(e);
        });
    })



      // const { voice } = message.member
      // console.log(message.member.voice.channelId)

      // if(!voice.channelId){
      //   message.reply('You must be in a voice channel !')
      //   return
      // }

      // else{

      // }

    }
    if(message.content == `${config.prefix} toca`){
      channel.leave();
    }
  }

});

      // if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!");
      // message.member.voice.channel.join();
