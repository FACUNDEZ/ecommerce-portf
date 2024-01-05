import { useState } from "react";

function Hero2() {
    const [product1, setProduct1] = useState<any>([]);
    const [product2, setProduct2] = useState<any>([]);
    const [product3, setProduct3] = useState<any>([]);

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json();

            const firstProduct = data.find((product: any) => 16 === product.id)
            const secondProduct = data.find((product: any) => 3 === product.id)
            const thirdProduct = data.find((product: any) => 19 === product.id)

            setProduct1(firstProduct);
            setProduct2(secondProduct)
            setProduct3(thirdProduct)
        } catch (error) {
            console.log(error);
        }
    };

    getApi();

    return (
        <section className='mt-20 mb-5'>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900">New Products</h2>

                    <p className="mx-auto mt-4 pb-2 text-xl text-gray-500">
                        Check and enjoy the best and new products with the better prices than you have seen!  
                    </p>
                </header>

                <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <li>
                        <a href="#" className="group relative block">
                            <img
                                src={product1.image}
                                alt="product"
                                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                <h3 className="text-xl font-bold text-gray-400">{product1.title}</h3>

                                <span
                                    className="mt-1.5 inline-block bg-gray-400 px-5 py-3 text-xs font-medium uppercase tracking-wide text-black"
                                >
                                    Shop Now
                                </span>
                            </div>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="group relative block">
                            <img
                                src={product2.image}
                                alt="product"
                                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                <h3 className="text-xl font-medium text-gray-400">{product2.title}</h3>

                                <span
                                    className="mt-1.5 inline-block bg-gray-400 px-5 py-3 text-xs font-medium uppercase tracking-wide text-black"
                                >
                                    Shop Now
                                </span>
                            </div>
                        </a>
                    </li>

                    <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                        <a href="#" className="group relative block">
                            <img
                                src={product3.image}
                                alt="product"
                                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                <h3 className="text-xl font-medium text-gray-400">{product3.title}</h3>

                                <span
                                    className="mt-1.5 inline-block bg-gray-400 px-5 py-3 text-xs font-medium uppercase tracking-wide text-black"
                                >
                                    Shop Now
                                </span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Hero2