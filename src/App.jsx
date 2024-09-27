import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [clickedIndices, setClickedIndices] = useState(new Set());
  const [randomNumbers, setRandomNumbers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(query, 10);
    if (isNaN(count) || count <= 0) {
      alert('Please enter a valid number');
      return;
    }
    setBoxes(Array.from({ length: count }));
    setClickedIndices(new Set()); 
    setRandomNumbers(Array(count).fill(null)); 
  };

  const handleClick = (index) => {
    if (clickedIndices.has(index)) return; 

    const maxValue = parseInt(query, 10);
    const availableNumbers = Array.from({ length: maxValue }, (_, i) => i + 1);

    const usedNumbers = [...randomNumbers].filter(num => num !== null);
    const remainingNumbers = availableNumbers.filter(num => !usedNumbers.includes(num));

    const randomNum = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
    const newRandomNumbers = [...randomNumbers];
    newRandomNumbers[index] = randomNum; 
    setRandomNumbers(newRandomNumbers);

    const newClickedIndices = new Set(clickedIndices);
    newClickedIndices.add(index);
    setClickedIndices(newClickedIndices);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tuliskan jumlah angka"
          className="border border-gray-300 p-1"
        />
        <button
          type="submit"
          className="border border-gray-500 p-1"
        >
          Generate
        </button>
      </form>

      <div className="flex flex-wrap justify-center">
        {boxes.map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 w-32 h-32 m-2 flex items-center justify-center relative cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {!clickedIndices.has(index) ? (
              <span>{index + 1}</span>
            ) : (
              <span className="absolute top-0 left-0 p-1">{randomNumbers[index]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
