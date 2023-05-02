import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando as rotas do app.', () => {
  // it('Testa se a aplicação é renderizada inicialmente na rota correta.', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const { location: { pathname } } = history;
  //   expect(pathname).toEqual('/');
  // });

  // it('Testa se a aplicação contém quatro links para navegação quando esta na rota home.', () => {
  //   renderWithRouter(<App />);
  //   const linksApp = screen.getAllByRole('link');
  //   expect(linksApp.length).toBe(4);
  // });

  it('Testa se os links para a rotas comtém os textos corretos.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getAllByRole('link');
    expect(linkHome[0].textContent).toBe('Home');
    expect(linkHome[1].textContent).toBe('About');
    expect(linkHome[2].textContent).toBe('Favorite Pokémon');
    expect(linkHome[3].textContent).toBe('More details');
  });
});
