import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('About.js testing.', () => {
  it('Testando os elementos da página "About.js"', () => {
    renderWithRouter(<About />);

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
