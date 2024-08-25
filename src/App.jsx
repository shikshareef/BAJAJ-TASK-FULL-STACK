import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!parsedJson.data) {
        setError('Invalid JSON: Missing "data" field.');
        setResponseData(null);
        return;
      }

      const response = await axios.post(
        'https://bajaj-backend-1d2t.onrender.com/bfhl',
        parsedJson
      );
      setResponseData(response.data);
      setError('');
      setSelectedFilters([]); // Reset filters on new submission
    } catch (err) {
      setError('Invalid JSON or server error.');
      setResponseData(null);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters((prevFilters) =>
      checked
        ? [...prevFilters, value]
        : prevFilters.filter((filter) => filter !== value)
    );
  };

  const renderFilteredResponse = () => {
    if (!selectedFilters.length) {
      return <div className="text-gray-500">No filters selected.</div>;
    }

    return (
      <div className="bg-white p-4 rounded shadow mt-4">
        {selectedFilters.includes('numbers') && responseData.numbers.length > 0 && (
          <div className="mb-2">
            <strong>Numbers:</strong> {responseData.numbers.join(', ')}
          </div>
        )}
        {selectedFilters.includes('alphabets') &&
          responseData.alphabets.length > 0 && (
            <div className="mb-2">
              <strong>Alphabets:</strong> {responseData.alphabets.join(', ')}
            </div>
          )}
        {selectedFilters.includes('highest_lowercase_alphabet') &&
          responseData.highest_lowercase_alphabet.length > 0 && (
            <div className="mb-2">
              <strong>Highest Lowercase Alphabet:</strong>{' '}
              {responseData.highest_lowercase_alphabet.join(', ')}
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">
        ROLL NO: 21BCE9384 - SHAIK SHAREEF
      </h2>
      <h1 className="text-3xl font-bold mb-6">BFHL Challenge Frontend</h1>
      <textarea
        className="w-full max-w-lg p-4 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="8"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here, e.g., { "data": ["A", "1", "b", "3"] }'
      />
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && (
        <div className="text-red-500 mt-4 font-medium">{error}</div>
      )}
      {responseData && (
        <div className="mt-8 w-full max-w-lg">
          <label className="block text-lg font-medium mb-2">
            Select Filters:
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label className="inline-flex items-center mb-2 sm:mb-0">
              <input
                type="checkbox"
                value="numbers"
                checked={selectedFilters.includes('numbers')}
                onChange={handleFilterChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Numbers</span>
            </label>
            <label className="inline-flex items-center mb-2 sm:mb-0">
              <input
                type="checkbox"
                value="alphabets"
                checked={selectedFilters.includes('alphabets')}
                onChange={handleFilterChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Alphabets</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                checked={selectedFilters.includes('highest_lowercase_alphabet')}
                onChange={handleFilterChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">
                Highest Lowercase Alphabet
              </span>
            </label>
          </div>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
