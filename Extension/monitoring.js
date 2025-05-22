// monitoring.js
const ctx = document.getElementById('piechart_3d').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Sports', 'News', 'Entertainment', 'Technology', 'Health', 'Finance', 'Education'],
    datasets: [{
      data: [30, 18, 23, 15, 9, 5, 0],
      backgroundColor: [
        '#4F81BD', '#C0504D', '#9BBB59', '#8064A2', '#F79646', '#2C4D75', '#B7DEE8'
      ]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Time Spent by Category'
      }
    }
  }
});

chrome.storage.local.get('email', (result) => {
  const email = result.email || null;
  if (!email) {
    // Redirect to login if not logged in
    window.location.href = 'popup.html';
  } else {
    console.log("[✓] User is logged in as:", email);
  }
});

// Logout button
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    chrome.storage.local.remove('email', function() {
      window.location.href = 'popup.html';
    });
  });
}

