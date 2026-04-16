import { Link } from 'react-router'
import { resolveImage } from '../utils/resolveImage'

function CardList({ entries, filteredText }){
  const cards = entries
    .filter(entry => entry.title.toLowerCase().includes(filteredText.toLowerCase()))
    .map(entry => (
      <Card
        key={entry.id_post || entry.id}
        id_post={entry.id_post || entry.id}
        img={entry.image || entry.img}
        title={entry.title}
        date={entry.date}
      />
    ));
  return (
    <div className='card-list'>
      {cards}
    </div>
  )
}

function Card({ title, date, img, id_post }){
  const formattedDate = date ? String(date).substring(0, 10) : ''
  const imageSrc = resolveImage(img)

  return (
    <div className='card'>
      <Link to={'/blog/' + id_post} className='card-link'>
        <img src={imageSrc} alt={title} />
        <h1>{title}</h1>
        <p>{formattedDate}</p>
      </Link>
    </div>
  )
  }

export { CardList, Card }
