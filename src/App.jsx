import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function App() {

  const [koders, setKoders] = useState([]);

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset } = useForm();

  function submit(data) {
    console.log("data :", data)
    setKoders([...koders,{ nombre: data.nombre, apellido: data.apellido, correo: data.correo },]);
    reset()
  }

  function deleteKoder(index) {
    const newKoders = koders.filter((koder, i) => i !== index);
    setKoders(newKoders);
  }

  return (
    <main className="w-full min-h-screen flex flex-col">
      <form
        className="flex flex-row gap-2 justify-center p-5"
        onSubmit={handleSubmit(submit)}
      >
        <input
          type="text"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.todo,
          })}
          placeholder="Ingresa tu nombre"
          {...register("nombre", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 80, message: "Maximo 80 caracteres" },
          })}
        />
        <input
          type="text"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.todo,
          })}
          placeholder="Ingresa tus apellidos"
          {...register("apellido", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 80, message: "Maximo 80 caracteres" },
          })}
        />
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
            "border-2 border-red-500 bg-red-300": errors.todo,
          })}
          {...register("correo", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Correo inválido",
            },
          })}
        />
        <button
          className="text-black px-3 rounded bg-white disabled:bg-stone-400"
          disabled={isSubmitted ? !isValid : false}
        >
          Enviar
        </button>
      </form>

      {errors.todo && (
        <p className="text-red-500 text-center text-sm font-semibold">
          {errors.todo?.message}
        </p>
      )}

      <div className="text-white max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1">
        {koders.length === 0 && (
          <p className="text-white/50">No hay Koders : 😵</p>
        )}
        {koders?.map((koder, index) => {
          return (
            <div
              key={`koder-${index}`}
              className="bg-white/10 rounded p-4 flex flex-row justify-between w-full max-w-screen-sm"
            >
              <div className="flex flex-col">
                <span className="font-bold text-white">Nombre</span>
                <p>{koder.nombre}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Apellido</span>
                <p>{koder.apellido}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Correo</span>
                <p>{koder.correo}</p>
              </div>
              <button
                onClick={() => deleteKoder(index)}
                className=" text-red-500 hover:text-red-950 rounded px-2 py-1"
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}