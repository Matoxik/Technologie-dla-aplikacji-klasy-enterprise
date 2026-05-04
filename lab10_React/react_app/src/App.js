import axios from "axios";
import {useEffect, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products").then((response) => setProducts(response.data.products));
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProductList products={products}/>,
        },
        {
            path: "details/:id",
            element: <ProductDetails products={products}/>,
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
