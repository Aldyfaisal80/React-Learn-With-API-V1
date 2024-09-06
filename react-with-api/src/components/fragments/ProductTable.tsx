import { Link } from "react-router-dom";
import { Product } from "../../types/Type";

export default function ProductTable({product}: {product: Product}) {
    return (
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="p-4">
                    <div className="flex items-center">
                        <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                </td>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4 flex gap-4">
                    <Link
                        to={`detail/${product.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Detail
                    </Link>
                    <Link
                        to={`update/${product.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}
