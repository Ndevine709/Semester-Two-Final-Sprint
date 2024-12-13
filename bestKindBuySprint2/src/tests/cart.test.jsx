import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Cart from "../../components/Cart";
import { MemoryRouter } from "react-router-dom";

global.fetch = vi.fn();

afterEach(() => {
  vi.restoreAllMocks();
});

// Mock cart data
const mockCartData = [
  {
    id: 1,
    productName: "PearBook - 13\" Silver",
    qty: 1,
    price: 999.99,
    url: "/path/to/image",
  },
];

test("removes item from cart", async () => {
  // Mock fetch responses
  fetch.mockImplementation((url, options) => {
    if (options && options.method === "DELETE") {
      return Promise.resolve({ ok: true });
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockCartData),
    });
  });

  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

  const removeButton = await screen.findByText("Remove");

  fireEvent.click(removeButton);

  await waitFor(() => {
    const remainingRemoveButtons = screen.queryByText("Remove");
    expect(remainingRemoveButtons).toBeNull();
  });
});

test("displays empty cart message when cart is empty", async () => {
  fetch.mockImplementation((url) =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

  const emptyMessage = await screen.findByText("Your cart is empty");
  expect(emptyMessage).toBeTruthy();
});
