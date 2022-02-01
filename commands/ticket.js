const Discord = require("discord.js")

module.exports = {
    name: "msgticket",
    aliases: ['ticket'],
    run: async(client, message, args, reaction, user) => {

    message.delete()
	
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('🚨 | Desculpe, mas você não tem permissão para isso.')
    let TicketEmbed = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setTitle(`TICKETS - SUPORTE`)
    .setDescription("Reaja com ❓ para abrir um ticket")

    message.channel.send(TicketEmbed).then(async msg => {
     +
	    msg.react(`❓`)
    })
}
}
