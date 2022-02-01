const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const express = require("express");

const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

  const cdseconds = 5;

  bot.on("messageReactionAdd", (reaction, user) => {
      if(user.bot) return;
      const message = reaction.message;
  
      if(
          ["❓", "🔒"].includes(reaction.emoji.name)
      ) {
          switch(reaction.emoji.name) {
  
              case "❓":
  
              var TicketList = [
                  'ticket-25',
                  'ticket-24',
                  'ticket-23',
                  'ticket-22',
                  'ticket-21',
                  'ticket-20',
                  'ticket-19',
                  'ticket-18',
                  'ticket-17',
                  'ticket-16',
                  'ticket-15',
                  'ticket-14',
                  'ticket-13',
                  'ticket-12',
                  'ticket-11',
                  'ticket-10',
                  'ticket-09',
                  'ticket-08',
                  'ticket-07',
                  'ticket-06',
                  'ticket-05',
                  'ticket-04',
                  'ticket-03',
                  'ticket-02',
                  'ticket-01'
  
              ]
  
              let result = Math.floor((Math.random() * TicketList.length))
  
              let categoryID = "837433971288571975";
  
              var bool = false;
  
              if(bool == true) return;
             
              message.guild.channels.create(TicketList[result]).then(chan => {
                 
                chan.setParent(categoryID);
  
                    chan.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false,
                          ATTACH_FILES: false,
                          VIEW_CHANNEL: false,
                          READ_MESSAGE_HISTORY: false
                      })
    
                      chan.updateOverwrite(message.guild.members.cache.get(user.id), {
                          SEND_MESSAGES: true,
                          ADD_REACTIONS: true,
                          ATTACH_FILES: true,
                          VIEW_CHANNEL: true,
                          READ_MESSAGE_HISTORY: true
                      })
    
                      chan.updateOverwrite(message.guild.roles.cache.find(x => x.name === ""), {
                          VIEW_CHANNEL: false,
                          SEND_MESSAGES: false
                      })
                
                      chan.updateOverwrite(message.guild.roles.cache.find(s => s.name === "Joao pereira"), {
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: true
                            })
    
                      chan.updateOverwrite(message.guild.members.cache.get(user.id), {
                          SEND_MESSAGES: true,
                          ADD_REACTIONS: true,
                          ATTACH_FILES: true,
                          VIEW_CHANNEL: true,
                          READ_MESSAGE_HISTORY: true
                      })
  
                    let embedTicketOpen = new Discord.MessageEmbed()
                    .setTitle("Ticket - Suporte server")
                    .setColor("#cd3")
                    .setDescription('Olá, este é nosso suporte, qualquer dúvida pergunte aqui! Em breve algum staff estará respondendo sua pergunta!')
                    .setFooter("Ticket's")
  
                    chan.send(embedTicketOpen).then( async msg => {
                        await msg.react("🔒")
                    })
                })
            
  
              break;
  //Ticket encerrado
              case "🔒":
  
              message.channel.send("``Este ticket será fechado em 10 segundos``")
  
              setTimeout(() => {
                  message.channel.delete()
              }, cdseconds * 1500)
  
              let embedTicketClose = new Discord.MessageEmbed()
              .setTitle(`O Ticket ${message.channel.name} foi fechado`)
              .setColor("#cd3")
  
              break;
          }
      }
  })
  


//inicio de tudo
bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'channel') return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return;

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)//puxando a pasta comands + o comando
    commandFile.run(bot, message, args);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`${message.author}, O comando digitado não existe.`)
    return message.channel.send(embed);
  }
});

//status
bot.on("ready", () => {
  let activities = [
      `Olá sou um bot de tickets!`,
	  'Posso lhe dar suporte!'
    ],
    i = 0;
  setInterval( () => bot.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"


      }), 1000 * 60); 
  bot.user
      .setStatus("dnd")
      .catch(console.error);
console.log("Estou Online!")
});

bot.login(config.token);