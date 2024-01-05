import { NextApiRequest, NextApiResponse } from "next"
import { emailRegex, passwordRegex } from "@/utils/regex"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { LoginResponse } from "@/types/component.types"

const prisma = new PrismaClient()

export default async function login(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    const user = req.body

    if (!user.email.match(emailRegex)) {
        return res.status(400).json({ msg: "Email inválido. No se cumplió con los caracteres." })
    }

    if (!user.password.match(passwordRegex)) {
        return res.status(400).json({ msg: "Contraseña inválida. No se cumplió con los caracteres." })
    }

    const usuarioEnBD = await prisma.user.findUnique({ where: { email: user.email } })

    if (!usuarioEnBD) {
        return res.status(403).json({ msg: "El usuario no existe." })
    }

    const contrasenaAValidar = await compare(user.password, usuarioEnBD.password)

    if (!contrasenaAValidar) {
        return res.status(401).json({ msg: "Contraseña inválida. Vuelve a intentarlo." })
    }

    const token = sign(usuarioEnBD, process.env.TOKEN_SECRET as string, {
        expiresIn: "7d"
    })

    return res.status(200).json({ msg:"Inicio de sesion exitoso!", authorized: true, token })
}