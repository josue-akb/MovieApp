import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetails from "../pages/MovieDetails"; // Assure-toi que le chemin est correct
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "../context/FavoritesContext";
import axios from "axios";

// Mock axios
jest.mock("axios");

test("ajouter et retirer un film des favoris", async () => {
  // Simule la réponse de l'API pour un film spécifique
  axios.get.mockResolvedValueOnce({
    data: {
      id: 123,
      title: "Test Movie",
      poster_path: "/test.jpg",
      overview: "Test overview",
      release_date: "2025-05-25",
      vote_average: 8.5,
    },
  });

  render(
    <FavoritesProvider>
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    </FavoritesProvider>
  );

  // Attendre le chargement du film
  expect(await screen.findByText(/Test Movie/i)).toBeInTheDocument();

  // Vérifie qu'un bouton "Ajouter aux favoris" est présent
  const button = screen.getByText(/Ajouter aux favoris/i);
  expect(button).toBeInTheDocument();

  // Simule l'ajout aux favoris
  fireEvent.click(button);

  // Vérifie que le film a été ajouté
  expect(screen.getByText(/Retirer des favoris/i)).toBeInTheDocument();

  // Simule la suppression des favoris
  fireEvent.click(screen.getByText(/Retirer des favoris/i));

  // Vérifie que le bouton "Ajouter aux favoris" est de nouveau présent
  expect(screen.getByText(/Ajouter aux favoris/i)).toBeInTheDocument();
});
