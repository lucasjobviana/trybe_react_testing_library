import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando os elementos da página "Pokedex.js', () => {
//   it('Testando se existirá na tela um h2 com o texto "Encountered Pokémon".', () => {
//     renderWithRouter(<App />);
//     screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });// console.log(h2Element.textContent);
//   });

  const minhaFuncao = () => {
    pokemonList.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name').textContent).toEqual(pokemon.name);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  };

  const minhaFuncao2 = (type) => {
    const pokemonTypeList = pokemonList.filter((pokemon) => pokemon.type === type);
    pokemonTypeList.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name').textContent).toEqual(pokemon.name);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  };

  it('Testando se quando o botão próximo "Próximo Pokémon" é clickado o proximo pokémon é mostrado na tela.', () => {
    renderWithRouter(<App />);
    minhaFuncao();
    // pokemonList.forEach((pokemon) => {
    //   expect(screen.getByTestId('pokemon-name').textContent).toEqual(pokemon.name);
    //   userEvent.click(screen.getByTestId('next-pokemon'));
    // });
    expect(screen.getByTestId('pokemon-name').textContent).toEqual(pokemonList[0].name);
  });

  it('Testando se apenas um pokemon é mostrado por vez.', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByRole('img').length).toEqual(1);
  });

  it('Testando se os botões de filtro filtram corretamente.', () => {
    renderWithRouter(<App />);

    screen.getAllByTestId('pokemon-type-button').forEach((type, count) => {
      // expect(screen.getByTestId('pokemon-type').textContent).toEqual(type.textContent);
      console.log(count);
      minhaFuncao2();
      console.log(type.textContent);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  });
});
