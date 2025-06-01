// src/tests/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(), // mock de la fonction login
  }),
}));

describe('Login', () => {
  test('affiche le formulaire de login et gère l\'envoi', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /se connecter/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Ajoute ici des assertions si besoin (ex: expect login to have been called)
  });
});
