// Final Sprint - Noah Devine, Laura Wiseman, Christopher Meadus
// E-commerce Website for our final sprint
// Due: December 15th, 2024
import styles from "./cart.module.css";
import { FaTrashCan } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from json server
    fetch("http://localhost:5001/cart")
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const updateQty = (id, newQty) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    setCartItems(updatedItems);

    const updatedItem = updatedItems.find((item) => item.id === id);

    // Updateing the qty in the json server
    fetch(`http://localhost:5001/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    }).catch((error) => console.error("Error updating qty:", error));
  };

  const removeCartItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);

    // Removing items from the json server
    fetch(`http://localhost:5001/cart/${id}`, {
      method: "DELETE",
    }).catch((error) => console.error("Error removing item:", error));
  };

  // Calculate the subtotal for the cart
  const calcSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  // Calculate the HST
  const HST = (subtotal) => {
    let rate = 0.15;
    return subtotal * rate;
  };

  // Calculate our total cost
  const subtotal = calcSubtotal();
  const hst = HST(subtotal);
  const finalTotal = subtotal + hst;

  // Setting up the cart page, cart items, order summary and bottom buttons to naviagte to the checkout and products page
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        <h1 className={styles.hstyle}>Your Cart</h1>
        <hr width="20%" />
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.containers}>
              <img
                src={item.url}
                alt={item.productName}
                className={styles.images}
              />
              <div className={styles.details}>
                <div>
                  <h2 className={styles.h2style}>{item.productName}</h2>
                  <div className={styles.buttonDsp}>
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className={styles.buttonStyle}
                    >
                      &#8722;
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className={styles.buttonStyle}
                    >
                      &#43;
                    </button>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className={styles.remove}
                    >
                      <FaTrashCan className={styles.icon1} /> Remove
                    </button>
                  </div>
                </div>
                <div className={styles.prices}>
                  <p className={styles.price}>${item.price.toFixed(2)}</p>
                  <span className={styles.plus}>Plus HST</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.summaryCont}>
        {" "}
        <div className={styles.summary}>
          <div className={styles.head}>
            <h2>Order Summary</h2>
            <hr width="60%" className={styles.halign} />
          </div>
          <div className={styles.calcLines}>
            <p className={styles.pstyles}>
              <span className={styles.lalign}>Subtotal:</span>
              <span className={styles.ralign}>${subtotal.toFixed(2)}</span>
            </p>
          </div>
          <div className={styles.calcLines}>
            <p className={styles.pstyles}>
              <span className={styles.lalign}>HST:</span>
              <span className={styles.ralign}>${hst.toFixed(2)}</span>
            </p>
          </div>
          <div className={styles.calcLines}>
            <p className={styles.pstyles}>
              <span className={styles.lalign}>Total:</span>
              <span className={styles.ralign}>${finalTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className={styles.btnBox}>
          <Link to="/checkout" className={styles.btn1}>
            Continue to Checkout
          </Link>

          <button className={styles.btn2}>Back to Products</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
