require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client();
const ping = require('minecraft-server-util')
const key = process.env.DISCORD_KEY
const channelID = '822319558152290315'
const messages = require('./helperFunc/failed.js')
const Moment = require('moment');
const newMessage = require('./helperFunc/failed.js');
const Axios = require('axios')
bot.login(key)


bot.on('ready', () => {
 const guild = bot.guilds.cache.get('815014104636588032')
 const channel = guild.channels.cache.get(channelID)
 const statusID = '822320799004360714'
 const status = guild.channels.cache.get(statusID)

 bot.channels.cache.get('822599613243719735').messages.fetch('822607887683289109');

 ping.status('172.93.111.73', {port: 25565}).then(data => {
     bot.user.setActivity(`Cozy Camp: ${data.onlinePlayers}`, {type: 'PLAYING'}).catch(err => err)
     channel.setName(`╠ Camper(s) Online: ${data.onlinePlayers}`)
     status.setName(`╠ Server Status: Online`)
    }).catch(err => {
      console.log(err)
      status.setName(`╠ Server Status: Offline`)
    })

})


bot.on('messageReactionAdd', (reaction, user) => {
   currentUser = reaction.message

   if (reaction.emoji.name == '🐺') {
    currentUser.guild.members.fetch(user.id).then(member => {
      const newMessage = new Discord.MessageEmbed()
        .setColor('#aa0e0e')
        .setTitle('New Member')
        .setDescription(`
        Welcome <@${user.id}>, our newest Camper joining Troop Wolf`)
        .setThumbnail(user.avatarURL())

      member.roles.add('822299485773365270').catch(err => console.log(err))
      bot.channels.cache.get('822615124245348382').send(newMessage)
    })
  } else if (reaction.emoji.name == '🦑') {
    currentUser.guild.members.fetch(user.id).then(member => {
      const newMessage = new Discord.MessageEmbed()
        .setColor('#45596a')
        .setTitle('New Member')
        .setDescription(`
        Welcome <@${user.id}>, our newest Camper joining Troop Squid`)
        .setThumbnail(user.avatarURL())
      member.roles.add('822299957511716954').catch(err => console.log(err))
      bot.channels.cache.get('822615124245348382').send(newMessage)

    })
  } else if (reaction.emoji.name == '🐯') {
    currentUser.guild.members.fetch(user.id).then(member => {
      const newMessage = new Discord.MessageEmbed()
        .setColor('#175024')
        .setTitle('New Member')
        .setDescription(`
        Welcome <@${user.id}>, our newest Camper joining Troop Ocelot`)
        .setThumbnail(user.avatarURL())
        member.roles.add('822299789605339216').catch(err => console.log(err))
        bot.channels.cache.get('822615124245348382').send(newMessage)

      })
  } else if (reaction.emoji.name == '🐔') {
    currentUser.guild.members.fetch(user.id).then(member => {
      const newMessage = new Discord.MessageEmbed()
        .setColor('#b3893e')
        .setTitle('New Member')
        .setDescription(`
        Welcome <@${user.id}>, our newest Camper joining Troop Chicken`)
        .setThumbnail(user.avatarURL())
      member.roles.add('822300379860435005').catch(err => console.log(err))
      bot.channels.cache.get('822615124245348382').send(newMessage)

    })
  }
})

bot.on('message', message => {
  if (message.content === '!status') {
    ping.status('172.93.111.73', {port: 25565}).then(data => {
        const newMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Server Status')
        .setDescription(`
        Server Status: Online \n
        Host: ${data.host} \n 
        Players currently online: ${data.onlinePlayers} \n 
        Max Players: ${data.maxPlayers} \n 
        Version: ${data.version}`)
        .setThumbnail('https://picsum.photos/200/300')
        message.channel.send(newMessage)        
    }).catch(err => {
      console.log(err)
      message.channel.send(messages)        

    })
    
  }


  if (message.content === '!online') {
   Axios('https://mcapi.us/server/status?ip=172.93.111.73').then(users => {
   let userData = ''  
   users.data.players.sample.forEach(item => {
     userData += item.name + ' '
   })

   if (users.data.players.sample.length === 0) {
   
    const FailedMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Online users')
    .setDescription(`Users Online: None currently online`)
    message.channel.send(FailedMessage)
    return;
   } 


   const newMessage = new Discord.MessageEmbed()
   .setColor('#0099ff')
   .setTitle('Online users')
   .setDescription(`Users Online: ${userData}`)
   message.channel.send(newMessage)
   })

  }
 

  if (message.content.startsWith('!wa')) {
    let user = message.content.split(' ')
    if (message.content.length >= 2) {
      bot.channels.cache.get('822370931569459222').send(`<@${message.author.id}> has accepted your whitelist request ${user[1]}`)
    }
  }

   if (message.content.startsWith('!role')) {
      let newRole = message.content.split(' ')
      const roleMessage = new Discord.MessageEmbed()
      .setColor('#E74C3C')
      .setTitle('Role request change.')
      .setDescription(`Discord ID: <@${message.author.id}> \n 
      New Role: ${newRole[1]} \n
      Date: ${Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')} \n
     `)
     .setThumbnail(message.author.avatarURL());
     message.channel.send(`Role request change for ${newRole[1]} has been sent, please standby for approval <@${message.author.id}>.`)
     bot.channels.cache.get('822359887673163816').send(roleMessage)
   }
   

   
   if (message.content.includes('!whitelist')) {
    let messageSplit = message.content.split(' ');
    if (message.content.startsWith('!whitelist')) {
    if (messageSplit.length === 1) {
      message.channel.send('Syntax is !whitelist {username}.')
    } else if (messageSplit.length > 2) {
      message.channel.send('Syntax is !whitelist {username}.')
    } else {
      const request = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Whitelist request')
      .setDescription(`Discord ID: <@${message.author.id}> \n 
      Minecraft ID: ${messageSplit[1]} \n
      Console: !whitelist add ${messageSplit[1]} \n
      Date: ${Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')} \n
     `)
     .setThumbnail(message.author.avatarURL());
      message.channel.send(`Whitelist request for ${messageSplit[1]} has been sent, please standby for approval <@${message.author.id}>.`)
      bot.channels.cache.get('822359887673163816').send(request)

    }
  }

  }

})

setInterval(  () => {
    const guild = bot.guilds.cache.get('815014104636588032')
    const channel = guild.channels.cache.get(channelID)
    const statusID = '822320799004360714'
    const status = guild.channels.cache.get(statusID)
    ping.status('172.93.111.73', {port: 25565}).then((data) => {
        bot.user.setActivity(`Cozy Camp: ${data.onlinePlayers}`, {type: 'PLAYING'}).catch(err => err)
        channel.setName(`╠ Camper(s) Online: ${data.onlinePlayers}`).catch(err => console.log(err))
        status.setName(`╠ Server Status: Online`).catch(err => console.log(err))
    }).catch(err => {
         console.log(err)
         channel.setName(`╠ Camper(s) Online: 0`)
         status.setName(`╠ Server Status: Offline`)
    })
},400000)


