import { useFormik } from "formik";
import { useCreateCategory } from "../../../features/category";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const {createCategory} = useCreateCategory()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      data: {}
    },
    onSubmit: values => {
      createCategory(values)
      formik.resetForm()
      navigate('/product')
    },
  });
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            name="name"
            type="text"
            id="name"
            onChange={formik.handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Category
        </button>
      </form>
    </div>
  );
}
