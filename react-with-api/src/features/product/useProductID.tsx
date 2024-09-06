import { useEffect, useState } from "react"
import { Product } from "../../types/Type"
import axiosIntance from "../../libs/axios"


export const useProductID = (id: string) => {
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosIntance(`/products/${id}`)
                setProduct(response.data.data)
            } catch (error) {
                setError(error)
                
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    },[id])
    return { product, loading, error  }
}