import { CardList } from './components/Cards'
import { entries } from './data.js'
import { useState } from 'react'

function Blog() {
  const [filteredText, setFilteredText] = useState('');

  function handleChange(e) {
    setFilteredText(e.target.value);
  }

  return (
    <>
      <h1>Mi blog de hikes</h1>
      <div className='card-list'>
        <div className='filter'>
          <input type='text' placeholder='Buscar hike...' value={filteredText} onChange={handleChange} />
          <button>Search</button>
        </div>
        <CardList entries={entries} filteredText={filteredText} />
      </div>
    </>
  )
}

export default Blog