import { useState } from "react";
import { Product } from "../../types/Type";
import axiosIntance from "../../libs/axios";

export const useUpdateProduct = () => {
  const [product, setProduct] = useState<Product>();
  const [pending, setPending] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const updateProduct = async (data: Product) => {
    try {
      setPending(true);
      setError(null);

      // Periksa apakah ID produk ada sebelum melanjutkan
      if (!data.id) {
        throw new Error("Product ID is required for updating.");
      }

      // Lakukan request PUT dengan mengirim data produk
      const response = await axiosIntance.put(`/products/${data.id}`, data);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Set state jika update berhasil
      setProduct(response.data);
      setStatus(`${response.status}`);
      setMessage(`${response.statusText}`);
    } catch (err) {
      // Set error jika ada kesalahan
      setError(err instanceof Error ? err : new Error("Something went wrong"));
    } finally {
      // Set pending menjadi false setelah request selesai
      setPending(false);
    }
  }

  return { updateProduct, product, pending, error, status, message };
}
