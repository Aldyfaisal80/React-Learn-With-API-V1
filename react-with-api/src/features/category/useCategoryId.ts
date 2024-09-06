import { useEffect, useState } from "react";
import { CreateCategoryResponse } from "../../types/Type";
import axiosInstance from "../../libs/axios";

export const useCategoryID = (id: string) => {
    const [state, setState] = useState<Omit<CreateCategoryResponse, "createCategory">>({
        data: null,
        loading: false,
        error: null,
        message: "",
        status: "",
    })

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axiosInstance.get("/categories")
                setState({
                    data: response.data.data,
                    loading: false,
                    error: null,
                    message: response.data.message,
                    status: response.data.status
                })
            } catch (error) {
                setState(prev => ({ ...prev, loading: false, error: error instanceof Error ? error : new Error("An unknown error occurred") }))
            }
        }

        fetchCategory()
    }, [id])

    return {
        ...state,
    }
}