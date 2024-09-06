import { useEffect, useState } from "react";
import { Product } from "../../types/Type";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/elements/Pagination";
import axiosIntance from "../../libs/axios";

export default function CategoryIndex() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [limit] = useState<number>(12);
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
                    `/products?limit=${limit}&page=${page}`);
                if (response.status !== 200) {
                    console.log(response);
                    throw new Error("Failed to fetch products");
                }
                const result = response.data;
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


    const renderCards = () =>
        products?.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4">
                    <img src="https://placehold.co/600x400" alt="" className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{product.category.name}</p>
                    <p className="text-base font-semibold text-white mb-4">{formatToIDR(product.price)}</p>
                    <div className="flex justify-end space-x-2">
                        <Link
                            to={`product/detail/${product.id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            Detail
                        </Link>
                        <Link
                            to={`product/update/${product.id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        ));

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
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                            {renderCards()}
                        </div>
                    )}
                    <div className="flex justify-center py-6 bg-gray-800 dark:text-white">
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