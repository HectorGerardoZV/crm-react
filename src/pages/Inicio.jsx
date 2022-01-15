import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cliente from '../components/Cliente';
import Spinner from '../components/Spinner';

const Inicio = () => {

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(false);

    const consultarClientes = async () => {
        setCargando(!cargando);
        try {
            const respuesta = await axios.get("http://localhost:4000/clientes");
            const { data } = respuesta;
            setClientes(data);
            setCargando(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        consultarClientes();
    },[]);

    const eliminarCliente = async (id) => {
        try {
            const confirmar = confirm("Desea eliminar este cliente?");
            if (confirmar) {
                const newClientes = clientes.filter(cliente => cliente.id !== id);
                const respuesta = await axios.delete(`http://localhost:4000/clientes/${id}`);
                if(respuesta.status===200){
                    setClientes(newClientes)
                }
            }

        } catch (error) {

        }

    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900 text-center'>Listado De Clientes</h1>
            <p className='mt-3 text-center'>Administra tus clientes</p>
            {cargando ?
                (<Spinner />)
                : (
                    <>

                        <table className='w-full mt-5 table-auto shadow-md
                         bg-white rounded-md text-center text-1xl
                         text-blue-900 font-bold
                         '>
                            <thead className='bg-blue-800'>
                                <tr className='text-white'>
                                    <th className='p-3'>Nombre</th>
                                    <th className='p-2'>Contacto</th>
                                    <th className='p-2'>Empresa</th>
                                    <th className='p-2'>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    clientes.map(cliente => (
                                        <Cliente
                                            key={cliente.id}
                                            cliente={cliente}
                                            eliminarCliente={eliminarCliente}
                                        />
                                    ))
                                }

                            </tbody>

                        </table>
                    </>)
            }




        </>
    )
}

export default Inicio
