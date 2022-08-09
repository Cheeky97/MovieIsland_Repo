import "bootstrap/dist/css/bootstrap.min.css"
import {useState, useEffect} from 'react'
import './App.css';
import AddFavourite from "./Components/AddFavourites";
import Login from "./Components/Login";
import MovieList from './Components/MovieList';
import FavouriteMovieList from './Components/FavouriteMovieList';
import MovieListHeading from "./Components/MovieListHeading";
import RemoveFavourites from "./Components/RemoveFavourites";
import SearchBox from "./Components/SearchBox";
import SignIn from "./Components/SignIn";
import { useSelector, useDispatch } from "react-redux";
import { AddFavourite_Movies } from "./Redux/apiCall";
import Logout from "./Components/Logout";
import { addFavouriteMovieId} from "./Redux/userRedux";
import service from "./service";

function App() {
  const user = useSelector(state=> state.currentUser);
  const favArray = user ? (user.favourite_movies ? user.favourite_movies.split(",") : []) : [];
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState(favArray);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com?s=${searchValue}&apikey=268d62be`;

  const response = await fetch(url);
  const responseJson = await response.json();
  if(responseJson.Search){
    setMovies(responseJson.Search);
  }
  
}

useEffect(()=>{
  const movieFavourites = user ? service(movieId) : [];
  setTimeout(() => { setFavourites(movieFavourites);}, 1000);
},[])


const AddFavouriteMovie = (movie) => {

  if(user){
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  
    if((favArray.length === 0) || !(favArray.filter(x=>x === movie.imdbID).length > 0)){
      const newMovieId = [...favArray, movie.imdbID];
      setMovieId(newMovieId);
      AddFavourite_Movies(user.id, [...newMovieId.filter(n => n)]);
      dispatch(addFavouriteMovieId(newMovieId.toString()));

    }
  }else{
    alert("Please login to add movies to favourites");
  }

};

const RemoveFavouriteMovie = (movie) => {
  if(user){
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);

    if(favArray.length > 0){
      const newMovieId = favArray.filter(x=> x !== movie.imdbID);
      console.log(newMovieId);
      AddFavourite_Movies(user.id, [...newMovieId.filter(n => n)]);
      dispatch(addFavouriteMovieId(newMovieId.toString()));
    }
  
  }
  
}

useEffect(()=>{
  getMovieRequest(searchValue);
}, [searchValue]);



  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movie Island"/>
        <SignIn/>
        {user ? <Logout/> : <Login/>}
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList movies = {movies} handleFavourites={AddFavouriteMovie} favouriteComponent={AddFavourite}/>
      </div>
      {user ? 
        <>
          <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieListHeading heading="Favourites"/>
          </div>
          <div className="row">
            <FavouriteMovieList movies = {favourites} handleFavourites={RemoveFavouriteMovie} favouriteComponent={RemoveFavourites}/>
          </div>
        </> : 
        <>
          <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieListHeading heading="Favourites"/>
          </div>
        </>
      }
    </div>
  );
}

export default App;
