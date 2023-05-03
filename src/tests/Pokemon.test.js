import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando os elementos da página "Pokedex.js', () => {
  it('d', () => {
    // console.log(pokemonList[0]);
    const { history } = renderWithRouter(<App />);
    const { name, type, averageWeight, image, id } = pokemonList[0];
    //    console.log(pokemonList[0]);
    screen.getByText(name);
    expect(screen.getByTestId('pokemon-type').textContent).toEqual(type);
    screen.getByText(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(screen.getByRole('img').src).toEqual(image);
    screen.getByAltText(`${name} sprite`);
    const moreDetails = screen.getByText('More details');
    expect(moreDetails.href).toEqual(`http://localhost/pokemon/${id}`);
    userEvent.click(moreDetails);
    expect(history.location.pathname).toEqual(`/pokemon/${id}`);

    act(() => {
      userEvent.click(screen.getByText('Pokémon favoritado?'));
    });
    const star = screen.getAllByRole('img')[1];
    expect(star.src).toEqual('http://localhost/star-icon.svg');
    screen.getByAltText(`${name} is marked as favorite`);
  });
});
