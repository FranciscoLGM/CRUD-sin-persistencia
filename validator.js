import { body } from "express-validator";

const userCheck = () => {
  return [
    body("nombre")
      .notEmpty()
      .withMessage("Debe ingresar un nombre")
      .isLength({ min: 3 })
      .withMessage("Nombre debe tener al menos 3 caracteres"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Debe ingresar un email")
      .isEmail()
      .withMessage("Debe ingresar un email valido")
      .normalizeEmail(),
    body("cursos").isArray().withMessage("Cursos debe ser un Array"),
    //body("cursos.*.codigo").notEmpty(),
  ];
};

export default userCheck;
