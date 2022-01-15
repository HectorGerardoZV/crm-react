import React from 'react'
import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente,eliminarCliente }) => {
    let navigate = useNavigate();

    const { nombre, empresa, email, telefono, id } = cliente;

    const verCliente = ()=>{
        navigate(`/clientes/${id}`);
    }
    const editarCliente = ()=>{
        navigate(`/clientes/editar/${id}`);
    }

    return (
        <tr className='border-b-2 hover:bg-gray-100 transition-all'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p> <span className='text-gray-800 uppercase font-bold'>E-Mail: </span> {email}</p>
                <p> <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>{telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button className='bg-green-600 text-white hover:bg-green-800 
                transition-all block w-full p-2 uppercase font-bold'
                    onClick={verCliente}
                >
                    Ver
                </button>
                <button className='bg-blue-600 text-white hover:bg-blue-800 
                transition-all block w-full p-2 uppercase font-bold my-1'
                    onClick={editarCliente}
                >
                    Editar
                </button>
                <button className='bg-red-600 text-white hover:bg-red-800 
                transition-all block w-full p-2 uppercase font-bold'
                    onClick={()=>eliminarCliente(id)}
                >
                    Eliminar
                </button>
            </td>

        </tr>
    )
}

export default Cliente
