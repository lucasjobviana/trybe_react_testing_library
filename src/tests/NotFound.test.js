import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Testando o componente NotFound.', () => {
  it('Testando se existirá na tela um h2 com o texto "Page requested not found".', () => {
    render(<NotFound />);
    screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
  });
  it('Testando se existira na tela uma imagem com o src "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif" ', () => {
    render(<NotFound />);
    expect(screen.getByRole('img').src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
