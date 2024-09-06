import { useEffect, useState } from "react";
import { Product } from "../../types/Type";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/elements/Pagination";
import axiosIntance from "../../libs/axios";

export default function ProductIndex() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosIntance.get(
          `http://localhost:2334/api/v1/products?limit=${limit}&page=${page}`,);
        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.data;
        if (!result.data) {
          navigate(-1);
          return;
        }
        setProducts(result.data.products);
        setTotalPages(Math.ceil(result.data.total / limit));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page, limit, sortBy, sortOrder, navigate]);

  const formatToIDR = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const renderElements = () =>
    products?.map((product) => (
      <tr key={product.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
        <td className="p-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
        </td>
        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
          {product.name}
        </td>
        <td className="px-6 py-4 text-gray-400">{product.category.name}</td>
        <td className="px-6 py-4 text-white">{formatToIDR(product.price)}</td>
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <Link
              to={`detail/${product.id}`}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Detail
            </Link>
            <Link
              to={`update/${product.id}`}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Edit
            </Link>
          </div>
        </td>
      </tr>
    ));
    console.log(products)

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Product List</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 w-64 outline-none"
                  placeholder="Search for items"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSort('name')}
                  className={`px-3 py-1 rounded ${sortBy === 'name' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                  onClick={() => handleSort('price')}
                  className={`px-3 py-1 rounded ${sortBy === 'price' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                      Product Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('price')}>
                      Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderElements()}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex justify-center py-6 bg-gray-800 text-white">
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}