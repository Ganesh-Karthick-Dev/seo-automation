'use client'

import React, { useState } from 'react'

const HighQualityLinksPage = () => {
  const [keyword, setKeyword] = useState('');
  const [suffix, setSuffix] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Validation function to check if all fields are filled
  const isFormValid = () => {
    return keyword.trim() !== '' && 
           suffix.trim() !== '' && 
           documentUrl.trim() !== '' && 
           sheetUrl.trim() !== '';
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const suffixArray = [suffix];
      const response = await fetch('https://webnoxdigital.app.n8n.cloud/webhook/84886abd-b519-487c-9515-edb3cf05b9d7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          keyword, 
          suffix: suffixArray,
          documentUrl,
          sheetUrl
        })
      });
      console.log(`epic response - `,response);
      
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Get High Quality Backlinks</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter keyword"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Suffix <span className='text-xs text-gray-400'></span></label>
            <input
              type="text"
              value={suffix}
              onChange={e => setSuffix(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter suffix (e.g. blog, forum, article)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Document URL</label>
            <input
              type="url"
              value={documentUrl}
              onChange={e => setDocumentUrl(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter document URL"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Sheet URL</label>
            <input
              type="url"
              value={sheetUrl}
              onChange={e => setSheetUrl(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter sheet URL"
              required
            />
          </div>
          <button
            type="button"
            className={`w-full font-semibold py-2 rounded transition ${
              isFormValid() && !loading
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid() || loading}
            onClick={handleSubmit}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {result && <div className="mt-4 text-green-600 font-medium">{result}</div>}
        {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
        <div className="mt-6 text-center">
          <a
            href="https://docs.google.com/spreadsheets/d/1_21wzEuYQcKOJcb5i4AKQLfuqxS79lifkK1jXQIbdBo/edit?gid=0#gid=0"
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

export default HighQualityLinksPage;