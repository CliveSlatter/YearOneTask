function pageLoad(){
    listMovies();
}

function listMovies(){
    fetch('/movie/list/', {method: 'get'}
    ).then(moviesList => moviesList.json()
    ).then(movies => {
        let movieHTML = `<table id="movies">`;
        if (movies.hasOwnProperty('error')) {
            alert(movies.error);
        } else if (movies.hasOwnProperty('moviesList') && movies.moviesList.length > 0) {
            movieHTML+=     `<tr>`+
                            `<th colspan="4" style="text-align: center">Movie List</th>`+
                            `</tr>`+
                            `<tr>`+
                            `<th>Title</th>`+
                            `<th>Rating</th>`+
                            `<th>Studio</th>`+
                            `<th>Release Year</th>`+
                            `</tr>`;

            for (let movie of movies.moviesList) {
                movieHTML += `<tr class='tableRows unselectable' id="${movie.id}">`+
                             `<td>${movie.title}</td>`+
                            `<td>${movie.rating}</td>`+
                            `<td>${movie.studio}</td>`+
                            `<td>${movie.releaseYear}</td>`+
                            `<td>`+
                            `<button id="delete"+${movie.id}>Delete movie</button>`+
                            `</td>`+
                            `</td>`+
                            `</tr>`;
            }
            movieHTML += `</table>`;
            document.getElementById('movie').innerHTML = movieHTML;

            let tableRows = document.getElementsByClassName('tableRows');
            let idx = tableRows.rowIndex;

            for(let tr of tableRows){
                tr.addEventListener('dblclick',function (){showDetails(this.id)},false);
            }
        }
    });
}

function showDetails(idx){
    let characterHTML = ``;
        fetch('/actor/movies/'+idx,{method: 'get'})
            .then(actorList=>actorList.json())
            .then(actors=>{
                console.log(actors.toString())
            if(actors.hasOwnProperty('error')){
                alert(actors.error);
            }else if(actors.hasOwnProperty('movieActors')){
                characterHTML += `<table>`+
                                    `<tr>`+
                                    `<th colspan="2" style="text-align: center">Cast List</th>`+
                                    `</tr>`+
                                    `<tr>`+
                                    `<th>Actor</th>`+
                                    `<th>Character</th>`+
                                    `</tr>`;
                for(let actor of actors.movieActors){
                    characterHTML+= `<tr class="unselectable" id="${actor.id}">`+
                                    `<td>${actor.firstName}`+" "+`${actor.surname}</td>`+
                                    `<td>${actor.character}</td>`+
                                    `</tr>`;
                }
                characterHTML += `</table>`;
                document.getElementById('info').innerHTML=characterHTML;
            }
        })
}