import './App.css'

function Card({img, title, date}){
  return(
    <div className = 'card'>
      <img src={img}></img>
      <h1>{title}</h1>
      <p>{date}</p>
    </div>
  )
}

function App() {

  return (
    <>
      <h1>Mi blog de hikes</h1>
      <div className='card-list'>
        <Card img='./src/assets/sierranegra.jpeg' title='Sierra Negra' date='25/06/2026'></Card>
        <Card img='./src/assets/izta.jpeg' title='Iztaccíhuatl' date='25/06/2026'></Card>
        <Card img='./src/assets/nevado.jpeg' title='Nevado de Toluca' date='25/06/2026'></Card>
        <Card img='./src/assets/pinal.jpeg' title='Pinal' date='25/06/2026'></Card>
      </div>
    </>
  )
}

export default App
