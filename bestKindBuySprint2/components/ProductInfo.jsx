// Final Sprint - Christopher Meadus, Laura Wiseman, Noah Devine
// E-commerce Website for our final sprint
// Due: December 15th, 2024

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./productInfo.module.css";
import productsData from "../db.json";

const ProductInfo = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (state && state.productId) {
      const selectedProduct = productsData.products.find(
        (p) => p.id === state.productId
      );
      setProduct(selectedProduct);
    }
  }, [state]);

  // Scroll to top whenever the product changes
  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
    }
  }, [product]);

  const addToCart = async (product) => {
    try {
      const cartRes = await fetch("http://localhost:5001/cart");
      const cartData = await cartRes.json();

      // Check if the product is already in the cart
      const existingItem = cartData.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };

        const updateRes = await fetch(
          `http://localhost:5001/cart/${existingItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          }
        );

        if (updateRes.ok) {
          alert("Product quantity updated in cart!");
        } else {
          alert("Failed to update product quantity in cart.");
        }
      } else {
        // Product not in cart, add it with qty = 1
        const newItem = { ...product, qty: 1 };

        const response = await fetch("http://localhost:5001/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          alert("Product added to cart successfully!");
        } else {
          alert("Failed to add product to cart.");
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className={styles.main}>
      <div
        className={styles.productimage}
        style={{ backgroundImage: `url(${product.url})` }}
      ></div>
      <div className={styles.productdesc}>
        <div className={styles.itemname}>
          <h1>{product.productName}</h1>
        </div>
        <div className={styles.itemprice}>
          <h2>${product.price.toFixed(2)}</h2>
        </div>
        <div className={styles.addcart}>
          <div className={styles.deliveryOptions}>
            <button className={styles.deliveryTabActive}>Delivery</button>
            <button className={styles.deliveryTab}>Pick Up</button>
          </div>
          <button
            className={styles.addToCart}
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
        <div className={styles.prodov}>
          <h2>Overview</h2>
          <p>{product.description}</p>
        </div>
      </div>
      <div className={styles.productinfobox}>
        <div className={styles.aboutprod}>
          <h2>About This Product</h2>
          <p>{product.about}</p>
        </div>
        <div className={styles.specprod}>
          <h2>Specifications</h2>
          <ul>
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.questionsprod}>
          <h2>Common Questions</h2>
          <ul>
            {product.commonQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
