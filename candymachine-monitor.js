export async function processWebhookData(webhookData) {
  try {
    // Helius webhook sends an array of transactions
    if (!Array.isArray(webhookData) || webhookData.length === 0) {
      console.log('No transactions in webhook data');
      return null;
    }

    const tx = webhookData[0]; // Process first transaction
    const mintAddress = tx.tokenTransfers?.[0]?.mint || 'Unknown';
    const mint = mintAddress.slice(0, 8) + '...';

    // Verify it's an NFT_SALE for the candy machine
    if (tx.type === 'NFT_SALE' && tx.accountData?.some(account => account.account === process.env.CANDYMACHINE_ADDRESS)) {
      console.log('🎉 NFT sale detected:', tx.signature);
      return {
        signature: tx.signature,
        mint: mint || 'N/A',
        timestamp: new Date(tx.timestamp * 1000).toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error processing webhook data:', error.message);
    return null;
  }
}