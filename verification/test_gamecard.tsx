import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "../app/GameCard";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock store
vi.mock("../app/store", () => ({
  useThemeStore: () => ({
    favorites: [],
    toggleFavorite: vi.fn(),
  }),
}));

// Mock icons
vi.mock("lucide-react", () => ({
  Play: () => <svg data-testid="play-icon" />,
  Star: () => <svg data-testid="star-icon" />,
}));

test("GameCard accessibility attributes", () => {
  const mockGame = {
    id: "test-game",
    title: "Test Game",
    category: "Action",
    color: "bg-red-500",
    icon: <span>Icon</span>,
    description: "A test game",
  };

  render(
    <BrowserRouter>
      <GameCard {...mockGame} />
    </BrowserRouter>
  );

  // Check Play button label
  const playButton = screen.getByLabelText("Play Test Game");
  expect(playButton).toBeInTheDocument();

  // Check Favorite button label
  const favButton = screen.getByLabelText("Add to favorites");
  expect(favButton).toBeInTheDocument();
  expect(favButton).toHaveAttribute("aria-pressed", "false");
});
