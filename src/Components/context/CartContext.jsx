import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

// create context
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // get token from AuthContext
  const { token } = useContext(AuthContext);

  // cart states
  const [numOfItemCart, setNumOfItemCart] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const [totalPriceCart, setTotalPriceCart] = useState(0);

  // wish states
  const [productsWish, setProductsWish] = useState(null);

// payment states
const [cartId, setCartId] = useState(0)





  // add to cart
  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getUserCart();
      return data;
    } catch (error) {
      console.log(error, "error from add cart");
    }
  }
  // get from cart
  async function getUserCart() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItemCart(data.numOfCartItems);
      setProductsCart(data.data.products);
      setTotalPriceCart(data.data.totalCartPrice);
      setCartId(data.data._id)
      return data;
    } catch (error) {
      console.log(error, "error from get cart");
    }
  }

  // updat count of product in cart
  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem(`tkn`),
          },
        }
      );
      setNumOfItemCart(data.numOfCartItems);
      setProductsCart(data.data.products);
      setTotalPriceCart(data.data.totalCartPrice);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      console.log(error, "error update count");
    }
  }

  // Remove specific cart Item
  async function deleteProductfromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem(`tkn`),
          },
        }
      );
      setNumOfItemCart(data.numOfCartItems);
      setProductsCart(data.data.products);
      setTotalPriceCart(data.data.totalCartPrice);
      setCartId(data.data._id);
      return data
    } catch (error) {
      console.log(error, "error form delete product");
    }
  }


  // Remove all cart Item
  async function deleteAllProductfromCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem(`tkn`),
          },
        }
      );
      setNumOfItemCart(0);
      setProductsCart([]);
      setTotalPriceCart(0);
      return data
    } catch (error) {
      console.log(error, "error form delete product");
    }
  }





  // add to wishList
  async function addProductToWish(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem(`tkn`),
          },
        }
      );

      getUserWish();
      return data;
    } catch (error) {
      console.log(error, "error from add wish");
    }
  }

  // get from wishList
  async function getUserWish() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: localStorage.getItem(`tkn`),
          },
        }
      );

      setProductsWish(data.data);
      return data;
    } catch (error) {
      console.log(error, "error from add wish");
    }
  }

  // Remove specific Wish Item
  async function deleteProductfromWish(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem(`tkn`),
          },
        }
      );
      setProductsWish(data.data);
      return data
    } catch (error) {
      console.log(error, "error form delete product");
    }
  }



  useEffect(
    function () {
      if (token != null) {
        getUserCart();
        getUserWish();
      }
    },
    [token]
  );

  return (
    // share data
    <CartContext.Provider
      value={{
        addProductToCart,
        addProductToWish,
        productsCart,
        productsWish,
        numOfItemCart,
        totalPriceCart,
        updateCount,
        deleteProductfromCart,
        deleteProductfromWish,
        deleteAllProductfromCart,
        cartId,
        setNumOfItemCart,
        setProductsCart,
        setTotalPriceCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
