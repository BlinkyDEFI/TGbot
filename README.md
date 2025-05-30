
# Blinky NFT Telegram Bot

A professional Telegram bot that monitors your Metaplex Candymachine v3 for NFT sales and posts celebration messages to multiple Telegram groups.

## Features

- 🎉 Automatic sale notifications with video and branding
- 📢 Multi-group support (post to multiple Telegram groups)
- 🔗 Professional messaging with mint page links
- 🤖 Bot commands for status and management
- 🍭 Real-time Candymachine monitoring

## Setup Instructions

### 1. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your values:
   ```env
   TELEGRAM_BOT_TOKEN=8160214195:AAEI2tAFIYgdLAc-tNuY6Hq0y2a_tN5pNiA
   TELEGRAM_CHAT_IDS=-1001234567890,-1001234567891
   HELIUS_RPC_URL=https://rpc.helius.xyz/?api-key=YOUR_API_KEY
   CANDYMACHINE_ADDRESS=YOUR_CANDYMACHINE_ADDRESS
   ```

### 2. Get Telegram Chat IDs

1. Add your bot (@BlinkyNFTBot) to each Telegram group
2. Send a message in each group
3. Visit: `https://api.telegram.org/bot8160214195:AAEI2tAFIYgdLAc-tNuY6Hq0y2a_tN5pNiA/getUpdates`
4. Find the negative chat IDs in the response
5. Add them to `TELEGRAM_CHAT_IDS` (comma-separated)

### 3. Install & Run

```bash
npm install
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Bot Commands

- `/start` - Activate the bot and show info
- `/status` - Check bot status and configuration

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token | `123:ABC...` |
| `TELEGRAM_CHAT_IDS` | Comma-separated chat IDs | `-1001..., -1002...` |
| `HELIUS_RPC_URL` | Helius RPC endpoint with API key | `https://rpc.helius.xyz/?api-key=...` |
| `CANDYMACHINE_ADDRESS` | Your Metaplex Candymachine address | `ABC123...` |

## File Structure

```
src/telegram-bot/
├── index.js                 # Main bot entry point
├── message-handler.js       # Handles sale notification messages
├── candymachine-monitor.js  # Monitors candymachine for sales
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Customization

- **Video URL**: Update in `message-handler.js`
- **Logo URL**: Update in `message-handler.js`
- **Message text**: Modify in `message-handler.js`
- **Monitoring interval**: Adjust timeout in `candymachine-monitor.js`

## Troubleshooting

1. **Bot not responding**: Check if bot token is correct and bot is added to groups
2. **No sale notifications**: Verify Helius RPC URL and Candymachine address
3. **Chat ID issues**: Ensure chat IDs are negative numbers for groups
4. **Permission errors**: Make sure bot has admin permissions in groups

## Support

For issues or questions, check your configuration and ensure all environment variables are set correctly.
