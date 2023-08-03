const urlWordSearch = window.location.search
const urlWord = new URLSearchParams(urlWordSearch)

const searchedWords = urlWord.get('search')

if(searchedWords){
    const cardsContainer = document.getElementById('cards');

    fetch(`https://videohubserversideapi.onrender.com/api/post_items/search/?search=${searchedWords}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('Token')}`,
        },
    }).then((response) => {
        return response.json();
    }).then((searchResults) => {
        let loadingmsg = document.getElementById("loading");
        if (searchResults) {
            loadingmsg.style.display = 'none'
        }
        console.log(searchResults);

        if (searchResults) {
            let eachData = '';
            searchResults.map((value) => {
                eachData += `
                <div class="card">
                <a href="${value.video_url}"><img src="${value.image_url}" alt="Image 1"></a>
                  <div class="card-caption">
                    <div class="title">${value.title}</div>
                    <div class="category">
                      <div>${value.users.username}</div>
                      <div  class="category-name">${value.category.name}</div>
                    </div>
                  </div>
              </div>`;
            });
            cardsContainer.innerHTML = eachData;
        }else{
            console.log('no result');
            cardsContainer.innerHTML = '<div class="card"><h1>No result</h1></div>'
        }
    });
}



