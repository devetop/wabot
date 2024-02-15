const client = require('./whatsapp');
const { MessageMedia, Buttons } = require('whatsapp-web.js');

client.on('message', (message) => {
	console.log(message.from,message.body,message.timestamp,message.to);
});

client.on('message', async (message) => {
	if (message.body === '!ping') {
		await message.reply('pong');
	}
});

client.on('message', async (message) => {
	if (message.body === '!hai') {
		await client.sendMessage(message.from, 'ya');
	}
});

client.on('message', async (msg) => {
    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        console.log(`
            *Media info*
            MimeType: ${media.mimetype}
            Filename: ${media.filename}
            Data (length): ${media.data.length}
            Data (base64): ${media.data}
        `);
    }
});

client.on('message', async (msg) => {
	if (msg.body === '!delete') {
	  if (msg.hasQuotedMsg) {
	    const quotedMsg = await msg.getQuotedMessage();
	    if (quotedMsg.fromMe) {
	      quotedMsg.delete(true);
	    } else {
	      msg.reply('kurang privileges');
	    }
	}
	}
});

client.on('message', async (msg) => {
    if (msg.from) {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        console.log(`
          nama : ${chat.name}
          unread : ${chat.unreadCount}
          shortname : ${contact.pushname}
        `);
    }
});

client.on('message', async (msg) => {
    if (msg.body === '!send-media') {
        const media = await MessageMedia.fromUrl('https://bisacloud.my.id/posts/meningkatkan-kinerja-disk-dengan-lvm-cache/featured.jpg');
        await client.sendMessage(msg.from, media, { caption: 'this is my caption' });
    }
});

let rejectCalls = true;

client.on('call', async (call) => {
    console.log('Call received, rejecting. GOTO Line 261 to disable', call);
    if (rejectCalls) await call.reject();
    await client.sendMessage(call.from, `gak mau ngangkat wleee`);
});
