
const FavouriteMovieList = (props) => {
  const Favourites = props.favouriteComponent;
    return(
        <>
            {props.movies.length>0 && props.movies.map((movie, index)=> (
                <div className='image-container' key={index}>
                  <div>
                    <p>{movie.Year}</p>
                  </div>
                  <div>
                    <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title}/>
                  </div>
                  <div>
                    <span>{movie.Type}</span>
                    <h3>{movie.Title}</h3>
                  </div>
                    <div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.handleFavourites(movie)}>
                        <Favourites/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default FavouriteMovieList
