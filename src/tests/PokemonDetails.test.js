import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando os elementos da página "PokemonDetails.js', () => {
  it('d', () => {
    // console.log(pokemonList[0]);
    const { history } = renderWithRouter(<App />);
    // console.log(pokemonList[0]);
    console.log(pokemonList[0]);
    const { name, type, averageWeight, image, id, summary, foundAt } = pokemonList[0];
    act(() => { history.push(`/pokemon/${id}`); });
    screen.getByText(`${name} Details`);
    expect(screen.queryByText('More details')).toBeNull();
    screen.getByRole('heading', { level: 2, name: 'Summary' });
    screen.getByText(summary);
    screen.getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    foundAt.forEach(({ location }) => {
      screen.getByText(location);
    });
  });
});
