import { useEffect, useState } from "react";
import axiosInstance from "../../libs/axios/index";
import { Category } from "../../types/Type";

interface CategoryState {
    data: {
        categories: Category[] | null;
        total: number;
        totalPages: number;
        page: number;
    } | null;
    loading: boolean;
    error: Error | null;
    message: string;
    status: string;
}

export const useCategory = (limit: number, page: number): CategoryState => {
    const [state, setState] = useState<CategoryState>({
        data: null,
        loading: false,
        error: null,
        message: '',
        status: ''
    });

    useEffect(() => {
        const fetchCategory = async () => {
            setState(prev => ({ ...prev, loading: true }));
            try {
                const response = await axiosInstance.get(`/categories`, {
                    params: { limit, page }
                });
                const totalPages = Math.ceil(response.data.data.total / limit);
                setState({
                    data: { ...response.data, totalPages },
                    loading: false,
                    error: null,
                    message: response.data.message,
                    status: response.data.status
                });
            } catch (err) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: err instanceof Error ? err : new Error('An error occurred while fetching categories'),
                }));
            }
        };

        fetchCategory();
    }, [limit, page]);

    return state;
};