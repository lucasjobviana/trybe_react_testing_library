import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const filterNames = [...new Set(
  pokemonList.reduce((types, { type }) => [...types, type], []),
)];// funcção reutilizado do próprio projeto: pokedex.js.

const clickNextAndCompare = (list) => { // type
  list.forEach((pokemon) => {
    expect(screen.getByTestId('pokemon-name').textContent).toEqual(pokemon.name);
    userEvent.click(screen.getByText('Próximo Pokémon'));
  });
};

describe('Testando os elementos da página "Pokedex.js', () => {
  it('Testando se existirá na tela um h2 com o texto "Encountered Pokémon".', () => {
    renderWithRouter(<App />);
    screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
  });

  it('Testando se quando o botão próximo "Próximo Pokémon" é clickado o proximo pokémon é mostrado na tela.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('All'));
    clickNextAndCompare(pokemonList);
    expect(screen.getByTestId('pokemon-name').textContent).toEqual(pokemonList[0].name);
  });

  it('Testando se apenas um pokemon é mostrado por vez.', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByRole('img').length).toEqual(1);
  });

  it('Testando se os botões de filtro filtram corretamente.', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const filterButtonNames = filterButtons.map((btn) => btn.textContent);
    expect(filterButtonNames).toEqual(filterNames);

    filterButtons.forEach((type, index) => {
      userEvent.click(filterButtons[index]);

      clickNextAndCompare(
        pokemonList.filter((pokemon) => pokemon.type === type.textContent),
      );
    });
  });

  it('Testando se o botão para resetar o filtro existem com o texto "All" e esta selecionado por padrão.', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByRole('button');
    expect(filterButtons[0].textContent).toEqual('All');
    userEvent.click(filterButtons[3]);
    screen.getByText('Caterpie');
  });

  it('Testando se ao clicar no botão de filtro os pokemons alteram.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Poison' }));
    screen.getByText('Ekans');
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    screen.getByText('Pikachu');
  });
});

//   pokemonList.filter((pokemon) => pokemon.type === type.textContent).forEach((p) => {
//     expect(screen.getByTestId('pokemon-name').textContent).toEqual(p.name);
//     act(() => {
//       userEvent.click(screen.getByTestId('next-pokemon'));
//     });
//   });
//   userEvent.click(screen.getByTestId('next-pokemon'));
