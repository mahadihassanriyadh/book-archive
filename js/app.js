document.getElementById('spinner').style.display = 'none';
// getting value from the search field
const searchBook = () => {
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('search-result-volume').style.display = 'none';

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // const url = `https://openlibrary.org/search.json?q=${searchText}/?_limit=100`; 
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data))
}

const displayResult = (searchResults) => {
    // console.log(searchResults.numFound);
    const div = document.getElementById('search-result-volume');
    const p = document.createElement('p');
    div.textContent = '';
    p.innerText = `${searchResults.numFound} results found for your search`;
    div.appendChild(p);


    const searchResultField = document.getElementById('search-result');
    searchResultField.textContent = '';
    console.log(searchResults.docs);

    searchResults.docs.forEach(result => {
        console.log(result);
        // console.log(result.author_name);
        const cover_i = result.cover_i;
        const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`

        const div = document.createElement('div');
        div.classList.add('col');
        // console.log(result.author_name?.[0]);
        div.innerHTML = `
                <div class="card h-100 m-5 w-100">
                    <img src="${imgUrl}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <p class="card-text"><span class="fw-bold">Author:</span> ${result.author_name?.[0]}</p>
                        <p class="card-text"><span class="fw-bold">Publisher:</span> ${result?.publisher?.[0]}</p>
                        <p class="card-text"><span class="fw-bold">Publish Date:</span> ${result?.publish_date?.[0]}</p>
                    </div>
                </div>
                `;
        searchResultField.appendChild(div);
    })
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('search-result-volume').style.display = 'block';
}


