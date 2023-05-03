import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';
import App from '../App';

describe('Testando a rota /favorites', () => {
  const urlFavorites = '/favorites';
  it('Testa se a página exibe a mensagem caso a lista esteja vazia. ', () => {
    renderWithRouter(<FavoritePokemon />);
    const textNoPokemon = screen.getByText('No favorite Pokémon found');
    expect(textNoPokemon).toBeInTheDocument();
  });
  it('Testa se a página exibe a lista de pokemons favoritos quando algum pokemon é adicionado à lista.', () => {
    const { history } = renderWithRouter(<App />);
    const { id: firstPokemonId, name: firstPokemonName } = pokemonList[0];
    const linkToDetails = screen.getByText('More details');
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toEqual(`/pokemon/${firstPokemonId}`);
    const checkIsFavorite = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkIsFavorite);
    act(() => {
      history.push(urlFavorites);
    });
    expect(history.location.pathname).toEqual(urlFavorites);
    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    expect(pokemonName).toEqual(firstPokemonName);
    const linkToDetail = screen.getByText('More details');
    userEvent.click(linkToDetail);
    expect(history.location.pathname).toEqual(`/pokemon/${firstPokemonId}`);
    userEvent.click(screen.getByText('Pokémon favoritado?'));
    act(() => {
      history.push(urlFavorites);
    });
    expect(history.location.pathname).toEqual('/favorites');
    const textNoPokemon = screen.getByText('No favorite Pokémon found');
    expect(textNoPokemon).toBeInTheDocument();
  });
});
