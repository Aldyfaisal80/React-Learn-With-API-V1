// import { useState } from "react";
// import { Product } from "../../types/Type";


// export const useCreateProduct = () => {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [message, setMessage] = useState<string>('');
//   const [pending, setPending] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const createProduct = async (data: Product) => {
//     console.log(data)
//     try {
//       const response = await fetch('http://localhost:2334/products?key=aldypanteq', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
//       setMessage(result.message);
//       setProduct(result.data);  
//     } catch (error) {
//       setMessage('Failed to create product');
//     }
//   };

//   return {product, message, error, createProduct };
// };

import { useState } from "react";
import axiosIntance from "../../libs/axios";
import { Product, ProductsResponse } from "../../types/Type";

export const useCreateProduct = (): ProductsResponse => {

  const [state, setState] = useState<Omit<ProductsResponse, 'createProduct'>>({
    product: null,
    loading: false,
    error: null,
    message: '',
    status: '',
  })

  const createProduct = async (data: Product) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const response = await axiosIntance.post('/products', data)
      setState({
        product: response.data.data,
        loading: false,
        error: null,
        message: response.data.message,
        status: response.data.status
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error : new Error('An unknown error occurred'),
      }))
    }
  }

  return {
    ...state,
    createProduct
  }
}