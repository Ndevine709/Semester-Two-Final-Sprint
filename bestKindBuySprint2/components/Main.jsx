// Final Sprint - Laura Wiseman, Noah Devine, Christopher Meadus
// E-commerce Website for our final sprint
// Due: December 15th, 2024

import {
  SlArrowLeft,
  SlArrowRight,
  SlArrowDown,
  SlArrowUp,
} from "react-icons/sl";
import React, { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [currentIndex, setCurrentIndex] = useState(0); // State to track carousel index
  const visibleCount = 4; // Number of products visible in the carousel
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Navigate to the previous set of products
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? products.length - visibleCount
        : prevIndex - visibleCount
    );
  };

  // Navigate to the next set of products
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= products.length ? 0 : prevIndex + visibleCount
    );
  };

  const handleViewDetails = (id) => {
    const product = products.find((product) => product.id === id); // Find the product by ID
    setSelectedProduct(product);
    navigate("/product-info", { state: { productId: id } });
  };

  // Add to Cart function
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

  // ref for categories
  const sectionRefs = useRef({
    computers: null,
    tv: null,
    headphones: null,
    tablets: null,
    phones: null,
    speakers: null,
  });

  const handleScrollToSection = (category) => {
    console.log("Scrolling to:", category);
    sectionRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
  };

  const [openSections, setOpenSections] = useState({
    computers: true,
    tv: true,
    headphones: true,
    tablets: true,
    phones: true,
    speakers: true,
  });

  const onToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <div data-testid="Home" className={styles.boxMain}>
        <h1>Shop Deals</h1>
        <p className={styles.p}>Get them while supplies last!</p>

        <div
          className={styles.carouselBtnTwo}
          onClick={() => handleScrollToSection("computers")}
        >
          Shop Now
        </div>

        <button className={styles.arrowLeft} onClick={handlePrev}>
          <SlArrowLeft className={styles.arrow} />
        </button>
        <div className={styles.carouselBox}>
          <div className={styles.carouselInner}>
            {products.length > 0 ? (
              products
                .slice(currentIndex, currentIndex + visibleCount)
                .map((product) => (
                  <div className={styles.carouselCard} key={product.id}>
                    <img
                      src={product.url}
                      alt={product.productName}
                      className={styles.carouselImage}
                    />
                    <h3>{product.productName}</h3>
                    <div
                      className={styles.carouselBtn}
                      onClick={() => handleViewDetails(product.id)}
                    >
                      See More
                    </div>
                  </div>
                ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </div>
        <button className={styles.arrowRight} onClick={handleNext}>
          <SlArrowRight className={styles.arrow} />
        </button>
      </div>

      <div className={styles.boxMainTwo}>
        <div className={styles.category}>
          <img
            src="./images/pearbookgrid.jpg"
            alt="pearbook"
            onClick={() => handleScrollToSection("computers")}
          />
          <a
            href="#category1"
            className={styles.categoryTitle}
            onClick={() => handleScrollToSection("computers")}
          >
            Computers
          </a>
        </div>
        <div
          onClick={() => handleScrollToSection("tv")}
          className={styles.category}
        >
          <img src="./images/tvgrid.jpg" alt="tv" />
          <a href="#category2" className={styles.categoryTitle}>
            TV
          </a>
        </div>
        <div className={styles.category}>
          <img
            src="./images/headphonesgrid.jpg"
            alt="headphones"
            onClick={() => handleScrollToSection("headphones")}
          />
          <a
            href="#category3"
            className={styles.categoryTitle}
            onClick={() => handleScrollToSection("headphones")}
          >
            Headphones
          </a>
        </div>
        <div className={styles.category}>
          <img
            src="./images/tabletgrid.jpg"
            alt="tablet"
            onClick={() => handleScrollToSection("tablets")}
          />
          <a
            href="#category4"
            className={styles.categoryTitle}
            onClick={() => handleScrollToSection("tablets")}
          >
            Tablets
          </a>
        </div>
        <div className={styles.category}>
          <img
            src="./images/phonegrid.jpg"
            alt="phone"
            onClick={() => handleScrollToSection("phones")}
          />
          <a
            href="#category5"
            className={styles.categoryTitle}
            onClick={() => handleScrollToSection("phones")}
          >
            Phones
          </a>
        </div>
        <div className={styles.category}>
          <img
            src="./images/speakergrid.jpg"
            alt="speaker"
            onClick={() => handleScrollToSection("speakers")}
          />
          <a
            href="#category6"
            className={styles.categoryTitle}
            onClick={() => handleScrollToSection("speakers")}
          >
            Speakers
          </a>
        </div>
      </div>

      <div className={styles.boxMainThree}>
        <div
          ref={(el) => (sectionRefs.current.computers = el)}
          className={styles.productCard}
        >
          <h3 onClick={() => onToggle("computers")}>
            Computers
            <div className={styles.arrowContainer}>
              {openSections.computers ? (
                <SlArrowUp className={styles.downArrow} />
              ) : (
                <SlArrowDown className={styles.downArrow} />
              )}
            </div>
          </h3>
          <hr />
          {openSections.computers && (
            <div data-testid="box-1">
              {products.length > 0 &&
                products
                  .filter((product) => product.id === "1" || product.id === "8")
                  .map((product) => (
                    <div key={product.id} className={styles.productDetails}>
                      <img src={product.url} alt={product.productName} />
                      <div className={styles.productDetailsText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>

                        <button
                          className={styles.viewDetailsBtn}
                          onClick={() => handleViewDetails(product.id)}
                        >
                          View Details
                        </button>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>

        <div
          ref={(el) => (sectionRefs.current.tv = el)}
          className={styles.productCard}
        >
          <h3 onClick={() => onToggle("tv")}>
            TV
            <div className={styles.arrowContainer}>
              {openSections.tv ? (
                <SlArrowUp className={styles.downArrow} />
              ) : (
                <SlArrowDown className={styles.downArrow} />
              )}
            </div>
          </h3>
          <hr />
          {openSections.tv && (
            <div data-testid="box-2">
              {products.length > 0 &&
                products
                  .filter(
                    (product) => product.id === "5" || product.id === "10"
                  )
                  .map((product) => (
                    <div key={product.id} className={styles.productDetails}>
                      <img src={product.url} alt={product.productName} />
                      <div className={styles.productDetailsText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>

                        <button
                          className={styles.viewDetailsBtn}
                          onClick={() => handleViewDetails(product.id)}
                        >
                          View Details
                        </button>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div
          ref={(el) => (sectionRefs.current.headphones = el)}
          className={styles.productCard}
        >
          <h3 onClick={() => onToggle("headphones")}>
            Headphones
            <div className={styles.arrowContainer}>
              {openSections.headphones ? (
                <SlArrowUp className={styles.downArrow} />
              ) : (
                <SlArrowDown className={styles.downArrow} />
              )}
            </div>
          </h3>
          <hr />
          {openSections.headphones && (
            <div data-testid="box-3">
              {products.length > 0 &&
                products
                  .filter((product) => product.id === "3" || product.id === "6") // Filter for the specific product by ID
                  .map((product) => (
                    <div key={product.id} className={styles.productDetails}>
                      <img src={product.url} alt={product.productName} />
                      <div className={styles.productDetailsText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>

                        <button
                          className={styles.viewDetailsBtn}
                          onClick={() => handleViewDetails(product.id)} // Pass the product ID
                        >
                          View Details
                        </button>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>

        <div
          ref={(el) => (sectionRefs.current.tablets = el)}
          className={styles.productCard}
        >
          <h3 onClick={() => onToggle("tablets")}>
            Tablets
            <div className={styles.arrowContainer}>
              {openSections.tablets ? (
                <SlArrowUp className={styles.downArrow} />
              ) : (
                <SlArrowDown className={styles.downArrow} />
              )}
            </div>
          </h3>
          <hr />
          {openSections.tablets && (
            <div data-testid="box-4">
              {products.length > 0 &&
                products
                  .filter(
                    (product) => product.id === "4" || product.id === "11"
                  ) // Filter for the specific product by ID
                  .map((product) => (
                    <div key={product.id} className={styles.productDetails}>
                      <img src={product.url} alt={product.productName} />
                      <div className={styles.productDetailsText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>

                        <button
                          className={styles.viewDetailsBtn}
                          onClick={() => handleViewDetails(product.id)} // Pass the product ID
                        >
                          View Details
                        </button>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>

        <div
          ref={(el) => (sectionRefs.current.phones = el)}
          className={styles.productCard}
        >
          <h3 onClick={() => onToggle("phones")}>
            Phones
            <div className={styles.arrowContainer}>
              {openSections.phones ? (
                <SlArrowUp className={styles.downArrow} />
              ) : (
                <SlArrowDown className={styles.downArrow} />
              )}
            </div>
          </h3>
          <hr />
          {openSections.phones && (
            <div data-testid="box-5">
              {products.length > 0 &&
                products
                  .filter((product) => product.id === "2" || product.id === "9") // Filter for the specific product by ID
                  .map((product) => (
                    <div key={product.id} className={styles.productDetails}>
                      <img src={product.url} alt={product.productName} />
                      <div className={styles.productDetailsText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>

                        <button
                          className={styles.viewDetailsBtn}
                          onClick={() => handleViewDetails(product.id)} // Pass the product ID
                        >
                          View Details
                        </button>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
        <div
          ref={(el) => (sectionRefs.current.speakers = el)}
          className={styles.productCard}
        >
          <h3 onClick={() => onToggle("speakers")}>
            Speakers
            <div className={styles.arrowContainer}>
              {openSections.speakers ? (
                <SlArrowUp className={styles.downArrow} />
              ) : (
                <SlArrowDown className={styles.downArrow} />
              )}
            </div>
          </h3>
          <hr />
          {openSections.speakers && (
            <div data-testid="box-6">
              {products.length > 0 &&
                products
                  .filter(
                    (product) => product.id === "7" || product.id === "12"
                  ) // Filter for the specific product by ID
                  .map((product) => (
                    <div key={product.id} className={styles.productDetails}>
                      <img src={product.url} alt={product.productName} />
                      <div className={styles.productDetailsText}>
                        <h2>{product.productName}</h2>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>

                        <button
                          className={styles.viewDetailsBtn}
                          onClick={() => handleViewDetails(product.id)} // Pass the product ID
                        >
                          View Details
                        </button>
                        <button
                          className={styles.addBtn}
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
