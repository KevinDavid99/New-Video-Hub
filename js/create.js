const form = document.getElementById('videoForm');
const imageUpload = document.getElementById('image-upload');
const videoUpload = document.getElementById('video-upload');
let selectCategory = document.getElementById('categorylist');

let loadingIcon = document.getElementById('loading')


fetch('https://videohubserversideapi.onrender.com/api/category_post/',{
}).then(data => data.json()).then((objdata)=>{
    objdata.map(datas =>{
        console.log(datas);
        let select = document.createElement('option')
        selectCategory.appendChild(select)//taking only the category name to be in the value attribute
        select.innerHTML = datas.name
        select.value = datas.name
    })

    form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    loadingIcon.style.display = 'flex'

    let title = document.getElementById('title').value

    let newCategory = objdata.find(category => category.name === selectCategory.value);
    

    const formData = new FormData()

    formData.append('image', fileUpload.files[0]);
    formData.append('video', videoUpload.files[0]);
    formData.append('title', title);
    formData.append('category', newCategory.id);

    fetch('https://videohubserversideapi.onrender.com/api/post_items/', {
        method : 'POST',
        body : formData,
        headers : {
            'Authorization': `Token ${localStorage.getItem('Token')}`
        }
    })
    .then((response)=> {
        response.json()
        loadingIcon.style.display = 'none'
        if(response.ok){
            location.href = '/home.html'
        }
    })
    .then((data)=> console.log(data))
    .catch(err => {
        loadingIcon.style.display = 'none'
        console.log(err)
    });
})
}).catch(err => console.log(err))


 


