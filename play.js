const ytdl = require ('ytdl-core');
const ySearch = require ('yt-search');

const queue = new Map();

module.exports = {
  name: 'play',
  description: 'zoe music bot',
  async execute(message, args){
    const voice_channel = message.members.voice.channel;
    const server_queue = queue.get(message.guild.id)
    return (args);

    console.log(args);
    const connection = await voiceChannel.join();

    if(!voiceChannel) return message.channel.send('You need to be in a voice channel to execute this command!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions')
    if(!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions')
    if(!args.length) return message.channel.send('You need to send the second argument')

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if(video){
      const stream = ytdl(video.url, {filter: 'audioonly'})
      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () =>{
        voiceChannel.leave();
      });

      await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
    }else{
      message.channel.send('No video results found');
    }
  }
}