import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceImport = () => {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState('');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleImportAll = async () => {
    if (!jsonInput.trim()) {
      setError('Please paste JSON data');
      return;
    }

    setImporting(true);
    setError('');
    setResults([]);

    try {
      // Parse JSON
      const servicesData = JSON.parse(jsonInput);
      
      if (!Array.isArray(servicesData)) {
        throw new Error('JSON must be an array of services');
      }

      setProgress({ current: 0, total: servicesData.length });

      const importResults = [];

      for (let i = 0; i < servicesData.length; i++) {
        const serviceData = servicesData[i];
        setProgress({ current: i + 1, total: servicesData.length });

        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch('http://localhost:5000/api/services/import/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(serviceData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to import');
          }

          importResults.push({
            slug: serviceData.slug,
            name: serviceData.name,
            sections: serviceData.sections.length,
            success: true,
          });

        } catch (err) {
          importResults.push({
            slug: serviceData.slug || 'unknown',
            name: serviceData.name || 'Unknown',
            success: false,
            error: err.message,
          });
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      setResults(importResults);
      
      const succeeded = importResults.filter(r => r.success).length;
      const failed = importResults.filter(r => !r.success).length;
      
      alert(`✅ Import complete!\n\nSucceeded: ${succeeded}\nFailed: ${failed}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setResults([]);
    setError('');
    setProgress({ current: 0, total: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Content Importer</h1>
              <p className="text-gray-600 mt-1">Import all 56 services from gaglawyers.com</p>
            </div>
            <button
              onClick={() => navigate('/admin/service-manager')}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ← Back
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📖 How to Use:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Install the bookmarklet below (drag to bookmarks bar)</li>
              <li>Go to <code className="bg-blue-100 px-1 rounded">gaglawyers.com</code></li>
              <li>Click the bookmarklet</li>
              <li>Wait 1-2 minutes while it scrapes all services</li>
              <li>Click "Copy All JSON"</li>
              <li>Paste JSON below and click "Import All"</li>
            </ol>
          </div>
        </div>

        {/* Bookmarklet Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Bookmarklet (Optional)</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              ⚠️ The bookmarklet approach is optional. You can simply paste raw text from service pages directly into this chat, and I'll parse and import it for you.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-2">
              To use the bookmarklet (advanced):
            </p>
            <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
              <li>Open <code className="bg-gray-200 px-1 rounded">backend/scripts/smart-bookmarklet-minified.js</code></li>
              <li>Copy the entire javascript: line</li>
              <li>Create a new bookmark and paste as URL</li>
              <li>Visit gaglawyers.com and click the bookmark</li>
            </ol>
          </div>
        </div>

        {/* JSON Input */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Paste JSON & Import</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste JSON from bookmarklet:
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[{"slug":"bail-lawyer","name":"Bail Lawyer","sections":[...]},...]'
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              disabled={importing}
            />
            {jsonInput && (
              <p className="text-sm text-gray-600 mt-2">
                {(() => {
                  try {
                    const data = JSON.parse(jsonInput);
                    return `✅ Valid JSON - ${Array.isArray(data) ? data.length : 0} services`;
                  } catch {
                    return '❌ Invalid JSON';
                  }
                })()}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleImportAll}
              disabled={importing || !jsonInput.trim()}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              {importing ? `Importing ${progress.current}/${progress.total}...` : 'Import All'}
            </button>
            <button
              onClick={handleClear}
              disabled={importing}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Progress */}
        {importing && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {progress.current} / {progress.total}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((progress.current / progress.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Results</h2>
            
            <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.success
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {result.success ? (
                    <div>
                      <p className="font-medium text-green-900">✅ {result.name}</p>
                      <p className="text-sm text-green-700">
                        {result.slug} - {result.sections} sections
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-red-900">❌ {result.name}</p>
                      <p className="text-sm text-red-700">{result.slug}</p>
                      <p className="text-xs text-red-600 mt-1">{result.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Summary:</span>{' '}
                {results.filter(r => r.success).length} succeeded,{' '}
                {results.filter(r => !r.success).length} failed
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceImport;
