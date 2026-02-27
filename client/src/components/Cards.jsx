function CardList({ entries, filteredText }){
  const cards = entries.map(entry => entry.title.includes(filteredText) && <Card key={entry.id} img={entry.img} title={entry.title} date={entry.date}></Card>)
  return (
    <div className='card-list'>
      {cards}
    </div>
  )
}

function Card({id, img, title, date}){
  return(
    <div className = 'card' key={id}>
      <img src={img}></img>
      <h1>{title}</h1>
      <p>{date}</p>
    </div>
  )
}

export { CardList, Card }