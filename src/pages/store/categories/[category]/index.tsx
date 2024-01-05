import { useState, useContext } from 'react'
import { product } from '@/types/component.types'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import { CartContext } from '@/context/CartContext'

function Index({ productos, categoryTitle }: { productos: any, categoryTitle: any }) {
    const router = useRouter()

    const [addedProduct, setAddedProduct] = useState(null)

    const { cart, setCart }: any = useContext(CartContext)

    return (
        <>
            <Header></Header>
            <button onClick={() => router.push("/")} className='block lg:hidden mt-24 md:mt-28 ml-6 md:ml-7 text-black'><svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
            </svg></button>
            <button className='lg:block hidden mt-36 mb-5 ml-12 text-xl font-medium hover:underline' onClick={() => router.push("/")}>Back Home</button>
            <main className="mt-3">
                <h1 className='text-center mb-12 text-4xl font-bold'>{categoryTitle.category.charAt(0).toUpperCase() + categoryTitle.category.slice(1)} Products</h1>
                <ul className="z-0 relative mt-8 mx-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {productos.map((product: any, index: number) => (
                        <li key={index} className='mb-7 flex flex-col'>
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
                                className={`${addedProduct === index ? "hidden" : "block"} w-full rounded bg-zinc-200 p-4 text-sm font-medium transition hover:scale-105 duration-300 mt-4`}
                            >
                                Add Product
                            </button>
                            {addedProduct === index && (
                                <div className="p-4 w-full rounded leading-normal text-sm text-center text-green-700 bg-green-300" role="alert">
                                    <p>Product was added successfully</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const categoriaABuscar = context.params.category

        const res = await fetch(`https://fakestoreapi.com/products/category/${categoriaABuscar}`)
        const datos = await res.json()

        const productos = datos.filter((product: product) => product.category === categoriaABuscar)

        const categoryTitle = datos.find((product: product) => product.category === categoriaABuscar)

        return {
            props: {
                productos,
                categoryTitle
            },
        }
    } catch (error) {
        console.log(error)
    }
}

export default Index


