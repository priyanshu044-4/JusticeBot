import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const animateTyping = (text) => {
    let i = 0;
    setDisplayedAnswer('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedAnswer((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const sendQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    setDisplayedAnswer('');

    try {
      const res = await axios.post('http://localhost:8000/ask', {
        question,
      });
      setAnswer(res.data.answer);
      animateTyping(res.data.answer);
    } catch (err) {
      setDisplayedAnswer('❌ Error: Could not reach JusticeBot.');
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  return (
    // Always add 'dark' class here to force dark theme
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          <div className="relative mb-6">
            <h1 className="text-4xl font-bold text-indigo-300 text-center w-full">
              ⚖️ JusticeBot
            </h1>
            {/* Dark mode toggle removed */}
          </div>

          <div className="bg-gray-800 shadow-md rounded-xl p-6 space-y-4">
            <textarea
              className="w-full border border-gray-600 bg-gray-900 text-gray-100 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              placeholder="Ask your legal question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendQuestion}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                    ></path>
                  </svg>
                  Thinking...
                </span>
              ) : (
                'Ask JusticeBot'
              )}
            </button>

            {displayedAnswer && (
              <div className="bg-gray-700 p-4 rounded-md whitespace-pre-wrap text-gray-200 border border-gray-600">
                <strong className="block mb-2 text-indigo-300">
                  📜 JusticeBot says:
                </strong>
                {displayedAnswer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
