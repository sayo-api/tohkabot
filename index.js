require('./set');
//
const {
 default: makeWASocket,
useSingleFileAuthState,
DisconnectReason,
getContentType,
WAProto,
downloadContentFromMessage,
prepareWAMessageMedia,
MediaType,
generateWAMessageFromContent,
proto,
WA_DEFAULT_EPHEMERAL
} = require('@adiwajshing/baileys')
//
const path = require('path')
//
const gtts = require('node-gtts')
//
const figlet = require('figlet')
//
const chalk = require('chalk');
//
const term = require('terminal-kit').terminal
//
const fs = require('fs')
//
const ms = require('ms');
//
const {
state,
saveState
} = useSingleFileAuthState('./tohka.json')
//
const P = require('pino')
//
const moment = require('moment-timezone')
//
const qrcode = require('qrcode-terminal')
//
const {
exec
 } = require('child_process')
//
const util = require('util')
//
const schedule = require('node-schedule');
//
const linkfy = require('linkifyjs')
//
const deepai = require('deepai')
//
const { getBuffer, TelegraPh, getRandom, abreviar, getExtension, fetchJson, start, info, success, close } = require('./js/func');
//
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, color, bgcolor } = require('./js/func')



const tohka_ia = () => {
const tohka = makeWASocket({
 logger: P({
level: 'silent'
}),
browser: ['tohka', 'TCL_TV', '1.0.0'],
 printQRInTerminal: true,
 auth: state,
})
tohka.ev.on('connection.update', (update) => {
const {
connection, lastDisconnect
} = update
 if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
tohka_ia()
}
    } else if (connection === 'open') {
      console.log('conexão aberta')
    }
})


tohka.ev.on('messages.upsert',
 async m => {
try {
const mek = m.messages[0]
// await tohka.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
 if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
 mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
 if (!mek.message) return
 if (mek.key.fromMe) return
const fromMe = mek.key.fromMe
const isBot = mek.key.id.startsWith('BAE5') && mek.key.id.length === 16
const content = JSON.stringify(mek.message)
const _id_ = mek.key.remoteJid
const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))
const body = (type === "conversation" &&
mek.message.conversation.startsWith(prefix)) ?
 mek.message.conversation: (type == "imageMessage") &&
 mek.message[type].caption.startsWith(prefix) ?
 mek.message[type].caption: (type == "videoMessage") &&
 mek.message[type].caption.startsWith(prefix) ?
 mek.message[type].caption: (type == "extendedTextMessage") &&
 mek.message[type].text.startsWith(prefix) ?
 mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId:
 (type == "listResponseMessage") &&
 mek.message[type].singleSelectReply.selectedRowId ?
 mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
 mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
 mek.message[type].singleSelectReply.selectedRowId: (type == "tohka.sendMessageButtonMessage") &&
 mek.message[type].selectedButtonId ?
 mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
const budy = (type === "conversation") ?
 mek.message.conversation: (type === "extendedTextMessage") ?
 mek.message.extendedTextMessage.text: ""
const bady = mek.message.conversation ? mek.message.conversation: mek.message.imageMessage ? mek.message.imageMessage.caption: mek.message.videoMessage ? mek.message.videoMessage.caption: mek.message.extendedTextMessage ? mek.message.extendedTextMessage.text: (mek.message.listResponseMessage && mek.message.listResponseMessage.singleSelectReply.selectedRowId) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: ''
const bidy = bady.toLowerCase()
const selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId: ''
const argsButton = selectedButton.trim().split(/ +/)
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
 const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' &&content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' &&content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' &&content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' &&content.includes('audioMessage')

const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = _id_.endsWith('@g.us')
const isPv = _id_.endsWith('@s.whatsapp.net')
const sender = mek.key.fromMe ? (tohka.user.id.split(':')[0]+'@s.whatsapp.net' || tohka.user.id): (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = tohka.user.id.split(':')[0]
const botNumberv2 = tohka.user.id.split(':')[0]+'@s.whatsapp.net'
const pushname = mek.pushName || 'sem nome'
const groupMetadata = isGroup ? await tohka.groupMetadata(_id_).catch(e => {}): ''
const groupName = isGroup ? groupMetadata.subject: ''
const participants = isGroup ? await groupMetadata.participants: ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id): ''
const groupOwner = isGroup ? groupMetadata.owner: ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumberv2): false
const isAdmins = isGroup ? groupAdmins.includes(sender): false
const groupMembers = isGroup ? groupMetadata.participants: ''
const isOwner = coderNumero.includes(senderNumber)

