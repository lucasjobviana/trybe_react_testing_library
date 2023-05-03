import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { About, FavoritePokemon } from '../pages';
import { readFavoritePokemonIds } from '../services/pokedexService';
import pokemonList from '../data';
import App from '../App';

describe('Testando a rota /favorites', () => {
//   it('Testa se a página exibe a mensagem caso a lista esteja vazia. ', () => {
//     renderWithRouter(<FavoritePokemon />);
//     const textNoPokemon = screen.getByText('No favorite Pokémon found');
//     expect(textNoPokemon).toBeInTheDocument();
//   });
  it('Testa se a página exibe a lista de pokemons favoritos quando algum pokemon é adicionado à lista.', () => {
    const { history } = renderWithRouter(<App />);
    const firstPokemonId = pokemonList[0].id;
    const firstPokemonName = pokemonList[0].name;

    const linkToDetails = screen.getByText('More details');
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toEqual(`/pokemon/${firstPokemonId}`);
    const checkIsFavorite = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkIsFavorite);
    act(() => {
      history.push('/favorites');
    });
    expect(history.location.pathname).toEqual('/favorites');
    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    expect(pokemonName).toEqual(firstPokemonName);
  });
});
