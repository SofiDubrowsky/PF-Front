import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import getactbyname from '../../actions/getactbyname';
import stl from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleinputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

   function handleSubmit(e) {
        e.preventDefault()
        dispatch(getactbyname(name))
        setName("")
    }

    return (
        <div className={stl.sbcontainer}>
            <input className={stl.sbinput} onChange={(e) => handleinputChange(e)} type='text' placeholder='Search by name' value={name} />
            <button className={stl.sbbot} onClick={(e) => handleSubmit(e)} type='submit'> Buscar</button>
        </div>
    )
}

//se debe crear las actions getactbyname y la ruta sugerir que me dejen hacer activities en el back
