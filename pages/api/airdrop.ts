
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://postgres:kBZdWpxGNsBlwVLFqtsGPjAvZTxFwqxd@mainline.proxy.rlwy.net:15108/railway',
  ssl: { rejectUnauthorized: false },
});
client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { wallet_address, twitter, telegram } = req.body;
  if (!wallet_address) return res.status(400).json({ error: 'Missing wallet address' });

  try {
    const existing = await client.query('SELECT * FROM submissions WHERE wallet_address = $1', [wallet_address]);
    if (existing.rows.length > 0) return res.status(409).json({ error: 'Address already submitted' });

    await client.query('INSERT INTO submissions (wallet_address, twitter, telegram) VALUES ($1, $2, $3)',
      [wallet_address, twitter, telegram]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
