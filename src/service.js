
const service = (movieId) => {
    const tempFavArray = [];
    movieId.length>0 && movieId.forEach(Id => {
        const fetchData = async () => {
            const url = `http://www.omdbapi.com?apikey=268d62be&i=${Id}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            if(responseJson.imdbID){
              tempFavArray.push({"Title": responseJson.Title, "Year": responseJson.Year, "imdbID": responseJson.imdbID, "Type": responseJson.Type, "Poster": responseJson.Poster});
            }
        }
        fetchData();
    });
    console.log(tempFavArray);
    return tempFavArray;
}

export default service
