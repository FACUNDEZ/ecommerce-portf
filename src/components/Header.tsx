import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext } from "react"

function Header() {
    const router = useRouter()


    const [aside, setAside] = useState(false)
    const [search, setSearch] = useState(false)

    const toggleMenu = () => {
        setAside(true)
    }

    const toggleSearch = () => {
        setSearch(true)
    }

    const [userLogin, setUserLogin] = useState(false)

    return (
        <header className="bg-zinc-100 fixed top-0 left-0 z-50 w-screen md:py-2 lg:py-3">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="hidden lg:block">
                        <nav className="flex items-center flex-row gap-6 ml-5">
                            <li className="text-black text-base list-none font-bold tracking-wider hover:text-zinc-800 duration-200">
                                <Link href="/store/categories/women's clothing">WOMEN'S CLOTHES</Link>
                            </li>
                            <li className="text-black text-base list-none font-bold hover:text-zinc-800 duration-200">
                                <Link href="/store/categories/men's clothing">MEN'S CLOTHES</Link>
                            </li>
                            <li className="text-black text-base list-none font-bold hover:text-zinc-800 duration-200">
                                <Link href="/store/categories/jewelery">JEWELERY</Link>
                            </li>
                            <li className="text-black text-base list-none font-bold hover:text-zinc-800 duration-200">
                                <Link href="/store/categories/electronics">ELECTRONIC</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3 lg:hidden">
                        <button onClick={toggleMenu} className="block ">
        
                            <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>
                        </button>
                        <button onClick={toggleSearch} className={`${search === true ? "hidden" : "block"}`}>
                            <svg width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
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
                                <nav className="mt-10 ml-2">
                                    <li className="text-black text-xl list-none font-bold pb-3 hover:translate-x-3 duration-200 tracking-wider">
                                        <Link href="/store/categories/women's clothing">WOMEN'S CLOTHES</Link>
                                    </li>
                                    <li className="text-black text-xl list-none font-bold hover:translate-x-3 duration-200 pb-3 tracking-wider">
                                        <Link href="/store/categories/men's clothing">MEN'S CLOTHES</Link>
                                    </li>
                                    <li className="text-black text-xl list-none font-bold hover:translate-x-3 duration-200 pb-3 tracking-wider">
                                        <Link href="/store/categories/jewelery">JEWELERY</Link>
                                    </li>
                                    <li className="text-black text-xl list-none font-bold hover:translate-x-3 duration-200 tracking-wider">
                                        <Link href="/store/categories/electronics">ELECTRONIC</Link>
                                    </li>
                                </nav>
                            </div>
                        </aside>
                    )}

                    {search && (
                        <div className="relative w-screen mx-4 animate-translateY">
                            <label htmlFor="Search" className="sr-only"> Search </label>

                            <input
                                type="text"
                                id="Search"
                                placeholder="Search for..."
                                className="w-full rounded-md border-gray-200 pr-14 py-2 md:py-3 px-3 shadow-sm sm:text-sm focus:outline-none"
                            />

                            <span className="absolute inset-y-0 end-0 flex w-10 bg-white items-center gap-1 rounded-md mr-2">
                                <button type="button" className="text-gray-600 hover:text-gray-700">
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
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>

                                </button>
                                <button onClick={() => setSearch(false)} type="button" className="text-gray-600 hover:text-gray-700">
                                    <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>

                                </button>
                            </span>
                        </div>
                    )}

                    <div className="relative w-screen mx-4 hidden lg:block ml-20 mr-20">
                        <label htmlFor="Search" className="sr-only"> Search </label>

                        <input
                            type="text"
                            id="Search"
                            placeholder="Search for..."
                            className="w-full rounded-md border-gray-200 pr-10 py-3 px-3 shadow-sm sm:text-sm focus:outline-none"
                        />

                        <span className="absolute inset-y-0 end-0 flex w-8 justify-center mr-1 bg-white  rounded-md">
                            <button type="button" className="text-gray-600 hover:text-gray-700">
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
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>

                            </button>
                            
                        </span>
                    </div>

                    <div className="flex flex-row justify-end gap-1 mr-3 lg:mr-7">
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