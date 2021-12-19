import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import Navigation from './Components/Navigation';

export const centralState = createContext();

function App() {
  const [store, setStore] = useState([]);

  const getNews = async () => {
    try {
      const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json');
      const data = await response.json();
      setStore(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <centralState.Provider value={{ store, setStore }}>
      <div className='row'>
        <h2>This app is made for "EOX Vantage Senior React.js Developer Hiring Challenge"</h2>
      </div>
      <Navigation />
    </centralState.Provider>
  );
}

export default App;