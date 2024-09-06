import { useCreateProduct } from "../../../features/product";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useCategory } from "../../../features/category";
import { Category } from "../../../types/Type";

// import CategorySelect from "../../../components/elements/CategorySelect";

export default function Create() {
  const { createProduct } = useCreateProduct();
  const navigate = useNavigate()

  const { data } = useCategory(50, 1);
  console.log(data?.data?.categories)

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category_id:"",
      description: "",
      image: ""
    },
    onSubmit: values => {
      createProduct(values);
      navigate('/product')
      console.log(values)
    },
  });

  const renderCategories = () => {
    if (data) {
      return data?.data?.categories.map((category: Category, index: number) => {
        return <option key={index} value={category.id}>{category.name}</option>
      })
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            name="name"
            type="text"
            id="productName"
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            name="price"
            type="number"
            id="price"
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            id="category"
            onChange={formik.handleChange}
            value={formik.values.category_id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Option</option>
            {renderCategories()}
          </select>
          <Link to="/product/create-category" className="text-blue-500 hover:text-blue-700 hover:underline transition-all hover:ease-in-out">Need to create a category ... ?</Link>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            name="image"
            type="text"
            id="image"
            onChange={formik.handleChange}
            className="mt-1 block w-full text-gray-700"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Product
        </button>
      </form>
    </div>
  );
}
