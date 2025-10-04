import bcrypt from "bcrypt";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const saltRounds = parseInt(process.env.SALT) || 10;
const hashContraseña = async (req, res) => {
  const { contraseña } = req.body;

  try {
    if (!contraseña) {
      return res.status(400).json({
        error: true,
        msg: "el campo contraseña esta vacio",
      });
    }

    const hash = await bcrypt.hash(contraseña, saltRounds);
    return res.status(200).json({
      error: false,
      msg: "contraseña hasheada",
      data: hash,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: "error interno del servidor",
    });
  }
};

router.post("/", hashContraseña);

export default router;
