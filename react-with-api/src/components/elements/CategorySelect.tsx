import React, { useState, useEffect } from "react";

interface ApiResponse {
  status: string;
  message: string;
  data: {
    products: {
      id: string;
      name: string;
      price: number;
      category: string;
      description: string;
      image: string;
    }[];
    total: number;
    page: number;
    limit: number;
  };
}

interface CategorySelectProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ handleChange }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:2334/products?key=aldypanteq"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();

        // Check if data and products exist before accessing them
        if (data && data.data && Array.isArray(data.data.products)) {
          // Extract unique categories
          const uniqueCategories = [...new Set(data.data.products.map(product => product.category))];
          setCategories(uniqueCategories);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        name="category"
        id="category"
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
