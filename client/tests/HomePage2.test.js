import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../src/components/HomePage/HomePage';

// Mockowanie funkcji fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ first_name: 'John' }]),
  })
);

describe('HomePage Component', () => {
  it('renders user name on the home page', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Oczekiwanie na pobranie danych użytkownika
    const userNameElement = await screen.findByText(/Witaj .*, w Twoim prywatnym uczniowskim dzienniczku/);

    // Sprawdzenie, czy imię użytkownika jest wyświetlane na stronie
    expect(userNameElement).toBeInTheDocument();
  });

  // Dodaj więcej testów w zależności od potrzeb
});
