import { describe, test, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductInfo from "../../components/ProductInfo";
import "@testing-library/jest-dom/vitest";

// Mock react-router-dom and useLocation
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: { productId: "1" }, // Mock useLocation state
    }),
  };
});

// Mock products data from db.json
vi.mock("../db.json", () => ({
  products: [
    {
      id: "1",
      productName: 'PearBook - 13" Silver',
      description: "A sleek and powerful 13-inch laptop.",
      price: 999.99,
      url: "./images/pearbook1.jpg",
    },
  ],
}));

describe("ProductInfo Component", () => {
  test("renders product name", () => {
    render(
      <MemoryRouter>
        <ProductInfo />
      </MemoryRouter>
    );

    // Check for product name
    const productNameField = screen.getByText('PearBook - 13" Silver');
    expect(productNameField).toBeInTheDocument();
  });

  test("renders product price", () => {
    render(
      <MemoryRouter>
        <ProductInfo />
      </MemoryRouter>
    );

    // Check for product price
    const productPriceField = screen.getByText("$999.99");
    expect(productPriceField).toBeInTheDocument();
  });

  test("renders product description", () => {
    render(
      <MemoryRouter>
        <ProductInfo />
      </MemoryRouter>
    );

    // Check for product description
    const productDescriptionField = screen.getByText(/a sleek and powerful 13-inch laptop/i);
    expect(productDescriptionField).toBeInTheDocument();
  });
});
