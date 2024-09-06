export type Product = {
  id?: string;
  name: string;
  description: string;
  category_id: string;
  image: string;
  price: number;
  category: Category
};


export type Category = {
  id?: string
  name: string
  description: string
  data: Product[]
}

export type CreateResponse = {
  createCategory: (data: Category) => Promise<void>
  data: Category | null
  loading: boolean
  error: Error | null
  message: string
  status: string
}

export type ProductsResponse = {
  createProduct: (data: Product) => Promise<void>
  product: Product | null
  loading: boolean
  error: Error | null
  message: string
  status: string
}

export type CreateCategoryResponse = {
  createCategory: (data: Category) => Promise<void>
  data: Category | null
  loading: boolean
  error: Error | null
  message: string
  status: string
}

export type UpdateCategoryResponse = {
  updateCategory: (data: Category) => Promise<void>
  data: Category | null
  loading: boolean
  error: Error | null
  message: string
  status: string
}