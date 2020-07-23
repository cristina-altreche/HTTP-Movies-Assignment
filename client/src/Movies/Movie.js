import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const { push } = useHistory()
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };


  const deleteMovie = e => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(() => {
        axios
        .get("http://localhost:5000/api/movies")
        .then(res => {
          props.setMovieList(res.data)
          push('/')
        })
        .catch(err => console.log(err.response));
      })
      .catch(err => console.log(err))

    }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    
      <div className='update-button' onClick={() => push(`/update-movie/${movie.id}`)}>
        Update
      </div>

      <div className='delete-button' onClick={() => deleteMovie()}>
        Delete
      </div>
    
    </div>
  );
}

export default Movie;