async function enviar_reply(msg) {
await tohka.sendMessage(_id_, { text: msg, mentions: [sender]}, { quoted: mek}).then((res) => console.log(res)).catch((err) => console.log(err))
}

async function enviar_img(link, msg, tamanho) {
imgpbuff = await getBuffer(link)
await tohka.sendMessage(_id_, { image: imgpbuff, caption: msg, mentions: [sender] }, {quoted: mek}).then((res) => console.log(res)).catch((err) => console.log(err))
}

async function reagir(emoji) {
reactionMessage = {
    react: {
        text: emoji,
        key: mek.key
    }
}
await tohka.sendMessage(_id_, reactionMessage)
}

const ppUrl = await tohka.profilePictureUrl(sender, 'image')
const pimg = await getBuffer(ppUrl)

switch (command) {

case 'menu':

reagir('🏴')
mne = `https://tohka.tech/img/tohka.jpg`
console.log(mne)
menuifn =
`
╭━━ ⪩
▢ き⃟❗ ️*TOHKA.TECH*❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 nome: 『 ${pushname} 』
▢ ⌁ 𖠂 horário: 『 _${time}_ 』
▢ ⌁ 𖠂 totalcmd: 『 3 』
▢ ╰═══⊷
╵
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *canvas* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *attp/ttp* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *download* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *outros* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *hentai* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *tts* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}faustao (nome)
▢ ⌁ 𖥂 ${prefix}ibere (nome)
▢ ⌁ 𖥂 ${prefix}chapolin (nome)
▢ ⌁ 𖥂 ${prefix}negobam (nome)
▢ ⌁ 𖥂 ${prefix}patolino (nome)
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *ferramentas* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}nick (nome)
▢ ⌁ 𖥂 ${prefix}metadinha (nome)
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *textpro* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *ephoto* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎭 *ephoto mp4* 🎭️⃟ き 
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ⌁ 𖥂 ${prefix}
▢ ╰═══⊷
╰━━━ ⪨
`
let buffi = await getBuffer(mne)
await tohka.sendMessage(_id_, {image: buffi,
caption: menuifn })

break

case 'nick': {
try {
if (!q) return enviar_reply('Cadê o texto krl!!! 😑')
api = await fetchJson(`https://tohka.tech/api/ferramenta/stilodetxt?nome=${q}&apikey=${apikey}`)
let resultadoletra = `✨Estilo de fonte : ${q}\n\n`
for (let i of api) {
resultadoletra += `*♨️${i.nome}* : ${i.fonte}\n\n`
}
enviar_reply(resultadoletra)
} catch (err) {
console.log(err)
enviar_reply('ocorreu um erro na api, verifique sua apikey')
}
}
break

case 'faustao': {
try {
if (!q) return enviar_reply('Cadê o texto krl!!! 😑')
enviar_reply('aguarde')
api = await getBuffer(`https://tohka.tech/api/ferramenta/voz/faustao?texto=${q}&apikey=${apikey}`)
tohka.sendMessage(_id_, {
 audio: api, mimetype: 'audio/mpeg', fileName: `ia.mp3`, ptt: true},{
 quoted: mek
})
} catch (err) {
console.log(err)
enviar_reply('ocorreu um erro na api, verifique sua apikey')
}
}
break
case 'faustao':
case 'ibere':
case 'patolino': 
case 'chapolin':
case 'negobam':
try {
if (!q) return enviar_reply('Cadê o texto krl!!! 😑')
enviar_reply('aguarde')
api = await getBuffer(`https://tohka.tech/api/ferramenta/voz/${command}?texto=${q}&apikey=${apikey}`)
tohka.sendMessage(_id_, {
 audio: api, mimetype: 'audio/mpeg', fileName: `ia.mp3`, ptt: true},{
 quoted: mek
})
} catch (err) {
console.log(err)
enviar_reply('ocorreu um erro na api, verifique sua apikey')
}
break

case 'metadinha': {
try {
enviar_reply('aguarde...')
api = await fetchJson(`https://tohka.tech/api/ferramenta/metadinha?apikey=${apikey}`)
await enviar_img(api.masculina, 'masculina', null)
await enviar_img(api.feminina, 'feminina', null)
} catch (err) {
console.log(err)
enviar_reply('ocorreu um erro na api, verifique sua apikey')
}
}
break

}
} catch (e) {
const isError = String(e)
console.log(isError)
}
})
} 
tohka_ia()