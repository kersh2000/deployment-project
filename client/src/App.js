import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const jsonData = await response.json();
      console.log(JSON.stringify(jsonData))
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My React App</h1>
      <ul>
        {Array.isArray(data) &&
          data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
