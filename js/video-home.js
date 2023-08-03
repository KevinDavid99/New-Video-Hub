const userId = Number(localStorage.getItem('UserId')) // This variable takes the authenticated user id stored in localStorage


fetch('https://videohubserversideapi.onrender.com/api/post_items/', {
    method : 'GET',
    headers : {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('Token')}`, // taking the authenticcated user toen to access all data
    }
}).then((data)=>{
    return data.json()
    
}).then(alldata =>{
    let loadingmsg = document.getElementById('loadingmessage');
    if (alldata) {
        loadingmsg.style.display = 'none'
    }

    console.log(alldata);

    let eachData = ''
    alldata.map(values=>{
        eachData +=
        `
        <div class="card" data-id="${values.id}">
          <a href="" id="video-link"><img src="${values.image_url}" alt="Image from cloud" id="video-img"></a>
            <div class="card-caption">
              <div style="text-align: left; padding-top: 0px; padding-bottom: 9px; id="vid-title">${values.title}</div>
              <div class="category">
                <div id="vid-username">${values.users.username}</div>
                <div class="category-name" id="vid-category">${values.category.name}</div>
              </div>
            </div>
        </div>

        `
    })
    document.getElementById('gallery').innerHTML = eachData
})







//----------------------SEARCH FUNCTIONALITY--------------------//

const searchedWord = document.getElementById('searchedWord');
const searchBtn = document.getElementById('search')



searchBtn.addEventListener('click', ()=>{
    const searchValue = searchedWord.value
    location.href = `/searched.html?search=${encodeURIComponent(searchValue)}` //Getting the word serched from the url
})


let btnCards = document.getElementById('gallery')

btnCards.addEventListener('click', (e)=>{

    const videoImage = e.target.id == 'video-link'
    if(videoImage){
        let cardDiv = e.target.closest('.card')
        let cardContent = cardDiv.dataset.id

        location.href = `/video-detail.html?id=${encodeURIComponent(cardContent)}`
    }
})


    



// -----------------------DELETE POST FUNCTIONALITY---------------------------//

// let btnCards = document.getElementById('gallery')
// btnCards.addEventListener('click', (e)=>{
//     // console.log(e.target.id);
//     // e.preventDefault()
//     let deleteBtn = e.target.id == 'delete-post'
//     let editBtn = e.target.id == 'edit-post'
//     // const videoImage = e.target.id == 'video-link'


//     if(deleteBtn){
//         let cardDiv = e.target.closest('.card')
//         let cardContent = cardDiv.dataset.id
        
        
//         fetch(`https://videohubserversideapi.onrender.com/api/post_items/${cardContent}/`,{
//             method : 'DELETE',
//             headers : {
//                 'Authorization': `Token ${localStorage.getItem('Token')}`,
//             },

//         })
//         .then((res) => {
//             console.log(res);
//             return res.json()
//         })
//         .then(()=> location.reload())
//         .catch(err => console.log(err))
//     }
// // -----------------------EDIT POST FUNCTIONALITY---------------------------//
//     if(editBtn){

//         let cardDiv = e.target.closest('.card')
//         let cardContent = cardDiv.dataset.id

//         let contnt = e.target.closest('.card')
//         let titleContent = contnt.querySelector('.card_title').textContent
//         let imageContent = contnt.querySelector('.card__image').src
//         let videoContent = contnt.querySelector('.card__video').href
//         let categContent = contnt.querySelector('.card__link').textContent

//         localStorage.setItem('editData', JSON.stringify({
//             postId : cardContent,
//             title: titleContent.slice(24),
//             image: imageContent.slice(75),
//             video: videoContent.slice(77),
//             category: categContent
//           }));
          

//           location.href = 'postUpdate.html'
//     }



// //     // if(videoImage){
// //     //     let cardDiv = e.target.closest('.card')
// //     //     let cardContent = cardDiv.dataset.id

// //     //     location.href = `/video-detail.html?id=${encodeURIComponent(cardContent)}`
// //     // }

    




// })

fetch('https://videohubserversideapi.onrender.com/api/user/', {
    method : 'GET',
    headers : {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('Token')}`, // taking the authenticcated user toen to access all data
    }
}).then((response)=> response.json())
.then((data)=>{
    console.log(data);
    localStorage.setItem('UserId', data.id)
    localStorage.setItem('Username', data.username)
}).catch((err)=> console.log(err))



