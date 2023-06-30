import React from 'react';
import { screen, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando os elementos da página "PokemonDetails.js', () => {
  it('Fazendo testes', () => {
    const { history } = renderWithRouter(<App />);
    console.log(pokemonList[0]);
    const { name, id, summary, foundAt } = pokemonList[0];
    act(() => { history.push(`/pokemon/${id}`); });
    screen.getByText(`${name} Details`);
    expect(screen.queryByText('More details')).toBeNull();
    screen.getByRole('heading', { level: 2, name: 'Summary' });
    screen.getByText(summary);
    screen.getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    foundAt.forEach(({ location, map }, index) => {
      screen.getByText(location);
      const imgLocations = screen.getAllByAltText(`${name} location`);
      expect(imgLocations[index].src).toEqual(map);
    });
    screen.getByText('Pokémon favoritado?');
    const check = screen.queryByRole('checkbox');
    expect(check.checked).toEqual(false);
    userEvent.click(check);
    expect(check.checked).toEqual(true);
    userEvent.click(check);
    expect(check.checked).toEqual(false);
  });
});
