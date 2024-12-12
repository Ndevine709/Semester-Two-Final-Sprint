import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect } from "vitest";
import Cart from "../../components/Cart";
import { MemoryRouter } from "react-router-dom";

// Will actually remove items from the cart within db.json so MAKE SURE CART ITEMS ARE ADDED TO YOUR CART for testing or it will fail.
test("removes item from cart", async () => {
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

  const removeButton = await screen.findAllByText("Remove");

  for (let button of removeButton) {
    fireEvent.click(button);
  }

  await waitFor(() => {
    const remainingRemoveButtons = screen.queryAllByText("Remove");
    expect(remainingRemoveButtons.length === 0);
  });
});

// Checking to see if the empty cart message is displayed when nothing is in the cart
test("displays empty cart message when cart is empty", async () => {
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );
  
   
    const emptyMessage = await screen.findByText('Your cart is empty');
    expect(emptyMessage).toBeTruthy();
  });
