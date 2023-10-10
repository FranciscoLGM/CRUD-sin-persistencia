import { check } from "express-validator";

const userCheck = () => {
  return [
    check("nombre", "Nombre debe tener al menos 3 caracteres")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("email", "Ingrese un email valido")
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
  ];
};

export default userCheck;
