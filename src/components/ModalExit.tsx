import { useRouter } from "next/router";

export const ModalExit = ({ state, setState, state2, state3, setState2 }: { state: boolean; setState: (value: boolean) => void; state2: string; state3: string; setState2: (value: { state2: string; state3: string }) => void }) => {
    const router = useRouter()

    return (
        <div className={`${state === true ? "fixed" : "hidden"} inset-0 w-full h-full z-10`}>
            <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
            <section className="relative rounded-lg mx-4 sm:mx-auto sm:w-full md:mx-auto md:w-1/2 lg:mx-auto lg:w-1/3 mt-40 shadow-2xl bg-white">
                <div className="p-12 md:p-16 text-center">
                    <h2 className="-mt-4 text-2xl md:text-3xl font-bold">
                        Are you sure you want to log out?
                    </h2>

                    <div className='flex flex-row justify-center mt-8 md:mt-12'>
                        <button className="bg-zinc-300 text-gray px-4 py-2 mr-8 rounded-lg font-semibold" onClick={() => setState(false)}>Cancel</button>
                        <button className="bg-red-600 text-gray px-4 py-2 rounded-lg font-semibold" onClick={() => {
                            setState2({ state2: "", state3: "" });
                            router.push("/auth/login");
                        }}>Log Out</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

