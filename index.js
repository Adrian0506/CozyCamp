require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client();
const ping = require('minecraft-server-util')
const key = process.env.DISCORD_KEY
const channelID = '822319558152290315'



bot.login(key)


bot.on('ready', () => {
 const guild = bot.guilds.cache.get('815014104636588032')
 const channel = guild.channels.cache.get(channelID)
 const statusID = '822320799004360714'
 const status = guild.channels.cache.get(statusID)
 ping.status('172.93.111.73', {port: 25565}).then(data => {
     bot.user.setActivity(`Cozy Camp: ${data.onlinePlayers}`, {type: 'PLAYING'}).catch(err => err)
     channel.setName(`╠ Camper(s) Online: ${data.onlinePlayers}`)
     status.setName(`╠ Server Status: Online`)
    }).catch(err => {
      console.log(err)
      status.setName(`╠ Server Status: Offline`)
    })

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
      const newMessage = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Server Status: Offline')
      .setDescription(`
      Server is currently offline.`)
      .setThumbnail('https://picsum.photos/200/300')
      message.channel.send(newMessage)        

    })
    
  }

  if (message.content.includes('!whitelist')) {
    let messageSplit = message.content.split(' ');
    console.log(messageSplit.length)
    if (message.content.startsWith('!whitelist')) {
    if (messageSplit.length === 1) {
      message.channel.send('Syntax is !whitelist {username}.')
    } else if (messageSplit.length > 2) {
      message.channel.send('Syntax is !whitelist {username}.')
    } else {
      message.channel.send(`Added ${messageSplit[1]} to whitelist`)
      bot.users.cache.get('128612294035767296').send(`whitelist add ${messageSplit[1]}`)

    }
  }

  }

})

setInterval( () => {
    const guild = bot.guilds.cache.get('815014104636588032')
    const channel = guild.channels.cache.get(channelID)
    const statusID = '822320799004360714'
    const status = guild.channels.cache.get(statusID)
    ping.status('172.93.111.73', {port: 25565}).then(data => {
        bot.user.setActivity(`Cozy Camp: ${data.onlinePlayers}`, {type: 'PLAYING'}).catch(err => err)
        channel.setName(`╠ Camper(s) Online: ${data.onlinePlayers}`)
        status.setName(`Server status: Online`).then( () => {
          console.log('Set title')
        }).catch(err => console.log(err))
    }).catch(err => {
         console.log(err)
         status.setName(`╠ Server Status: Offline`)
    })
},10000)


