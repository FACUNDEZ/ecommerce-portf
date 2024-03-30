import Image from "next/image"
import Link from "next/link"

export const SearchMobile = ({ state, state2, handleChange, setState }: { state: string, state2: any, handleChange: (e: any) => void, setState: (e: any) => void }) => {

    return (
        <div className="relative w-screen overflow-hidden mx-4 animate-translateY">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border-gray-200 pr-14 py-2 md:py-3 px-3 shadow-sm sm:text-sm focus:outline-none"
                value={state}
                onChange={handleChange}
            />

            <div className="absolute inset-y-0 end-0 flex w-10 bg-white items-center gap-1 rounded-md mr-2">
                <span className="text-gray-600 hover:text-gray-700">
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
                </span>
                <button onClick={() => setState(false)} type="button" className="text-gray-600 hover:text-gray-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {/* Mostrar resultados de la búsqueda aquí */}
            <div className={`w-[300px] h-36 bg-neutral-50 overflow-x-hidden absolute top-11 rounded ${state == "" ? "hidden" : "block"}`}>
                {state2.map((product: any) => (
                    <Link href={`/store/products/${product.title}`}>
                        <div className="flex flex-row items-center gap-x-5 py-4 hover:bg-zinc-100 duration-150" key={product.id}>
                            <picture className="ml-5">
                                <Image width={50} height={50} src={product.image} alt="image-product" />
                            </picture>
                            <h3 className="font-bold text-left">{product.title}</h3>
                        </div>
                    </Link>
                ))}
                {state2.length == 0 && (
                    <h1>No se encontro resultado</h1>
                )}
            </div>
        </div>
    )
}

export const Search = ({ state, state2, handleChange }: { state: string, state2: any, handleChange: (e: any) => void }) => {
    return (
        <div className="relative w-[600px] mx-4 hidden lg:block">
            <label htmlFor="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-full rounded-md border-gray-200 pr-10 py-3 px-3 shadow-sm sm:text-sm focus:outline-none"
                value={state}
                onChange={handleChange}
            />

            <div className="absolute inset-y-1/3 overflow-hidden end-0 flex w-8 justify-center mr-1 bg-white rounded-md">
                <span className="text-gray-600 hover:text-gray-700">
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
                </span>
            </div>
            {/* Mostrar resultados de la búsqueda aquí */}
            <div className={`w-[500px] h-36 bg-neutral-50 overflow-x-hidden absolute top-11 rounded ${state == "" ? "hidden" : "block"}`}>
                {state2.map((product: any) => (
                    <Link href={`/store/products/${product.title}`}>
                        <div className="flex flex-row items-center gap-x-5 py-4 hover:bg-zinc-100 duration-150" key={product.id}>
                            <picture className="ml-5">
                                <Image width={50} height={50} src={product.image} alt="image-product" />
                            </picture>
                            <h3 className="font-bold text-left">{product.title}</h3>
                        </div>
                    </Link>
                ))}
                {state2.length == 0 && (
                    <h1>No se encontro resultado</h1>
                )}
            </div>
        </div>
    )
}