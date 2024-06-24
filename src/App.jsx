import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {getKoders, createKoder, deleteKoder} from "./api";
import { Toaster, toast } from "sonner";

export default function App() {

  const [koders, setKoders] = useState([]);

  // recibe 2 parametros 
  // 1er parametroe s una funcion que se ejecuta // callback
  // 2da es una arreglo de dependencias 
  // useEffect se usa para ejecutar codigo en partes especificas del ciclo de vida de un componente
  useEffect(()=>{console.log("Hola desde useEffect")
    getKoders()
    .then((koders) => {
      console.log("Koders:", koders)
      setKoders(koders)
    })
    .catch((error) => {
      console.error("Error al obtener Koders", error)
      alert("Error al obtener Koders")
    })
  },[])

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset, setFocus } = useForm();

  async function submit(data) {
    try {
      await createKoder({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      const koderList = await getKoders();
      setKoders(koderList);
      setFocus("firstName")
      reset()
      toast.success("Koder creado exitosamente")
    } catch (error) {
      console.error("Error al crear koder", error);
      alert("Error al crear koder")
    }
    
  }
    function onDelete(koderId) {
      deleteKoder(koderId)
      .then(() => {
        getKoders()
          .then((koders)=> {
            setKoders(koders)
          })
          .catch((error) => {
            console.error("Error al obtener Koders", error)
            alert("Error al obtener Koders")
          })
      }) 
      .catch((error) => {
        console.error("Error al eliminar Koder", error)
        alert("Error al eliminar Koder")
      })
    }
 
  return (
    
    <main className="w-full min-h-screen flex flex-col">
      <Toaster position="top-right"/>
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
          {...register("firstName", {
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
          {...register("lastName", {
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
          {...register("email", {
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
                <p>{koder.firstName}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Apellido</span>
                <p>{koder.lastName}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">Correo</span>
                <p>{koder.email}</p>
              </div>
              <button
                onClick={() => onDelete(koder.id)}
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