import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const pokemonList = async () => {
  const retorno = await fetch('https://pokeapi.co/api/v2/pokemon/25');
  const a = await retorno.json();
  const { id, name, types: [{ type: { name: type } }]
  } = a;
  const pokemon = { id, name, type }
  alert(pokemon.type)
  console.log(pokemon)
}

pokemonList();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
