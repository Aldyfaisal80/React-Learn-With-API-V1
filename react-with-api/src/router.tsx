import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductIndex from "./pages/product/ProductIndex";
import CreateProduct from "./pages/product/create/Create";
import Update from "./pages/product/update/Update";
import Detail from "./pages/product/detail/Detail";
import MainLayouts from "./components/layouts/MainLayouts";
import CategoryIndex from "./pages/category/CategoryIndex";
import CreateCategory from "./pages/category/create/CreateCategory";
import UpdateCategory from "./pages/category/update/UpdateCategory";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "product",
                children: [
                    {
                        index: true,
                        element: <ProductIndex />,
                    },
                    {
                        path: "detail/:id",
                        element: <Detail />,
                    },
                    {
                        path: "update/:id",
                        element: <Update />,
                    },
                    {
                        path: "create-product",
                        element: <CreateProduct />,
                        children: [
                            {
                                path: "create-category",
                                element: <CreateCategory />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "category",
                children: [
                    {
                        index: true,
                        element: <CategoryIndex />,
                    },
                    {
                        path: "create-category",
                        element: <CreateCategory />,
                    },
                    {
                        path: "update-category",
                        element: <UpdateCategory />,
                    },
                ],
            }
        ],
    },
]);
