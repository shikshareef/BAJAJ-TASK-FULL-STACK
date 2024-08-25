import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!parsedJson.data) {
        setError('Invalid JSON: Missing "data" field.');
        return;
      }

      const response = await axios.post('https://bajaj-backend-1d2t.onrender.com/bfhl', parsedJson);
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or server error.');
      setResponseData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">BFHL Challenge Frontend</h1>
      <textarea
        className="w-full max-w-lg p-4 border border-gray-300 rounded mb-4"
        rows="10"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here, e.g., { "data": ["A", "1", "b", "3"] }'
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {responseData && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Response</h2>
          <div className="bg-white p-4 rounded shadow">
            <div><strong>Numbers:</strong> {responseData.numbers.join(', ')}</div>
            <div><strong>Alphabets:</strong> {responseData.alphabets.join(', ')}</div>
            {responseData.highest_lowercase_alphabet.length > 0 && (
              <div><strong>Highest Lowercase Alphabet:</strong> {responseData.highest_lowercase_alphabet.join(', ')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
