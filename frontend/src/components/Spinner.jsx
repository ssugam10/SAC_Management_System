import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 rounded-full animate-spin" style={{border: "8px solid", borderImage: "linear-gradient(to right, #4dc0b5, #3490dc)"}}></div>
    </div>
  );
};

export default Spinner;
