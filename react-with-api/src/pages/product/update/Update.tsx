import { useEffect, useState } from "react";
import { Product } from "../../../types/Type";
import { useNavigate, useParams } from "react-router-dom";
import { useProductID } from "../../../features/product";
import { useUpdateProduct } from "../../../features/product";
import { useFormik } from "formik";
import { useCategory } from "../../../features/category";
export default function Update() {
  // const [massage, setMassage] = useState<string>("");
  // const { id } = useParams();
  // const { product } = useProductID(id!) as { product: Product | null; };
  // const { updateProduct } = useUpdateProduct();
  // const [updateProductData, setUpdateProductData] = useState<Product>({
  //   name: "",
  //   price: 0,
  //   category: "",
  //   description: "",
  //   image: ""
  // });

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (product) {
  //     setUpdateProductData(product);
  //   }
  // }, [product]);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUpdateProductData((prev) => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };


  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await updateProduct({ ...updateProductData, price: Number(updateProductData.price) });
  //   console.log(updateProductData);
  //   navigate('/product')
  // }

const navigate = useNavigate();
const { updateProduct } = useUpdateProduct();
const { id } = useParams();

const { product } = useProductID(id!);
const { data } = useCategory(10, 1);

const formik = useFormik({
  initialValues: {
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
  },
  onSubmit: values => {
    if (id) {
      updateProduct({ ...values, id: id }); // Mengirim ID produk bersama dengan data lainnya
      formik.resetForm();
      navigate('/product');
      console.log(values);
    } else {
      console.error("Product ID is missing");
    }
  },
});


useEffect(() => {
  if (product) {
    formik.setValues({
      name: product.name ?? '',
      price: product.price ?? 0,
      category: product.category.name ?? '',
      description: product.description ?? '',
      image: product.image ?? '',
    });
  }
}, [product]);

const renderCategories = () => {
  if (data) {
    return data?.data?.categories.map((category: Category, index: number) => {
      return <option key={index} value={category.id}>{category.name}</option>
    })
  }
}

return (
  <div className="max-w-lg mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Update Product</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name ?? ''}
          type="text"
          id="productName"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price ?? 0}
          type="number"
          id="price"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            id="category"
            onChange={formik.handleChange}
            value={formik.values.category_id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {renderCategories()}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description ?? ''}
          id="description"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
        <input
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image ?? ''}
          type="text"
          id="image"
          className="mt-1 block w-full text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Update Product
      </button>
    </form>
  </div>
);


}
