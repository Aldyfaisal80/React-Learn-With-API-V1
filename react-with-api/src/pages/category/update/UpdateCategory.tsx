import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { useEffect } from "react";
import { useCategory, useCategoryID } from "../../../features/category";

export default function UpdateCategory() {

  // const { data } = useCategory(50, 1);
  // const renderCategories = () => {
  //   if (data) {
  //     return data?.data?.categories.map((category: Category, index: number) => {
  //       return <option className="" key={index} value={category.id}>{category.name}</option>
  //     })
  //   }
  // }

  const { id } = useParams();
  const { data } = useCategoryID(id!);

  useEffect(() => {
    if (data)
      console.log(data)
  }, [data])


  const formik = Formik({
    initialValues: {
      category_id: '',
      description: '',
    },
    onSubmit: values => {
      console.log(values)
    }
  })
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Category</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category_id"
            id="category"
            onChange={formik.handleChange}
            // value={formik.values.category_id}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Option</option>
            {/* {renderCategories()} */}
          </select>
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
          Update Category
        </button>
      </form>
    </div>
  );
}
