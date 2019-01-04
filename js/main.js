$(document).ready(() => {             //document load
    $("#searchForm").on("submit", (e) => {
       let searchText =  $('#searchText').val(); //inputted search text
       getMovies(searchText);
        e.preventDefault();   //no submit on enter
    })
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?apikey=thewdb&s='+searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = "";
            $.each(movies, (index, movie) =>{
                output += `
                <div class="col-md-3">
                   <div class="card text-center">
                     <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                     <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                   </div>
                </div>
                `;
            })

            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        })
 
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId')

    axios.get('http://www.omdbapi.com/?apikey=thewdb&i='+movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>Rotten Tomatoes Rating:</strong> ${movie.Ratings[1].Value}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="container">
                
                    <div class="row card text-center plot">
                    <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <div class="button-box col-xs-12">
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-success"> View IMDB</a>
                        <a href="index.html" class="btn btn-primary">Go back to movies</a>
                        </div>
                    </div>
            </div>
            
            `;
        
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}