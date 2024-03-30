import { NextApiRequest, NextApiResponse } from 'next'
import { registerResponse } from '@/types/component.types'
import { PrismaClient } from '@prisma/client'
import { emailRegex, passwordRegex } from '@/utils/regex'
import { sign } from 'jsonwebtoken'
import { encriptarPassword } from '@/utils/crypto'
const prisma = new PrismaClient()

export default async function register(req: NextApiRequest, res: NextApiResponse<registerResponse>) {
    try {
        const newUser = req.body

        if (Object.values(newUser).includes(undefined)) {
            return res.status(400).json({ msg: "Datos ingresados ya existen" })
        }

        if (!newUser.email.match(emailRegex)) {
            return res.status(400).json({ msg: "Email inválido. No se cumplió con los caracteres." })
        }

        if (!newUser.password.match(passwordRegex)) {
            return res.status(400).json({ msg: "Contraseña inválida. No se cumplió con los caracteres." })
        }

        const usuarioExistente = await prisma.user.findUnique({
            where: {
                email: newUser.email
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({ msg: "El correo electrónico ya está en uso." })
        }

        const hash = await encriptarPassword(newUser.password)

        const usuarioAGuardar = { ...newUser, password: hash }
        const usuarioSubido = await prisma.user.create({ data: usuarioAGuardar })

        if (!usuarioSubido) {
            return res.status(400).json({ msg: "No se pudo subir el usuario" })
        }

        const token = sign(usuarioSubido.id, process.env.TOKEN_SECRET as string)

        return res.status(201).json({ msg: "Usuario creado correctamente!", authorized: true, token })
    } catch (error) {
        console.error("Error en registrarse:", error)
        return res.status(500).json({ msg: "Error interno del servidor. Por favor, inténtelo de nuevo más tarde." })
    }
} 