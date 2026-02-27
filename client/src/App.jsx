import './App.css'
import {CardList} from './components/Cards'
import {entries} from './data.js'
import { useState } from 'react'

function App() {
  const [filteredText, setFilteredText] = useState('');
  function handleChange(e){
    setFilteredText(e.target.value);
  }

  return (
    <>
      <h1>Mi blog de hikes</h1>
      <div className='card-list'>
        <div className='filter'>
          <input type='text' value={filteredText} onChange={handleChange}></input>
          <button>Search</button>
        </div>
        <CardList entries={entries} filteredText={filteredText}></CardList>
      </div>
    </>
  )
}

export default App
