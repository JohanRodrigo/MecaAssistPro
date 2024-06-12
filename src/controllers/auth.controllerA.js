import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const registerA = async (req, res) => {
    const { email, password, username, plan } = req.body;
    try {
        const userFound = await Admin.findOne({ email });
        if (userFound) return res.status(400).json(["El correo ya se usó"]);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new Admin({
            username,
            email,
            password: passwordHash,
            plan,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            plan: userSaved.plan,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginA = async(req, res)=> {
    const { email, password } = req.body;
    try {
        const userFound = await Admin.findOne({ email });
        if(!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            plan: userFound.plan,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error durante el inicio de sesión" });
    }
}

export const logoutA = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profileA = async(req, res) => {
    const userFound = await Admin.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyTokenA = async(req, res) => {
    const { token } = req.cookies
    if(!token) return res.status(401).json({message:"Unauthorized"})
    jwt.verify(token, TOKEN_SECRET, async(err, user) => {
        if(err) return res.status(401).json({message:"Unauthorized"})
        const userFound = await Admin.findById(user.id)
        if(!userFound) return res.status(401).json({message:"Unauthorized"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            plan: userFound.plan,
        })
    })
}

// Nueva función para enviar el correo de restablecimiento de contraseña
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const userFound = await Admin.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        // Generar token de restablecimiento de contraseña
        const resetToken = crypto.randomBytes(32).toString('hex');
        userFound.resetPasswordToken = resetToken;
        userFound.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await userFound.save();

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tu-email@gmail.com',
                pass: 'tu-contraseña'
            }
        });

        const mailOptions = {
            from: 'tu-email@gmail.com',
            to: email,
            subject: 'Restablecimiento de Contraseña',
            text: `Para restablecer su contraseña, haga clic en el siguiente enlace: ${resetLink}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const userFound = await Admin.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!userFound) return res.status(400).json({ message: "Token inválido o expirado" });

        const passwordHash = await bcrypt.hash(newPassword, 10);
        userFound.password = passwordHash;
        userFound.resetPasswordToken = undefined;
        userFound.resetPasswordExpires = undefined;
        await userFound.save();

        res.status(200).json({ message: 'Contraseña restablecida correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
