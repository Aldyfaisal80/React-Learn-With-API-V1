import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../types/Type";
import Swal from "sweetalert2";

export const useDeleteCategory = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:2334/products/${id}?key=aldypanteq`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const result = await response.json();
        setProduct(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:2334/products/${id}?key=aldypanteq`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          }).then(() => {
            navigate('/product'); // Navigate back to the products list
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete the product.",
            icon: "error"
          });
        }
      }
    });
  };


  // if (!product) return <div> className="container mx-auto p-6">Loading...</div>;

  return { product, deleteProduct }
}
