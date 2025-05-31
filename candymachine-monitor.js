export async function processWebhookData(webhookData) {
  try {
    console.log('Raw webhook data:', JSON.stringify(webhookData, null, 2)); // Debug
    if (!Array.isArray(webhookData) || webhookData.length === 0) {
      console.log('No transactions in webhook data');
      return null;
    }

    const tx = webhookData[0];
    console.log('Transaction type:', tx.type);
    console.log('Account data:', tx.accountData);
    const mintAddress = tx.tokenTransfers?.[0]?.mint || 'Unknown';
    const mint = mintAddress.slice(0, 8) + '...';

    // Check for NFT_MINT and Candy Guard involvement
    if (tx.type === 'NFT_MINT' && (
      tx.accountData?.some(account => account.account === process.env.CANDYGUARD_ADDRESS) ||
      tx.instructions?.some(instruction => instruction.accounts?.includes(process.env.CANDYGUARD_ADDRESS))
    )) {
      console.log('🎉 NFT mint detected via Candy Guard:', tx.signature);
      return {
        signature: tx.signature,
        mint: mint || 'N/A',
        timestamp: tx.timestamp ? new Date(tx.timestamp * 1000).toISOString() : new Date().toISOString()
      };
    }
    console.log('No matching NFT_MINT for Candy Guard');
    return null;
  } catch (error) {
    console.error('❌ Error processing webhook data:', error.message);
    return null;
  }
}
