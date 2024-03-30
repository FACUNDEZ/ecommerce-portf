import Link from 'next/link'
import { FormEvent, useState, useRef } from "react"
import { useRouter } from 'next/router'

function Index() {
    const router = useRouter()

    const nameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [registerAuthorized, setRegisterAuthorized] = useState(false)
    const [dataMsg, setDataMsg] = useState("")

    if (registerAuthorized === true) {
        setTimeout(() => {
            setRegisterAuthorized(false);
        }, 3000);
    }

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

            if (response.status === 201 && data.authorized) {
                alert(data.msg)
                router.push("/auth/login")
            } else {
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
                            {registerAuthorized === false && (
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
                                className="w-full px-4 py-3 text-black font-bold bg-zinc-200 hover:bg-zinc-300 duration-300 rounded-lg"
                            >
                                Crear Cuenta
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Index