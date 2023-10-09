// Función para buscar el dato por id
const findById = (id, data) => {
  const index = data.findIndex((d) => d.id == id);

  if (index == -1) {
    throw {
      code: 404,
      message: "No se encontró el dato con ese id",
    };
  }

  const item = data[index];

  return { index, item };
};

export default findById;
