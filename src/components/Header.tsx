import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext } from "react"

function Header() {
    const router = useRouter()


    const [aside, setAside] = useState(false)
    const [cart, setCart] = useState(false)

    const toggleMenu = () => {
        setAside(true)
    }

    const toggleCart = () => {
        setCart(true)
    }

    const [userLogin, setUserLogin] = useState(false)

    return (
        <header className="bg-zinc-100 fixed top-0 left-0 z-50 w-screen">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <button onClick={toggleMenu} className="block">
                            <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>
                        </button>
                    </div>
                    {aside && (
                        <aside id="cta-button-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen ${!aside ? 'animate-translateX' : 'animate-translateX0'}`} aria-label="Sidebar">
                            <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-200">
                                <button className="mt-3 ml-2" onClick={() => (setAside(false))}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </button>
                                <ul className="mt-10 ml-2">
                                    <li className="text-black text-xl font-bold pb-3 hover:translate-x-3 duration-200 tracking-wider">
                                        <Link href="/store/categories/women's clothing">WOMEN'S CLOTHES</Link>
                                    </li>
                                    <li className="text-black text-xl font-bold hover:translate-x-3 duration-200 pb-3">
                                        <Link href="/store/categories/men's clothing">MEN'S CLOTHES</Link>
                                    </li>
                                    <li className="text-black text-xl font-bold hover:translate-x-3 duration-200 pb-3">
                                        <Link href="/store/categories/jewelery">JEWELERY</Link>
                                    </li>
                                    <li className="text-black text-xl font-bold hover:translate-x-3 duration-200">
                                        <Link href="/store/categories/electronics">ELECTRONIC</Link>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    )}

                    <div className="flex flex-row justify-end gap-1 mr-3">
                        <button onClick={() => router.push("/store/shoppingCart")}>
                            <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                            </svg>
                        </button>
                        <button onClick={() => router.push("/auth/login")}>
                            <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header