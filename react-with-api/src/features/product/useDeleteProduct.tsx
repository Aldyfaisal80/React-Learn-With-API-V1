import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../types/Type";
import Swal from "sweetalert2";
import axiosIntance from "../../libs/axios";

export const useDeleteProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosIntance(`products/${id}`);
        if (response.status !== 404) {
          Error('Failed to fetch product');
        }
        setProduct(response.data.data);
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
          const response = await axiosIntance.delete(`products/${id}`);
          if (response.status !== 200) {
            throw new Error('Failed to delete product');
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          }).then(() => {
            navigate('/product');
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


  if (!product) return <div className="container mx-auto p-6">Loading...</div>;

  return { product, deleteProduct }
}
