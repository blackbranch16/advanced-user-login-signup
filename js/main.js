// USER LOGIN / SIGNUP

// Sign up inputs
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let passwordVerifyInput = document.getElementById("password-verification");

// Sign in inputs
let signInUsername = document.getElementById("existing-username");
let signInPassword = document.getElementById("existing-password");

// Global Variables
let users = loadUsers();
let signInBtn = document.getElementById("sign-in-btn");
let signUpBtn = document.getElementById("sign-up-btn");
let adminAccess = document.getElementById("admin-password");

// SIGN UP BTN CLICKED
signUpBtn.addEventListener("click", signUpHandler);

function signUpHandler() {
  // Grab input from input values
  let newUsername = usernameInput.value;
  let newPassword = passwordInput.value;
  let localAdminAccess = adminAccess.value;

  console.log(newPassword);

  // Verify using username result
  let loopResult = checkUsername(newUsername);
  console.log("loopResult:", loopResult);

  // Verify using password result
  let loopResult2 = checkPassword(newPassword);
  console.log("loopResult2:", loopResult2);

  // Ensure both inputs aren't empty
  let loopResult5 = ensureContent(newUsername, newPassword);
  console.log("loopResult5:", loopResult5);

  // Use results to consider whether to createUser or not
  if (loopResult == -1 || loopResult2 == -1 || loopResult5 == -1) {

    // Do not create a new user
    alert("New user creation was unsuccessful.")
  } else {
    
    // Create a new user
    users.push(createUser(newUsername, newPassword, localAdminAccess));
    console.log("users:", users);
    loadUsers();
    saveUsers();
    alert("New user created succesfully!")
  }
}

// SIGN IN BTN CLICKED
signInBtn.addEventListener("click", signInHandler);

function signInHandler() {
  // Assign input values for the function 
  let existingUsername = signInUsername.value;
  let existingPassword = signInPassword.value;

  // Check if username exists in username array 
  let loopResult3 = traverseUsername(existingUsername);

  // Check if password matches with previous username
  let loopResult4 = verifyPassword(existingPassword, loopResult3);

  // Sign in / broadcast error message
  if (loopResult3 == -1 || loopResult4 == -1) {
    alert("User login unsuccessful.");
  } else {
    alert("User login successful!");
    displayHomePage();
  }
}

// HELPER FUNCTIONS
function createUser(newUsername, newPassword, adminAccess) {
  return {
    username: newUsername,
    password: newPassword,
    adminAccess: adminAccess,
    name: '',
    trophy: '',
    task: '',
  };
}

function loadUsers() {
  let usersStr = localStorage.getItem("users");
  return JSON.parse(usersStr) ?? [];
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function checkUsername(newUsername) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username.includes(newUsername)) {
      console.log(users[i].username);
      return -1;
    }
  } return 1;
}

function checkPassword(newPassword) {
  if (passwordVerifyInput.value.includes(newPassword) && newPassword.includes(passwordVerifyInput.value)) {
    return 1;
  } else {
    return -1;
  }
}

// Sign in features
function traverseUsername(existingUsername) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username.includes(existingUsername)) {
      return i;
    }
  } return -1;
}

function verifyPassword(existingPassword, index) {
  console.log(index);
  if (users[index].password.includes(existingPassword)) {
    return 1;
  } else {
    return -1;
  }
}

function ensureContent(existingUsername, existingPassword) {
  if (existingUsername == "" || existingPassword == "") {
    return -1;
  } else {
    return 1;
  }
}

// New Home Page JS
// Home Page Code

// Get HTML Elements
let nameSpan = document.getElementById("name");
let trophySpan = document.getElementById("trophies");
let taskSpan = document.getElementById("tasks");

// Load HTML Element Values
nameSpan = users[users.length - 1].name;
trophySpan = users[users.length - 1].trophy;
taskSpan = users[users.length - 1].task;

// Same thing for buttons
let nameBtn = document.getElementById("name-btn");
let trophiesBtn = document.getElementById("trophies-btn");
let tasksBtn = document.getElementById("tasks-btn");

// Create event listeners for buttons
nameBtn.addEventListener("click", enterName);
trophiesBtn.addEventListener("click", enterTrophies);
tasksBtn.addEventListener("click", enterTasks);

// Define each function
function enterName() {
    let username = prompt("What is your name?");
    document.getElementById("name").innerHTML = username;
    users[users.length - 1].name = username;
}

function addUser(username) {
  return {
    name: username,
  };
}

function enterTrophies() {
    let userTrophies = prompt("What is one of your accomplishments?")
    trophySpan.innerHTML += ` <br>- ${userTrophies}`
}

function enterTasks() {
    let userTasks = prompt("What is one of your unfinished tasks?")
    taskSpan.innerHTML += `<br>- ${userTasks}`
}

// meowmeowmeow eowmweo