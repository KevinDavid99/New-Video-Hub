const urlWordSearch = window.location.search
const urlWord = new URLSearchParams(urlWordSearch)

const video_id = urlWord.get('id')

if(video_id){
    const videoContainer = document.getElementById('video-card');

    fetch(`https://videohubserversideapi.onrender.com/api/post_items/${video_id}/`, {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('Token')}`,
        }
    })
    .then((response)=>{
        return response.json()
    })
    .then((videoUrl)=>{
        if (videoUrl){
            const videodata = ''
            videoUrl.map((vid)=>{
                videodata += `
                <div class="video-container">
                    <video controls>
                        <source src="${vid.video_url}" type="video/mp4" id="video-url">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="text-container">
                    <h2>${vid.title}</h2>
                    <br>
                    <p>Username: ${vid.users.username}</p>
                    <br>
                    <p>Category: ${vid.category}</p>
                    <br>
                    <div class="option">`

                    if(vid.users.id === userId){
                        videodata+=`
                        <a class='option' href="" id="edit-post">Edit</a>
                        <a class='option' href="" id="delete-post">Delete</a>
                    `}
                    videodata+=
                    `
                    </div>
                </div>
                `
            })
            videoContainer.innerHTML = videodata;
        }
    })
}


let btnCards = document.getElementById('gallery')
btnCards.addEventListener('click', (e)=>{
    // console.log(e.target.id);
    // e.preventDefault()
    let deleteBtn = e.target.id == 'delete-post'
    let editBtn = e.target.id == 'edit-post'


    if(deleteBtn){
        let cardDiv = e.target.closest('.card')
        let cardContent = cardDiv.dataset.id
        
        
        fetch(`https://videohubserversideapi.onrender.com/api/post_items/${cardContent}/`,{
            method : 'DELETE',
            headers : {
                'Authorization': `Token ${localStorage.getItem('Token')}`,
            },

        })
        .then((res) => {
            console.log(res);
            return res.json()
        })
        .then(()=> location.href = 'video-home.html')
        .catch(err => console.log(err))
    }
// -----------------------EDIT POST FUNCTIONALITY---------------------------//
    if(editBtn){

        let cardDiv = e.target.closest('.card')
        let cardContent = cardDiv.dataset.id

        let contnt = e.target.closest('.card')
        let titleContent = contnt.getElementById('vid-title').textContent
        let imageContent = contnt.getElementById('video-img').src
        let videoContent = contnt.getElementById('video-link').href
        let categContent = contnt.getElementById('vid-category').textContent

        localStorage.setItem('editData', JSON.stringify({
            postId : cardContent,
            title: titleContent.slice(24),
            image: imageContent.slice(75),
            video: videoContent.slice(77),
            category: categContent
          }));
          

          location.href = 'video-update.html'
    }
})