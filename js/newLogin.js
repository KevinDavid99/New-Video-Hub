const formCard = document.getElementById("form");
const loginUsername = document.getElementById("username");
const loginPassword = document.getElementById("password");
const loadMessage = document.getElementById("loadingicon");

const errorMessage = (element, message) => {
  const inputControls = element.parentElement;
  const errorDisplay = inputControls.querySelector(".error");

  errorDisplay.innerText = message;
  inputControls.classList.add("error");
  inputControls.classList.remove("success");
};

const successMessage = (element) => {
  const inputControls = element.parentElement;
  const errorDisplay = inputControls.querySelector(".error");

  errorDisplay.innerText = "";
  inputControls.classList.add("success");
  inputControls.classList.remove("error");
};

const validateInputs = () => {
  const usernameValue = loginUsername.value.trim();
  const passwordValue = loginPassword.value.trim();

  function checkNameSpace(username) {
    return username.indexOf(" ") >= 0;
  }

  const nameSpace = checkNameSpace(usernameValue);

  if (usernameValue === "") {
    errorMessage(loginUsername, "Username is required");
  } else if (nameSpace == true) {
    errorMessage(loginUsername, "Username should not have whitespace");
  } else {
    successMessage(loginUsername);
  }

  if (passwordValue === "") {
    errorMessage(loginPassword, "Password is required");
  } else if (passwordValue.length < 6) {
    errorMessage(loginPassword, "Password must be atleast 6 characters");
  } else {
    successMessage(loginPassword);
  }
};

formCard.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();

  const inputWithError = document.querySelectorAll(".input-control.error");
  if (inputWithError.length === 0) {
    loadMessage.style.display = "flex";

    const loginForm = new FormData();

    loginForm.append("username", loginUsername.value);
    loginForm.append("password", loginPassword.value);

    fetch("https://videohubserversideapi.onrender.com/api/login/", {
      method: "POST",
      body: loginForm
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Network was not ok");
        }
      })
      .then((data) => {
        console.log(data);
        if (data.token !== "undefined") {
          localStorage.setItem("Token", data.token);
        }
        location.href = "/video-home.html";
      })
      .catch((err) => {
        console.log(err);

        loadMessage.style.display = "none";
      })
      .finally(() => {
        form.reset();
      });
  }

  fetch("https://videohubserversideapi.onrender.com/api/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("Token")}`, // taking the authenticcated user toen to access all data
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("UserId", data.id);
      localStorage.setItem("Username", data.username);
    })
    .catch((err) => console.log(err));
});
