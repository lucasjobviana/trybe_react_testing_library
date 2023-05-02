import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { About } from '../pages';

describe('asd', () => {
  it('Testando os elementos da página "About.js"', () => {
    const { history } = renderWithRouter(<About />);

    const firstP = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const secondP = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    const textTitle = screen.getByText('About Pokédex');
    const img = screen.getByRole('img');

    expect(firstP).toBeInTheDocument();
    expect(firstP.tagName).toEqual('P');
    expect(secondP.tagName).toEqual('P');
    expect(textTitle.tagName).toEqual('H2');
    console.log(img.src);
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    expect(secondP).toBeInTheDocument();
    expect(textTitle).toBeInTheDocument();
  });
});
