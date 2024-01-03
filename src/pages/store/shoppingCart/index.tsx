import { useContext } from "react"
import { CartContext } from '@/context/CartContext';
import { product } from "@/types/component.types";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

function Index() {
    const router = useRouter()
    const { cart, setCart }: any = useContext(CartContext)
    const { user }: any = useContext(UserContext)

    function filteredProducts(productToRemove: any) {
        const updatedProducts = cart.products.filter((product: any) => product.title !== productToRemove.title)
        const removedProductPrice = cart.products.filter((product: any) => product.title === productToRemove.title).length;
        const updatedPrice = Math.round(cart.price) - (productToRemove.price * removedProductPrice)
        
        setCart({
            products: updatedProducts,
            price: updatedPrice
        })
    }

    return (
        <>
            <button className='mt-5 ml-4 text-black' onClick={() => router.push("/")}><svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
            </svg></button>
            <h1 className='font-bold text-4xl text-center'>Shopping Cart</h1>
            {!cart || !cart.products || !cart.price || cart.price < 1 ? (
                <p className="text-3xl h-full mt-24 mb-44 mx-2 text-center">You have not selected any product.</p>
            ) : (
                <div
                    className="relative w-screen max-w-sm border border-gray-600 my-16 m-auto bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="mt-4 space-y-6">
                        <ul className="space-y-4">
                            {cart.products.map((product: product, index: number) => (
                                <li className="flex items-center flex-row justify-between gap-4" key={index}>
                                    <div className="flex items-center flex-row justify-evenly gap-3">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={product.image}
                                            alt="image-product"
                                            className="h-16 w-16 rounded object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm text-gray-900">{product.title}</h3>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                <div>
                                                    <dt className="inline">Categoria: </dt>
                                                    <dd className="inline">{product.category}</dd>
                                                </div>

                                                <div>
                                                    <dt className="inline">Precio: </dt>
                                                    <dd className="inline">${product.price.toString()}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    <button onClick={() => filteredProducts(product)} className="text-gray-600 transition hover:text-red-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <span className="block mt-10 mr-2 font-bold text-right">Total Price: ${cart.price}</span>
                        <div className="space-y-4 text-center">
                            <button
                                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}


export default Index