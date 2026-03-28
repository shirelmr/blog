function CardList({ entries, filteredText }){
  const cards = entries
    .filter(entry => entry.title.toLowerCase().includes(filteredText.toLowerCase()))
    .map(entry => (
      <Card
        key={entry.id_post || entry.id}
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

function Card({img, title, date}){
  return(
    <div className='card'>
      <img src={img} alt={title} />
      <h1>{title}</h1>
      <p>{date}</p>
    </div>
  )
}

export { CardList, Card }