document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const signupContainer = document.getElementById("signup-container");
  const showSignupLink = document.getElementById("show-signup");
  const showLoginLink = document.getElementById("show-login");


  showSignupLink?.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
  });


  showLoginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    signupContainer.style.display = "none";
    loginContainer.style.display = "block";
  });

  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      alert("Login successful!");
      window.location.href = "menu.html";
    } else {
      alert("Invalid email or password.");
    }
  });

 
  const signupForm = document.getElementById("signup-form");
  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const age = parseInt(document.getElementById("signup-age").value);
    const nationalId = document.getElementById("signup-id").value.trim();

    if (!email || !password || !confirmPassword || !age || !nationalId) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (age < 18) {
      alert("You must be at least 18 years old to register.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = { email, password, age, nationalId };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    signupForm.reset();
    signupContainer.style.display = "none";
    loginContainer.style.display = "block";
  });
});
