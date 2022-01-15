import React from 'react'

const Alerta = ({mensaje}) => {
    return (
        <div className='text-center bg-red-500 text-white font-bold uppercase p-3 mt-2'>
            <p>{mensaje}</p>
        </div>
    )
}

export default Alerta
