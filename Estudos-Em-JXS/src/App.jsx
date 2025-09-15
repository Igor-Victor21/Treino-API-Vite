import style from './App.module.css'
import { useEffect, useState } from 'react'
import { api } from './api/api'

function App() {

  const [data, setData] = useState([])
  const [erro, setErro] = useState(false)

  useEffect(() => {
    api.get('/character').then((response) => {
      setData(response.data.results)
    }).catch((error) =>{
      if(error.response && error.response.status === 404){
        setErro(true)
      }
      console.error(error);
    });
  },[]);

  if(erro){
    return(<><p>Personagens não encontrados (Erro 404)</p></>)
  }

  return (
    <section>
      {data.map((item,index) => (
        <div key={index}>
          <img src={item.image} alt={item.name} style={{width: '100px', height: '100px'}}/>
          <p>{item.name}</p>
          <p>{item.species}</p>
        </div>
      ))}
    </section>
  )
}

export default App
