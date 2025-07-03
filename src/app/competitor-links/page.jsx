import React, { useState } from 'react'

const CompetitorLinksPage = () => {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
        

      const response = await fetch('https://webnoxdigital.app.n8n.cloud/webhook/7f5dff4d-ef89-438f-9f4d-e2df0f7a2b4c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ competitor_url: competitorUrl }])
      });
      if (!response.ok) throw new Error('Failed to submit');
      const data = await response.json().catch(() => ({}));
      setResult(data.message || 'Submitted successfully!');
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Competitor Backlinks</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Competitor URL</label>
            <input
              type="text"
              value={competitorUrl}
              onChange={e => setCompetitorUrl(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter competitor URL"
              required
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {result && <div className="mt-4 text-green-600 font-medium">{result}</div>}
        {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
        <div className="mt-6 text-center">
          <a
            href="https://docs.google.com/spreadsheets/d/1El1YPkQHWoPMKNoCmafxKUoYXXu-DcXhyo3a8iF0Swk/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            Go to Sheet
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompetitorLinksPage;