const Discord = require('discord.js');

const newMessage = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Server Status: Offline')
      .setDescription(`
      Server is currently offline.`)
      .setThumbnail('https://picsum.photos/200/300')

module.exports = newMessage