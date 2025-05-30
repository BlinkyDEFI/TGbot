import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendSaleNotification } from './message-handler.js';
import { processWebhookData } from './candymachine-monitor.js';
import axios from 'axios'; // Add this dependency

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
const chatIds = process.env.TELEGRAM_CHAT_IDS?.split(',').map(id => id.trim()) || [];
const app = express();

app.use(bodyParser.json());

// Helius webhook endpoint
app.post('/webhook', async (req, res) => {
  try {
    const webhookData = req.body;
    const saleData = await processWebhookData(webhookData);
    if (saleData) {
      for (const chatId of chatIds) {
        await sendSaleNotification(bot, chatId, saleData);
        console.log(`✅ Notification sent to ${chatId}`);
      }
    }
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('❌ Webhook error:', error.message);
    res.status(500).send('Error processing webhook');
  }
});

// Telegram webhook endpoint
app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  try {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Telegram webhook error:', error.message);
    res.status(500).send('Error processing Telegram webhook');
  }
});

// Telegram commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `🤖 Blinky NFT Bot is active!\n\n🍭 Monitoring candy machine:\n\`${process.env.CANDYMACHINE_ADDRESS}\`\n\n🌐 Visit: nft.blinkyonsol.com`, {
    parse_mode: 'Markdown'
  });
});

bot.onText(/\/status/, (msg) => {
  const isMonitored = chatIds.includes(msg.chat.id.toString());
  const status = isMonitored ? '✅ Active' : '❌ Not monitored';
  bot.sendMessage(msg.chat.id, `📊 Bot Status: ${status}\n🍭 Candy Machine: ${process.env.CANDYMACHINE_ADDRESS}\n📢 Monitoring ${chatIds.length} groups`, {
    parse_mode: 'Markdown'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Bot is running');
});

// Keep-alive function
async function keepAlive() {
  try {
    await axios.get('https://tgbot-1-680u.onrender.com/health');
    console.log('✅ Keep-alive ping sent');
  } catch (error) {
    console.error('❌ Keep-alive ping failed:', error.message);
  }
}

// Schedule keep-alive every 5 minutes
setInterval(keepAlive, 5 * 60 * 1000); // 5 minutes in milliseconds

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 Blinky NFT Bot started on port ${PORT}!`);
  console.log(`📢 Monitoring ${chatIds.length} groups`);
  console.log(`🍭 Candymachine: ${process.env.CANDYMACHINE_ADDRESS}`);
  keepAlive(); // Initial ping
});
