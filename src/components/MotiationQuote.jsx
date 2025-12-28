import React, { useEffect, useState } from "react";
import quotes from "../data/quotes";

const MotivationQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].text);
    setAuthor(quotes[randomIndex].author);
  }, []);

  return (
    <div className="mb-6 p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-gradient-to-b from-blue-100 to-white  m-2 p-1">
      <div className="bg-white rounded-2xl p-6 hover:scale-[1.02] transition">
        <div className="animate-slideIn">
          <p className="text-sm font-xl text-gray-500">Hey this is for you...</p>
          <p className="text-lg font-semibold text-gray-800">
            “{quote}”
          </p>
          <p className="text-right text-sm text-gray-500 mt-3">
            — {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationQuote;
