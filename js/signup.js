const formPage = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const loadingIcon = document.getElementById('loadingIcon');

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
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const password2Value = password2.value.trim()

    function checkNameSpace(username){
        return username.indexOf(' ') >=0
    }

    const nameSpace = checkNameSpace(usernameValue)

    if(usernameValue === ''){
        errorMessage(username, 'Username is required')
    } else if(nameSpace == true){
        errorMessage(username, 'Username should not have whitespace')
    } else{
        successMessage(username)
    }



    if(emailValue === ''){
        errorMessage(email, 'Email is required')
    } else{
        successMessage(email)
    }
    
    
    if(passwordValue === ''){
        errorMessage(password, 'Password is required')
    } else if(passwordValue.length < 6){
        errorMessage(password, 'Password must be atleast 6 characters')
    } else{
        successMessage(password)
    }
    

    if(password2Value === ''){
        errorMessage(password2, 'Password Confirmation is required')
    } else if(passwordValue !== password2Value ){
        errorMessage(password2, 'Password does not match')
    } else{
        successMessage(password2)
    }
    
}




formPage.addEventListener('submit', (e)=>{
    e.preventDefault()

    validateInputs()

    const inputsWithError = document.querySelectorAll('.input-control.error');
    if (inputsWithError.length === 0) {

        loadingIcon.style.display = 'flex'
        const loginForm = new FormData

        loginForm.append('username', username.value);
        loginForm.append('password', password.value);
    
        fetch('https://videohubserversideapi.onrender.com/api/register/', {
            method : 'POST',
            body : loginForm,
        })
        .then((response) => {
            if(response.ok){
                location.href = '/index.html'
                return response.json()
            }else{
                console.log('Network response was not ok');
            }
        }
        ).then(data =>{
            console.log(data);
            if(data){
                localStorage.setItem('Token', data.token)
            }
        })
        .catch((error) => {
            console.log(error)

            loadingIcon.style.display = 'none'
        })
        .finally(()=> form.reset())
    }

})    



    