
'use client';

import { useEffect, useState } from 'react';

export default function AirdropForm() {
  const [wallet, setWallet] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [status, setStatus] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/airdrop-count')
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('Wysyłanie...');

    const res = await fetch('/api/airdrop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet_address: wallet, twitter, telegram })
    });

    if (res.ok) {
      setStatus('✅ Zgłoszenie zapisane!');
      setWallet('');
      setTwitter('');
      setTelegram('');
      const updated = await fetch('/api/airdrop-count');
      const data = await updated.json();
      setCount(data.count);
    } else {
      const err = await res.json();
      setStatus(`❌ Błąd: ${err.error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-60 p-6 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Noktra Airdrop</h2>
      <p className="mb-4 text-center text-sm">Zgłoszonych: <b>{count}</b></p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Adres Solana" className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={wallet} onChange={(e) => setWallet(e.target.value)} required />
        <input type="text" placeholder="Twitter" className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={twitter} onChange={(e) => setTwitter(e.target.value)} />
        <input type="text" placeholder="Telegram" className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={telegram} onChange={(e) => setTelegram(e.target.value)} />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-semibold">
          Wyślij zgłoszenie
        </button>
      </form>
      <p className="mt-4 text-center text-sm">{status}</p>
    </div>
  );
}
