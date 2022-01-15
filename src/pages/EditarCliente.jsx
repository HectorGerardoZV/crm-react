import React, {useState, useEffect} from 'react'
import Formulario from '../components/Formulario'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
const EditarCliente = () => {

    let navigate = useNavigate();
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true)
    const consultarCliente = async () => {
        try {
            const resultado = await axios.get(`http://localhost:4000/clientes/${id}`);
            const { data } = resultado;
            setCliente(data);

        } catch (error) {
            navigate("/clientes");
        }
        setCargando(!cargando)
    }
    

    useEffect(() => {
        consultarCliente();
    }, []);

    return (
        <>
        <h1 className='font-black text-4xl text-blue-900 text-center'>Editar Cliente</h1>
        <p className='mt-3 text-center'>Edita la información del cliente</p>
        <Formulario 
            cliente={cliente}
            cargando={cargando}
        />
    </>
    )
}

export default EditarCliente
