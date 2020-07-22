import React, { useState, useEffect } from 'react'
import {useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title: "",
    director:"",
    metascore:"",
    stars: []
}

const UpdateMovieForm = props => {
    const { push } = useHistory()
    //this is state for this component only 
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    })

    const handleChange = e => {
        e.persist()
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            props.setMovie(res.data)
            push(`/${id}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={movie.title}
                />
                <input
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
                />
                <input
                type="text"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={movie.metascore}
                />
                <input
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Actors"
                value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )

    }

    export default UpdateMovieForm