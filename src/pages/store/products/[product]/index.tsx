import { useState, useContext } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CartContext } from '@/context/CartContext';

function Index({ producto, rating }: { producto: any, rating: any }) {
    const router = useRouter()

    const [addedProduct, setAddedProduct] = useState(false)

    const { cart, setCart }: any = useContext(CartContext)

    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(
            <svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="#ffec00" />
            </svg>
        )
    }

    const decimalPart = rating % 1 !== 0;
    if (decimalPart) {
        stars.push(
            <svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 1a.993 .993 0 0 1 .823 .443l.067 .116l2.852 5.781l6.38 .925c.741 .108 1.08 .94 .703 1.526l-.07 .095l-.078 .086l-4.624 4.499l1.09 6.355a1.001 1.001 0 0 1 -1.249 1.135l-.101 -.035l-.101 -.046l-5.693 -3l-5.706 3c-.105 .055 -.212 .09 -.32 .106l-.106 .01a1.003 1.003 0 0 1 -1.038 -1.06l.013 -.11l1.09 -6.355l-4.623 -4.5a1.001 1.001 0 0 1 .328 -1.647l.113 -.036l.114 -.023l6.379 -.925l2.853 -5.78a.968 .968 0 0 1 .904 -.56zm0 3.274v12.476a1 1 0 0 1 .239 .029l.115 .036l.112 .05l4.363 2.299l-.836 -4.873a1 1 0 0 1 .136 -.696l.07 -.099l.082 -.09l3.546 -3.453l-4.891 -.708a1 1 0 0 1 -.62 -.344l-.073 -.097l-.06 -.106l-2.183 -4.424z" stroke-width="0" fill="#ffec00" />
            </svg>
        )
    }
    return (
        <>
            <Header></Header>
            <button onClick={() => router.push("/")} className='mt-24 ml-4 text-black'><svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
            </svg></button>
            <main className='h-full mt-8 ml-5 mb-28 flex justify-center'>
                <div className="h-full group block">
                    <Image
                        className='m-auto hover:scale-105 duration-500'
                        width={200}
                        height={200}
                        src={producto.image}
                        alt="product"
                    />

                    <div className="flex flex-col justify-between text-sm">
                        <div>
                            <h3 className="text-gray-900 text-xl mt-10 ">
                                {producto.title}
                            </h3>

                            <p className=" max-w-[45ch] text-base text-gray-500 my-5">
                                {producto.description}
                            </p>
                        </div>

                        <div className='flex flex-row-reverse justify-between items-center mb-5'>
                            <span className='flex mr-11'>{stars}</span>

                            <p className="text-gray-900 text-xl font-bold">${producto.price.toString()}</p>
                        </div>

                        <button
                            onClick={(e) => setCart(
                                {
                                    products: [...cart.products, producto],
                                    price: (cart.price + producto.price)
                                },
                                //@ts-ignore
                                setAddedProduct(true),
                                setTimeout(() => {
                                    setAddedProduct(false)
                                }, 2500),
                                e.preventDefault()
                            )}
                            className="block w-72 rounded mt-3 bg-zinc-200 p-4 text-sm font-medium transition hover:bg-zinc-300 duration-300"
                        >
                            Agregar Producto
                        </button>
                        {addedProduct === true && (
                            <div className="px-4 w-72 py-3 mt-3 leading-normal text-green-700 bg-green-300 rounded-lg" role="alert">
                            <p>Product was added successfully</p>
                        </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const res = await fetch("https://fakestoreapi.com/products")
        const datos = await res.json()

        const productoABuscar = context.params.product
        const producto = datos.find((product: any) => product.title === productoABuscar)

        const rating = producto.rating.rate;

        return {
            props: {
                producto,
                rating
            },
        }

    } catch (error) {
        console.log(error)
    }
}

export default Index
