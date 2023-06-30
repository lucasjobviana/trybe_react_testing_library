import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando as rotas do app.', () => {
  it('Testa se a aplicação é renderizada inicialmente na rota correta.', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/');
  });

  it('Testa se a aplicação contém quatro links para navegação quando esta na rota home.', () => {
    renderWithRouter(<App />);
    const linksApp = screen.getAllByRole('link');
    expect(linksApp.length).toBe(4);
  });

  it('Testa se os links para a rotas comtém os textos corretos.', () => {
    renderWithRouter(<App />);
    const linksApp = screen.getAllByRole('link');
    expect(linksApp[0].textContent).toBe('Home');
    expect(linksApp[1].textContent).toBe('About');
    expect(linksApp[2].textContent).toBe('Favorite Pokémon');
    expect(linksApp[3].textContent).toBe('More details');
  });

  it('Testa se a aplicação é redirecionada para as rotas corretas conforme o click nos links de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const linksApp = screen.getAllByRole('link');
    userEvent.click(linksApp[3]);
    expect(history.location.pathname).toEqual('/pokemon/25');
    userEvent.click(linksApp[1]);
    expect(history.location.pathname).toEqual('/about');
    userEvent.click(linksApp[0]);
    expect(history.location.pathname).toEqual('/');
    userEvent.click(linksApp[2]);
    expect(history.location.pathname).toEqual('/favorites');
  });

  it('Testa se a aplicação renderiza a pagina NotFound caso a url seja inválida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/dd');
    });

    const textNotFound = screen.getByText('Page requested not found');
    expect(textNotFound).toBeInTheDocument();
  });
});
