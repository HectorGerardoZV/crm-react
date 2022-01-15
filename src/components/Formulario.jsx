import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup";
import Alerta from './Alerta';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    let navigate = useNavigate();
    const id = useParams().id ? useParams().id : -1;
    //Schema
    const nuevoClienteSchema = Yup.object().shape({
        nombre:
            Yup.string()
                .min(3, "El nombre es demasiado corto")
                .max(30, "El nombre es demasiado largo")
                .required("El nombre del cliente es obligatorio"),
        empresa:
            Yup.string()
                .required("El nombre de la empresa es obligatorio"),
        email:
            Yup.string()
                .email("E-Mail no valido")
                .required("El email es obligatorio"),
        telefono:
            Yup.number()
                .positive("El número no es valido")
                .integer("El número no es valido")
                .typeError("El número no es valido"),
    });

    const handleSubmit = async (cliente, { resetForm }) => {
        try {

            if (id >= 0) {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await axios.put(url, cliente);
                const { data } = respuesta;
                if (Object.keys(data).length > 0) {
                    resetForm();
                    navigate("/clientes");
                }
            } else {
                const url = "http://localhost:4000/clientes";
                const respuesta = await axios.post(url, cliente);
                const { data } = respuesta;
                if (Object.keys(data).length > 0) {
                    resetForm();
                    navigate("/clientes");
                }
            }
        } catch (error) {

        }


    }

    return (
        cargando ? (<Spinner />) :
            (<>

                <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/5 mx-auto'>
                    <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>
                    <Formik
                        initialValues={{
                            nombre: cliente?.nombre ?? "",
                            empresa: cliente?.empresa ?? "",
                            email: cliente?.email ?? "",
                            telefono: cliente?.telefono ?? "",
                            notas: cliente?.notas ?? ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={nuevoClienteSchema}
                        enableReinitialize={true}

                    >
                        {({ errors, touched }) => {
                            return (
                                <Form
                                    className='mt-10'
                                >
                                    <div className="mb-5">
                                        <label
                                            className='text-gray-800'
                                            htmlFor="nombre">Nombre: </label>
                                        <Field
                                            type={"text"}
                                            className={"mt-2 block p-2 w-full bg-gray-50"}
                                            id={"nombre"}
                                            placeholder={"Nombre del cliente"}
                                            name={"nombre"}
                                        />
                                        {errors.nombre && touched.nombre ? (<Alerta mensaje={errors.nombre} />) : null}
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className='text-gray-800'
                                            htmlFor="empresa">Empresa: </label>
                                        <Field
                                            type={"text"}
                                            className={"mt-2 block p-2 w-full bg-gray-50"}
                                            id={"empresa"}
                                            placeholder={"Empresa del cliente"}
                                            name={"empresa"}
                                        />
                                        {errors.empresa && touched.empresa ? (<Alerta mensaje={errors.empresa} />) : null}
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className='text-gray-800'
                                            htmlFor="email">E-Mail: </label>
                                        <Field
                                            type={"email"}
                                            className={"mt-2 block p-2 w-full bg-gray-50"}
                                            id={"email"}
                                            placeholder={"E-Mail del cliente"}
                                            name={"email"}
                                        />
                                        {errors.email && touched.email ? (<Alerta mensaje={errors.email} />) : null}

                                    </div>
                                    <div className="mb-5">
                                        <label
                                            className='text-gray-800'
                                            htmlFor="telefono">Teléfono: </label>
                                        <Field
                                            type={"tel"}
                                            className={"mt-2 block p-2 w-full bg-gray-50"}
                                            id={"telefono"}
                                            placeholder={"Teléfono del cliente"}
                                            name={"telefono"}
                                        />
                                        {errors.telefono && touched.telefono ? (<Alerta mensaje={errors.telefono} />) : null}
                                    </div>
                                    <div>
                                        <label
                                            className='text-gray-800'
                                            htmlFor="notas">Notas: </label>
                                        <Field
                                            as="textarea"
                                            className={"mt-2 block p-2 w-full bg-gray-50 h-30 resize-none"}
                                            id={"notas"}
                                            placeholder={"Notas del cliente"}
                                            name={"notas"}
                                        />
                                    </div>
                                    <input type="submit" value={cliente?.nombre ? "Guardas Cambios" : "Agregar Cliente"}
                                        className='mt-5 w-full bg-blue-800 p-3 rounded-md 
                                text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-900 transition-all'
                                    />
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </>)

    )
}
//Default props
Formulario.defaultPorps = {
    cliente: {},
    cargando: false
}
export default Formulario
