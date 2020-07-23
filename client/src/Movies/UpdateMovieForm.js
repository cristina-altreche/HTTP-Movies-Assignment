import React, { useState, useEffect } from 'react'
import {useLocation, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialForm = {
    title: "",
    director:"",
    metascore: "",
}

const UpdateMovieForm = props => {
    const { push } = useHistory()
    //this is state for this component only 
    const [form, setForm] = useState(initialForm)
    const location  = useLocation()
    const  params  = useParams()

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${form.id}`, form)
            .then(() => {
                axios
                    .get("http://localhost:5000/api/movies")
                    .then(res => {
                        props.setMovieList(res.data)
                        push(`/movies/${form.id}`)
                    })
                    .catch(err => console.log(err.response));
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if(location.state){
            setForm(location.state)
        }else{
            axios
                .get(`http://localhost:5000/api/movies/${params.id}`)
                .then(res => setForm(res.data))        
                .catch(err => console.log(err))
        }
    },[])

    return (
        <div className='form-container'>
            <h1>- Update a Movie -</h1>
            <form onSubmit={handleSubmit} className='update-form'>
                <label>Title: &nbsp;
                    <input
                    type='text'
                    name='title'
                    value={form.title}
                    onChange={handleChange}
                    />
                </label>
                <label>Director: &nbsp;
                    <input 
                    type='text'
                    name='director'
                    value={form.director}
                    onChange={handleChange}
                    />
                </label>
                <label>Metascore: &nbsp;
                    <input 
                    type='number'
                    name='metascore'
                    value={form.metascore}
                    onChange={handleChange}
                    />
                </label>
                <button type='submit'>Update</button>
            </form>
        </div>
    )

    }

    export default UpdateMovieForm