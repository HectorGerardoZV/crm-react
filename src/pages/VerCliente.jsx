import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
const VerCliente = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);
    const { nombre, email, telefono, empresa, notas } = cliente;
    const consultarCliente = async () => {
        setCargando(!cargando)
        try {
            const resultado = await axios.get(`http://localhost:4000/clientes/${id}`);
            const { data } = resultado;
            setCargando(false)
            setCliente(data);
        } catch (error) {
            navigate("/clientes");
        }
    }

    useEffect(() => {
        consultarCliente();
    }, []);
    return (
        <>
            {
                cargando ? (<Spinner />) : (
                    <>
                        <h1 className='font-black text-4xl text-blue-900 text-center'>Información Cliente</h1>
                        <p className='mt-3 text-center'>Verifica La Información Del Cliente</p>
                        <div className='mt-10 w-full p-5 md:w-3/5 m-auto bg-slate-50 rounded-md shadow-md'>
                            <p className='text-2xl mb-5 border-b-2 p-2 text-blue-900 font-bold'> <span className='text-gray-700 font-bold uppercase'>
                                Cliente: </span>{nombre}</p>
                            <p className='text-2xl mb-5 border-b-2 p-2 text-blue-900 font-bold'> <span className='text-gray-700 font-bold uppercase'>
                                E-Mail: </span>{email}</p>
                            <p className='text-2xl mb-5 border-b-2 p-2 text-blue-900 font-bold'> <span className='text-gray-700 font-bold uppercase'>
                                Teléfono: </span>{telefono}</p>
                            <p className={`text-2xl mb-5 ${notas ? "border-b-2" : ""} p-2 text-blue-900 font-bold`}> <span className='text-gray-700 font-bold uppercase'>
                                Empresa: </span>{empresa}</p>
                            {
                                notas ? (<p className='text-2xl p-2 text-blue-900 font-bold'> <span className='text-gray-700 font-bold uppercase'>
                                    Notas: </span>{notas}</p>) : null
                            }

                            <div className="mt-10 mb-10">

                                <Link
                                    to={"/clientes"}
                                    className='p-3 bg-blue-600 transition-all hover:bg-blue-800 rounded-md text-white 
                                text-2xl uppercase font-bold px-10'
                                >
                                    Volver
                                </Link>
                            </div>

                        </div>
                    </>
                )
            }


        </>


    )
}

export default VerCliente
