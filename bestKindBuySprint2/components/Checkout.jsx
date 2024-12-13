// Final Sprint - Noah Devine, Laura Wiseman, Christopher Meadus
// E-commerce Website
// Due: December 15th, 2024
import styles from "./checkout.module.css";
import { useState, useEffect } from "react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  // useState to store shipping info from the form.
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });
  // useState to store payment info from the form.
  const [payment, setPayment] = useState({
    name: "",
    address: "",
    cardNumber: "",
    cvcCode: "",
    expiryDate: "",
  });

  useEffect(() => {
    // Fetch cart items from json Server.
    fetch("http://localhost:5001/cart")
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const calcSubtotal = () => {
    // Calculate the subtotal for the cart.
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const HST = (subtotal) => {
    // Calculate the HST.
    let rate = 0.15;
    return subtotal * rate;
  };

  const subtotal = calcSubtotal();
  const hst = HST(subtotal);
  // Calculate our total cost.
  const finalTotal = subtotal + hst;
  // handle form submission and set the form values back to empty while also displaying a basic message on submission.
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      "Order has been submitted, thank you for shopping with BestKind Buy!"
    );
    setShipping({
      name: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    });
    setPayment({
      name: "",
      address: "",
      cardNumber: "",
      cvcCode: "",
      expiryDate: "",
    });
  };
  // Handle changes for the shipping form inputs.
  const handleShipping = (event) => {
    const { name, value } = event.target;
    setShipping((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle changes for the payment form inputs.
  const handlePayment = (event) => {
    const { name, value } = event.target;
    setPayment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Setting up everything needed for the page. Summary box, two forms and submission button.
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.sumBox}>
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
            {cartItems.map((item) => (
              <div key={item.id} className={styles.details}>
                <p className={styles.pstyles2}>
                  <span className={styles.lalign2}>{item.productName}</span>{" "}
                  <span className={styles.ralign2}>Qty:{item.qty}</span>
                </p>
                <hr className={styles.halign2} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bcontainer}>
        <div className={styles.fcontainer}>
          <form className={styles.fstyle} onSubmit={handleSubmit}>
            <h2 className={styles.h2style}>Shipping Information</h2>
            <hr width="60%" className={styles.halign} />
            <label>
              <span className={styles.lalign2}>Customer Name:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name.."
                  value={shipping.name}
                  onChange={handleShipping}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>Address:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address.."
                  value={shipping.address}
                  onChange={handleShipping}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>City:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="city"
                  placeholder=" City.."
                  value={shipping.city}
                  onChange={handleShipping}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>Postal Code:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code..."
                  value={shipping.postalCode}
                  onChange={handleShipping}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>Phone Number:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number.."
                  value={shipping.phoneNumber}
                  onChange={handleShipping}
                />
              </span>
            </label>
          </form>
          <form className={styles.fstyle} onSubmit={handleSubmit}>
            <h2 className={styles.h2style}>Payment Information</h2>
            <hr width="60%" className={styles.halign} />
            <label>
              <span className={styles.lalign2}>Customer Name:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name..."
                  value={payment.name}
                  onChange={handlePayment}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>Address:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address.."
                  value={payment.address}
                  onChange={handlePayment}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>Card Number:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="CC Number.."
                  value={payment.cardNumber}
                  onChange={handlePayment}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>CVC Code:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="cvcCode"
                  placeholder="CVC.."
                  value={payment.cvcCode}
                  onChange={handlePayment}
                />
              </span>
            </label>
            <label>
              <span className={styles.lalign2}>Expiry Date:</span>{" "}
              <span className={styles.ralign2}>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Exp Date.."
                  value={payment.expiryDate}
                  onChange={handlePayment}
                />
              </span>
            </label>
          </form>
        </div>
        <button className={styles.buttonStyle} onClick={handleSubmit}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
