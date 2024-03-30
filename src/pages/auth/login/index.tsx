import Link from 'next/link'
import { useState, useRef, FormEvent, useContext } from "react"
import { useRouter } from 'next/router'
import { UserContext } from '@/context/UserContext'

function Index() {
    const router = useRouter()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [loginAuthorized, setLoginAuthorized] = useState(false)
    const [dataMsg, setDataMsg] = useState("")

    if (loginAuthorized === true) {
        setTimeout(() => {
            setLoginAuthorized(false);
        }, 3000);
    }

    const { user, setUser }: any = useContext(UserContext)

    const getApi = async () => {
        try {
            const api = "http://localhost:3000/api/users/login"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                //@ts-ignore
                body: JSON.stringify({ email: emailRef.current?.value, password: passwordRef.current?.value })
            })
            const data = await response.json()

            if (response.status === 200 && data.authorized) {
                //@ts-ignore
                setUser({ email: emailRef.current?.value, token: data.token });
                router.push("/")
            } else {
                setLoginAuthorized(true)
                setDataMsg(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault()

        await getApi()
    }

    return (
        <>
            <button onClick={() => router.push("/")} className='my-4 mx-4 text-xl font-medium text-black'><svg width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg></button>
            <main
                className="w-full h-screen flex flex-col items-center justify-center -mt-16 px-4"
            >
                <div className="max-w-sm w-full text-gray-600">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-black text-2xl font-bold sm:text-3xl">
                                Iniciar Sesión
                            </h3>
                            <p className="">
                                ¿No te has registrado aún?
                                <Link
                                    href="/auth/register"
                                    className="font-bold text-black ml-1"
                                >Regístrarse</Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={enviarFormulario} className="mt-8 space-y-5">
                        {loginAuthorized === true && (
                            <p className='text-red-600'>{dataMsg}</p>
                        )}
                        <div>
                            <label className="font-medium">Correo electrónico</label>
                            <input
                                ref={emailRef}
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-zinc-200 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Contraseña</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-zinc-200 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-3 text-black font-bold bg-zinc-200 hover:bg-zinc-300 duration-300 rounded-lg"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Index