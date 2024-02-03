const apiKey = '9980786f';
    const apiUrl = 'https://www.omdbapi.com/';

    const searchInput = document.getElementById('searchInput');
    const moviesList = document.getElementById('moviesList');

    let debounceTimer;

    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
          searchMovies(searchTerm);
        } else {
          clearMoviesList();
        }
      }, 300);
    });

    async function searchMovies(query) {
      const response = await fetch(`${apiUrl}?apikey=${apiKey}&s=${query}`);
      const data = await response.json();

      if (data.Search) {
        displayMovies(data.Search);
      } else {
        clearMoviesList();
      }
    }

    async function displayMovies(movies) {
      clearMoviesList();

      for (const movie of movies) {
        const li = document.createElement('li');
        li.classList.add('movie');
        li.innerHTML = `
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" alt="${movie.Title} Poster">
          <div>
            <h2>${movie.Title}</h2>
            <p><strong>IMDb Rating:</strong> ${movie.imdbRating ? movie.imdbRating : 'N/A'}</p>
            <p><strong>Duration:</strong> ${movie.Runtime ? movie.Runtime : 'N/A'}</p>
            <p><strong>Release Year:</strong> ${movie.Year ? movie.Year : 'N/A'}</p>
          </div>
        `;
        moviesList.appendChild(li);
      }
    }

    function clearMoviesList() {
      moviesList.innerHTML = '';
    }