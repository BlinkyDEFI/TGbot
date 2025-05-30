export async function sendSaleNotification(bot, chatId, saleData) {
  const videoUrl = process.env.CELEBRATION_VIDEO_URL || 'https://gateway.irys.xyz/NGY5Uo_lDb4F4PBHoMN8WsYwh0A6n7FMElVJh6P9mL4?ext=mp4';

  const message = `🎉 *BLINKY NFT BUY DETECTED!*

💎 *NFT Sold!*
🔥 Mint: \`${saleData.mint}\`
🕒 Time: ${saleData.timestamp}

🌐 *Mint yours now:* [nft.blinkyonsol.com](https://nft.blinkyonsol.com)
🌍 *Visit us:* [blinkyonsol.com](https://blinkyonsol.com)

_Powered by Blinky NFT Bot 🤖_`;

  try {
    await bot.sendVideo(chatId, videoUrl, {
      caption: message,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🛒 Mint Now', url: 'https://nft.blinkyonsol.com' },
            { text: '🌐 Website', url: 'https://blinkyonsol.com' }
          ]
        ]
      }
    });
  } catch (error) {
    console.error('❌ Error sending sale notification:', error);
    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🛒 Mint Now', url: 'https://nft.blinkyonsol.com' },
            { text: '🌐 Website', url: 'https://blinkyonsol.com' }
          ]
        ]
      }
    });
  }
}