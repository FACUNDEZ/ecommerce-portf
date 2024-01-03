import Link from 'next/link'
import { FormEvent, useState, useRef, useContext } from "react"
import { useRouter } from 'next/router'
import { UserContext } from "@/context/UserContext"

function Index() {
    const router = useRouter()

    const nameRef = useRef(null)
    const lastNameRef = useRef(null)
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
            const api = "http://localhost:3000/api/users/register"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                //@ts-ignore
                body: JSON.stringify({ firstName: nameRef.current?.value, lastName: lastNameRef.current?.value, email: emailRef.current?.value, password: passwordRef.current?.value })
            })
            const data = await response.json()

            if (response.status === 200) {
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

    async function enviarForm(e: FormEvent) {
        e.preventDefault()

        //@ts-ignore
        if (!nameRef.current?.value || !lastNameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) {
            alert("Completa los datos, por favor")
            return
        }

        await getApi()
    }

    return (
        <>
            <button onClick={() => router.push("/")} className='my-2 mx-2 text-black'><svg width="38" height="38" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
            </svg></button>
            <main
                className="w-full h-screen flex flex-col items-center justify-center -mt-14 px-4"
            >
                <div className="max-w-sm w-full text-gray-600">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                                Regístrarse
                            </h3>
                            <p className="">
                                ¿Ya tienes una cuenta?
                                <Link
                                    href="/auth/login"
                                    className="font-bold text-black ml-1"
                                >Inicia sesión</Link>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-4 py-6 sm:p-6 sm:rounded-lg">
                        <form onSubmit={enviarForm} className="space-y-5">
                            {loginAuthorized === true && (
                                <p className='text-red-600'>{dataMsg}</p>
                            )}
                            <div>
                                <label className="font-medium">Nombre</label>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-zinc-200 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">Apellido</label>
                                <input
                                    ref={lastNameRef}
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-zinc-200 shadow-sm rounded-lg"
                                />
                            </div>
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
                                className="w-full px-4 py-2 text-black font-bold bg-zinc-200 hover:bg-zinc-300 duration-300 rounded-lg "
                            >
                                Crear Cuenta
                            </button>
                        </form>
                        <div className="mt-5">
                            <button
                                className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-zinc-200 duration-300"
                            >
                                <img
                                    src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Index