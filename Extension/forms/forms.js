document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  loginTab.addEventListener('click', function () {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    document.getElementById('login-form-wrapper').classList.remove('hidden');
    document.getElementById('register-form-wrapper').classList.add('hidden');
  });

  registerTab.addEventListener('click', function () {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    document.getElementById('register-form-wrapper').classList.remove('hidden');
    document.getElementById('login-form-wrapper').classList.add('hidden');
  });

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch(DOMAIN + "/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        // Save session data in chrome.storage.local
        console.log(data.token);
          window.location.href = '../monitoring/monitoring.html';
      } else {
        alert("❌ Login failed: " + (data.message || "Invalid credentials"));
      }

    } catch (err) {
      console.error(err);
      alert("⚠️ Server error");
    }
  });

  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const repeatPassword = document.getElementById('reg-password2').value;

    if (!email || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(DOMAIN + "/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Registration successful. You can now log in.");
        // Optionally switch to login tab
        document.getElementById('login-tab').click();
      } else {
        alert("❌ Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error");
    }
  });

(async () => {
  try {
    const res = await fetch(DOMAIN + "/api/session/", {
      credentials: 'include'
    });
    const data = await res.json();
    if (data.ok) {
      window.location.href = '../monitoring/monitoring.html';
    }
  } catch (err) {
    // Ignore errors, user will see login/register forms
  }
})();

});
