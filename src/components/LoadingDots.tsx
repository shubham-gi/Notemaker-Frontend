import React, { useState, useEffect } from "react";

const LoadingDots: React.FC = () => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
    }, 400); // Change the interval time if needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
      <span className="text-lg">{dots}</span>
    
  );
};

export default LoadingDots;
