
import { Client } from 'pg';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new Client({
  connectionString: 'postgresql://postgres:kBZdWpxGNsBlwVLFqtsGPjAvZTxFwqxd@mainline.proxy.rlwy.net:15108/railway',
  ssl: { rejectUnauthorized: false },
});
client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await client.query('SELECT COUNT(*) FROM submissions');
    res.status(200).json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch count' });
  }
}
