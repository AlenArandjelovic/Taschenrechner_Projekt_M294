import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test("1. Initialanzeige zeigt 0", () => {
  render(<App />);
  const display = screen.getByRole("heading", { level: 2 });
  expect(display).toHaveTextContent("0");
});

test("2. Klick auf Taste '1' zeigt 1 im Display", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "1" }));
  const display = screen.getByRole("heading", { level: 2 });
  expect(display).toHaveTextContent("1");
});

test("3. Clear-Button setzt Anzeige zurück auf 0", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "2" }));
  fireEvent.click(screen.getByRole("button", { name: "C" }));
  const display = screen.getByRole("heading", { level: 2 });
  expect(display).toHaveTextContent("0");
});

test("4. Addition 1+2 ergibt 3", async () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "1" }));
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  fireEvent.click(screen.getByRole("button", { name: "2" }));
  fireEvent.click(screen.getByRole("button", { name: "=" }));
  const result = await screen.findByRole("heading", { level: 3 });
  expect(result).toHaveTextContent("3");
});

test("5. Ergebnisfeld existiert", () => {
  render(<App />);
  const resultArea = screen.getByRole("heading", { level: 3 });
  expect(resultArea).toBeInTheDocument();
});
