import express from "express";
import data from "./data.js";
import findStudentById from "./findById.js";
import userCheck from "./userCheck.js";
import { validationResult } from "express-validator";

const router = express.Router();

const patch = "/";

// Crear un alumno
router
  .route(patch)
  .post(userCheck(), (req, res) => {
    // Validación con express validator
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(404).json(err.array());
    } else {
      // Si no hay errores se crea el usuario
      const { nombre, email, cursos } = req.body;
      const newAlumno = {
        id: data.length + 1,
        nombre,
        email,
        cursos,
      };
      data.push(newAlumno);
      res.json(newAlumno);
    }
  }) // Obtener todos los alumnos
  .get((req, res) => {
    res.json(data);
  });

// Obtener un alumno por Id
router
  .route(`${patch}:id`)
  .get((req, res) => {
    const alumnoId = parseInt(req.params.id);

    try {
      // Uso la función para buscar el dato por id
      const { item } = findStudentById(alumnoId, data);
      res.json(item);
    } catch (err) {
      res.status(err.code).send(err.message);
    }
  }) // Actualizar un alumno por Id
  .put(userCheck(), (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(404).json(err.array());
    } else {
      const alumnoId = parseInt(req.params.id);
      const body = req.body;

      try {
        const { index } = findStudentById(alumnoId, data);
        data[index] = {
          ...data[index],
          ...body,
        };
        res.json(data[index]);
      } catch (err) {
        res.status(err.code).send(err.message);
      }
    }
  }) //Eliminar un alumno por Id
  .delete((req, res) => {
    const alumnoId = parseInt(req.params.id);

    try {
      const { index } = findStudentById(alumnoId, data);
      const deleteAlumno = data.splice(index, 1);
      res.json(deleteAlumno);
    } catch (err) {
      res.status(err.code).send(err.message);
    }
  });

export default router;
