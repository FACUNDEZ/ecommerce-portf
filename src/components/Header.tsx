import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, FormEvent, useEffect } from "react"
import { UserContext } from "@/context/UserContext"
import { SearchMobile, Search } from "./Search"
import { ModalExit } from "./ModalExit"

function Header() {
    const router = useRouter()

    const { user, setUser }: any = useContext(UserContext)
    const [modalExit, setModalExit] = useState(false)

    useEffect(() => {
        setModalExit(false); 
    }, []);

    const [aside, setAside] = useState(false)
    const [search, setSearch] = useState(false)

    const toggleMenu = () => {
        setAside(true)
    }

    const toggleSearch = () => {
        setSearch(!search)
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (event: FormEvent) => {
        //@ts-ignore
        setSearchTerm(event.currentTarget.value);

        try {
            event.preventDefault()
            const response = await fetch(`https://fakestoreapi.com/products?title=${searchTerm}`);
            const data = await response.json();
            const filteredData = data.filter((item: any) => {
                const title = item.title.toLowerCase(); 
                const searchTermLower = searchTerm.toLowerCase(); 
                return title.includes(searchTermLower);
            });
            setSearchResults(filteredData);
            return { value: data };
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

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
                        <SearchMobile setState={setSearch} state={searchTerm} state2={searchResults} handleChange={handleChange} />
                    )}

                    <Search state={searchTerm} state2={searchResults} handleChange={handleChange} />

                    <div className="flex flex-row justify-end gap-1 mr-3 lg:mr-7">
                        <button onClick={() => router.push("/store/shoppingCart")}>
                            <svg data-testid='svg-test' width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                            </svg>
                        </button>
                        <button className={(!user || !user.email) ? 'block' : 'hidden'} onClick={() => router.push("/auth/login")}>
                            <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </button>
                        <button className={(!user || !user.email) ? 'hidden' : 'block'} onClick={() => {
                            setModalExit(!modalExit)
                        }}>
                            <svg width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M9 12h12l-3 -3" />
                                <path d="M18 15l3 -3" />
                            </svg>
                        </button>
                        {modalExit === true && (<ModalExit state={modalExit} setState={setModalExit} state2={user.email} state3={user.token} setState2={setUser} />)}
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header