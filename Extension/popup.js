document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  loginTab.addEventListener('click', function () {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = '';
    registerForm.style.display = 'none';
  });

  registerTab.addEventListener('click', function () {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = '';
    loginForm.style.display = 'none';
  });

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save session data in chrome.storage.local
        chrome.storage.local.set({ email: email }, function() {
          console.log("[✓] Session stored in chrome.storage.local");
        });
        // Redirect to monitoring.html after successful login
        window.location.href = 'monitoring.html';
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

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const repeatPassword = document.getElementById('register-repeat-password').value;

    if (!email || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
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

  // If you want to check login status and redirect to monitoring.html if already logged in:
  chrome.storage.local.get('email', (result) => {
    if (result.email) {
      window.location.href = 'monitoring.html';
    }
  });

});
