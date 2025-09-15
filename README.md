# React + Vite + API Connection

##

# 1. Criando um Projeto em Vite

- Primeiro comando para criar "npm create vite@latest"

- React

- cd <nome do projeto>

- npm install

- npm run dev

##

# 2. Conectando Api

- Limpe o Projeto apagando os itens de dentro do return();
- Index css também tire tudo dela
- E zere o css \*{margin: 0; padding: 0; box-sizing: border-box;}

- Dentro da src crie uma pasta api, e crie um arquivo jsx (recomendo: api.jsx) para não se confundir

# Código do Arquivo api.jsx

- Precisa baixar a biblioteca axios (npm install axios)
- Importe a biblioteca axios (import axios from 'axios')
- Crie a função ja exportando a mesma (export const api = axios.create({}))
- Pegue a URL da api no endpoint certo com (BASEURL: 'URL DA API')

##

# Código completo com a API do rick and morty como exemplo

import axios from 'axios'

export const api = axios.create({
baseURL: 'https://rickandmortyapi.com/api/'
})

##

# Exibindo as informações da API dentro da App.jsx

- Importe as funções useState e useEffect da biblioteca react (import { useState, useEffect } from 'react')

- Importe a api também (import { Api } from './api/api') PS: VERIFIQUE SE A ROTA ESTÁ CERTA

- Crie as duas variaveis de estado:
- const [data, setData] = useState([])
- const [erro, setErro] = useState(false)

# useEffect

- Utilize do useEffect para acessar as informações dentro da API
- Ex useEffect sem nada dentro
- useEffect(() => {},[]);

- Para acessar api precisa chamar a API pelo nome que foi importado, e precisa utilizar o get para pegar as informações de dentro da API

- EX: api.get('/character')

- O "/character" é o endpoint da url onde eu to pegando as informações do personagem

- Quando o sistema acessar o endpoint, ele vai gerar uma resposta e irá setar essa resposta dentro da variavel de estado, estando setado o sistema vai buscar os resultados da api (results), dependendo da api isso pode mudar então tem que verificar a documentação que nem na API do dragonBall que é "items", então olhe com atenção a documentação.

- Então o código ficaria da seguinte forma

- EX: api.get('/character').then((response) =>{setData(response.data.results)})

- Caso de algum erro o erro será tratado e exibido na tela, com duas simples condicionais

- Se o erro retona uma resposta e a resposta do erro for igual a o erro 404 então, então torne o erro verdadeiro na variavel de estado

- EX: if(error.response && error.response.status === 404){setErro(true)}

- Se a variavel de estado "Erro" for verdadeiro então retorne para o usuário um texto escrito "Personagens não encontrados (Erro 404)"

- EX: if(erro){return(<><p>Personagens não encontrados (Erro 404)</p></>)}

# Código do useEffect

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

##

# Tela do usuário

- Logo no inicio foi feito um mapeamento dentro davariavel de estado

- Ex: {data.map((item, index) =>())}

- Item serve para buscar as informações dentro do sistema
- Index é o indice de um array

- Então se tem uma div com uma chave recebendo uma index, significa que cada indice do array é um bloco de informações que será gerada

- É extamente o que acontece com o próximo bloco de informações que fica dentro do mapeamento (COMENTADO PQ PODE BUGAR O README)

  <section>
    {data.map((item,index) => (
      <div key={index}>
        <img src={item.image} alt={item.name} style={{width: '100px', '100px'}}/>
        <p>{item.name}</p>
        <p>{item.species}</p>
      </div>
    ))}
  </section>

# CÓDIGO COMPLETO 

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

