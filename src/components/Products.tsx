import { product } from "@/types/component.types";
import { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

function Products() {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    const [filterButton, setFilterButton] = useState(false)

    const [addedProduct, setAddedProduct] = useState(null)

    const toggleFilterButton = () => {
        setFilterButton(!filterButton)
    }

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (products.length === 0) {
        getApi();
    }

    const handleCategoryChange = (e: any) => {
        setCategory(e.target.value);
    };

    const filteredProducts = category ? products.filter((product: product) => category === product.category) : products;

    const { cart, setCart }: any = useContext(CartContext)

    return (
        <section>
            <h1 className="font-bold text-black text-4xl text-center mt-11">Products</h1>
            <div className="flex justify-end items-center mt-1 mb-5">
                <button className="mr-5" onClick={toggleFilterButton}>
                    <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 6l8 0" />
                        <path d="M16 6l4 0" />
                        <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 12l2 0" />
                        <path d="M10 12l10 0" />
                        <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 18l11 0" />
                        <path d="M19 18l1 0" />
                    </svg>
                </button>
            </div>

            {filterButton === true && (
                <div className="absolute right-0 mr-6 z-10">
                    <div className="w-72 rounded border border-gray-200 bg-white">
                        <h3 className="ml-3 font-bold pt-3">Category</h3>
                        <ul className="space-y-1 p-4">
                            <li>
                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                    <input value="" type="checkbox" id="FilterInStock" onChange={handleCategoryChange} checked={category === ""} className="h-5 w-5 rounded border-gray-300" />

                                    <span className="text-sm font-medium text-gray-700"> All Categories </span>
                                </label>
                            </li>

                            <li>
                                <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                    <input value="women's clothing" type="checkbox" id="FilterInStock" checked={category === "women's clothing"} onChange={handleCategoryChange} className="h-5 w-5 rounded border-gray-300" />

                                    <span className="text-sm font-medium text-gray-700"> Women's Clothes </span>
                                </label>
                            </li>

                            <li>
                                <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                    <input
                                        value="men's clothing"
                                        type="checkbox"
                                        id="FilterPreOrder"
                                        checked={category === "men's clothing"}
                                        className="h-5 w-5 rounded border-gray-300"
                                        onChange={handleCategoryChange}
                                    />

                                    <span className="text-sm font-medium text-gray-700"> Men's Clothes </span>
                                </label>
                            </li>

                            <li>
                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                    <input
                                        value="jewelery"
                                        type="checkbox"
                                        id="FilterOutOfStock"
                                        checked={category === "jewelery"}
                                        onChange={handleCategoryChange}
                                        className="h-5 w-5 rounded border-gray-300"
                                    />

                                    <span className="text-sm font-medium text-gray-700">Jewelery</span>
                                </label>
                            </li>

                            <li>
                                <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                    <input
                                        value="electronics"
                                        type="checkbox"
                                        id="FilterOutOfStock"
                                        checked={category === "electronics"}
                                        onChange={handleCategoryChange}
                                        className="h-5 w-5 rounded border-gray-300"
                                    />

                                    <span className="text-sm font-medium text-gray-700"> Electronics </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <ul className="z-0 relative mt-8 mx-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product: product, index: number) => (
                    <li key={index} className="mb-7 flex flex-col">
                        <Link href={`/store/products/${product.title}`} className="group block overflow-hidden flex-1">
                            <Image
                                width={500}
                                height={500}
                                src={product.image}
                                alt="product"
                                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                            />

                            <div className="relative bg-white pt-3">
                                <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                    {product.title}
                                </h3>

                                <p className="mt-2">
                                    <span className="sr-only"> Regular Price </span>

                                    <span className="tracking-wider text-gray-900"> ${product.price.toString()} </span>
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={(e) => setCart(
                                {
                                    products: [...cart.products, product],
                                    price: cart.price + product.price
                                },
                                //@ts-ignore
                                setAddedProduct(index),
                                setTimeout(() => {
                                    setAddedProduct(null)
                                }, 2500),
                                e.preventDefault()
                            )}
                            type="button"
                            className="block w-full rounded bg-zinc-200 p-4 text-sm font-medium transition hover:scale-105 duration-300 mt-4"
                        >
                            Add Product
                        </button>
                        {addedProduct === index && (
                            <div className="px-4 py-3 mt-3 leading-normal text-green-700 bg-green-300 rounded-lg" role="alert">
                                <p>Product was added successfully</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Products

