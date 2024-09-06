import { useEffect, useState } from "react";
import { type Product } from "../../../types/Type";
import { Link, useParams } from "react-router-dom";
import { useDeleteProduct, useProductID } from "../../../features/product";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const { deleteProduct } = useDeleteProduct() as { product: Product; deleteProduct: () => Promise<void>; };
  const { product: fetchProduct } = useProductID(id!) as { product: Product | null; };

  useEffect(() => {
    if (fetchProduct) {
      setProduct(fetchProduct);
    }
  }, [fetchProduct]);

  
  const handleDelete = async () => {
    if (!product) return;
    await deleteProduct();
  }


  if (!product) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container flex justify-center items-center w-full h-screen mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="">
          <img
            src="https://placehold.co/170x200"
            alt={product.name}
            className="w-[400px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center  ">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-700  mb-4">
            {product.description}
          </p>
          <p className="text-3xl font-semibold text-gray-900 mb-6">
            RP {product.price.toLocaleString('id-ID',)}
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Category
            </h2>
            <p className="text-lg text-gray-700 ">
              {product.category.name}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/product" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              Back to Products
            </Link>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
