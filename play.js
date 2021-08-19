const ytdl = require ('ytdl-core');
const ySearch = require ('yt-search');

const queue = new Map();

module.exports = {
  name: 'play',
  aliases: ['skip', 'stop'],
  cooldown: 0,
  description: 'zoe music bot',
  async execute(message, args, cmd, client, Discord){
    const voice_channel = message.members.voice.channel;
    const permissions = voice_channel.permissionsFor(message.client.user);
    const server_queue = queue.get(message.guild.id)

    const connection = await voiceChannel.join();

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder()

  }
}