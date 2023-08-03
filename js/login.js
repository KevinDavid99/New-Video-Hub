const formPage = document.getElementById('form');
const loginusername = document.getElementById('username');
const loginpassword = document.getElementById('password');
const loadingMessage = document.getElementById('loadingicon');



const errorMessage = (element, message)=>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error')
    
    errorDisplay.innerText = message;
    inputControl.classList.add('error')
    inputControl.classList.remove('success')

}

const successMessage = (element)=>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error')
    
    errorDisplay.innerText = '';
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}


const validateInputs = () =>{
    const usernameValue = loginusername.value.trim()
    const passwordValue = loginpassword.value.trim()

    function checkNameSpace(username){
        return username.indexOf(' ') >=0
    }

    const nameSpace = checkNameSpace(usernameValue)

    if(usernameValue === ''){
        errorMessage(loginusername, 'Username is required')
    } else if(nameSpace == true){
        errorMessage(loginusername, 'Username should not have whitespace')
    } else{
        successMessage(loginusername)
    }
    

    if(passwordValue === ''){
        errorMessage(loginpassword, 'Password is required')
    } else if(passwordValue.length < 6){
        errorMessage(loginpassword, 'Password must be atleast 6 characters')
    } else{
        successMessage(loginpassword)
    }
}   



formPage.addEventListener('submit', (e)=>{
    e.preventDefault()

    validateInputs()

    const inputsWithError = document.querySelectorAll('.input-control.error');
    if (inputsWithError.length === 0) {


    loadingMessage.style.display = 'flex'

    const loginForm = new FormData

    loginForm.append('username', loginusername.value);
    loginForm.append('password', loginpassword.value);


    
    fetch('https://videohubserversideapi.onrender.com/api/login/', {
        method : 'POST',
        body : loginForm,
        headers : {
            'Authorization': `Token ${localStorage.getItem('Token')}`
        }
    })
    .then((response)=> {
        if(response.ok){
            return response.json()
        }else{
            console.log('Network was not ok');
        }
    })
    .then((data)=> {
        console.log(data);
        if(data.token!== 'undefined'){
            localStorage.getItem('Token')
        }
        location.href = '/video-home.html'

    })
    .catch((err)=> {
        console.log(err);
        
        loadingMessage.style.display = 'none'
    })
    .finally(()=>{
        form.reset()
    })
    }

    
})

