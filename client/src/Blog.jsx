import { CardList } from './components/Cards'
import { useState, useEffect } from 'react'

function Blog() {
  const [entries, setEntries] = useState([]);
  const [filteredText, setFilteredText] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then((res) => res.json())
      .then((posts) => setEntries(posts))
      .catch((err) => console.log('Error fetching posts:', err));
  }, []);

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