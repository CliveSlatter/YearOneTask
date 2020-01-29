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
                            `<th>Title</th>`+
                            `<th>Rating</th>`+
                            `<th>Studio</th>`+
                            `</tr>`;

            for (let movie of movies.moviesList) {
                movieHTML += `<tr class='tableRows unselectable' id="${movie.id}">`+
                             `<td>${movie.title}</td>`+
                            `<td>${movie.rating}</td>`+
                            `<td>${movie.studio}</td>`+
                            `<td>`+
                            `<button id="delete">Delete movie</button>`+
                            `</td>`+
                            `</td>`+
                            `</tr>`;
            }
            movieHTML += `</table>`;
            document.getElementById('movie').innerHTML = movieHTML;

            let tableRows = document.getElementsByClassName('tableRows');
            for(let tr of tableRows){
                tr.addEventListener('dblclick',showDetails);
            }

        }

    });
}

function showDetails(){

    $("#movies tr").dblclick(function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        let value=$(this).find('td:first').html();
        alert(value);
    });

}