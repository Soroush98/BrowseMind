const categories = [
  "news", "social media", "communication", "entertainment", "education", "shopping",
  "finance", "technology", "health", "travel", "government", "legal", "adult",
  "religion", "politics", "career", "real estate", "automotive", "food",
  "lifestyle", "sports", "science", "web services", "email", "illegal"
];

const chartData = {
  labels: categories,
  datasets: [{
    data: Array(categories.length).fill(0),
    backgroundColor: [
      '#4F81BD', '#C0504D', '#9BBB59', '#8064A2', '#F79646', '#2C4D75', '#B7DEE8',
      '#FFD700', '#FF69B4', '#8B0000', '#00CED1', '#228B22', '#FF8C00', '#8A2BE2',
      '#A52A2A', '#5F9EA0', '#D2691E', '#6495ED', '#DC143C', '#008B8B', '#B8860B',
      '#006400', '#BDB76B', '#8B008B', '#556B2F', '#FF4500'
    ]
  }]
};

const ctx = document.getElementById('piechart_3d').getContext('2d');
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: chartData,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Time Spent by Category'
      }
    }
  }
});
(async () => {
  fetch(DOMAIN + '/api/session/', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) {
        window.location.href = '../forms/forms.html';
        return null;
      }
      return res.json();
        })
        .then(res => {
      if (!res) return;
      console.log("[✓] User is logged in as:", res.email);
      const userInfoDiv = document.getElementById('user-info');
      if (userInfoDiv) {
        userInfoDiv.textContent = `User: ${res.email}`;
      }
        })
        .catch(() => {
      window.location.href = '../forms/forms.html';
    });
})();

// Restore last used dates if available
window.addEventListener('DOMContentLoaded', () => {
  const from = localStorage.getItem('monitoring_last_from');
  const to = localStorage.getItem('monitoring_last_to');
  if (from) document.getElementById('from-date').value = from.slice(0, 16); // 'YYYY-MM-DDTHH:mm'
  if (to) document.getElementById('to-date').value = to.slice(0, 16);
  // Optionally clear after restoring
  localStorage.removeItem('monitoring_last_from');
  localStorage.removeItem('monitoring_last_to');

  // Hide chart and related labels until user submits dates
  document.getElementById('piechart_3d').style.display = 'none';
  if (chart.options.plugins && chart.options.plugins.title) {
    chart.options.plugins.title.display = false;
    chart.update();
  }
  const chartLegend = document.querySelector('.chartjs-legend');
  if (chartLegend) chartLegend.style.display = 'none';
});

// Logout button
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    fetch(DOMAIN + '/api/logout/', {
      method: 'POST',
      credentials: 'include'
    }).finally(() => {
      window.location.href = '../forms/forms.html';
    });
  });
}


// Store last used UTC dates for category click
let lastFromUTC = null;
let lastToUTC = null;

// Function to hide chart and show logout button
function hideChartAndShowLogout() {
  document.getElementById('piechart_3d').style.display = 'none';
  // Hide chart labels/title
  if (chart.options.plugins && chart.options.plugins.title) {
    chart.options.plugins.title.display = false;
    chart.update();
  }
  // Optionally hide other labels if present
  const chartLegend = document.querySelector('.chartjs-legend');
  if (chartLegend) chartLegend.style.display = 'none';
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.style.display = 'block';
    logoutBtn.style.margin = '60px auto';
    logoutBtn.style.position = 'relative';
    logoutBtn.style.left = '0';
    logoutBtn.style.right = '0';
    logoutBtn.style.top = '0';
    logoutBtn.style.bottom = '0';
  }
}

// Date selector submit logic
const dateSubmitBtn = document.getElementById('date-submit');
if (dateSubmitBtn) {
  dateSubmitBtn.addEventListener('click', function() {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;
    const timezone = document.getElementById('timezone-select').value;
    if (!fromDate || !toDate) {
      chart.data.datasets[0].data = Array(categories.length).fill(0);
      chart.update();
      document.getElementById('category-listing').style.display = 'none';
      alert('Please select both dates.');
      return;
    }
    // Convert local datetime to UTC string based on selected timezone
    function toUTCString(localDateTime, tz) {
      // localDateTime: 'YYYY-MM-DDTHH:mm' (from input)
      const [date, time] = localDateTime.split('T');
      const [year, month, day] = date.split('-').map(Number);
      const [hour, minute] = time.split(':').map(Number);
      // Create a Date object in the selected timezone
      const dt = new Date(Date.UTC(year, month - 1, day, hour, minute));
      // Use Intl to get the offset for the selected timezone
      const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      const parts = fmt.formatToParts(dt);
      const y = parts.find(p => p.type === 'year').value;
      const m = parts.find(p => p.type === 'month').value;
      const d = parts.find(p => p.type === 'day').value;
      const h = parts.find(p => p.type === 'hour').value;
      const min = parts.find(p => p.type === 'minute').value;
      // Create a date in the selected timezone, then get its UTC equivalent
      const local = new Date(`${y}-${m}-${d}T${h}:${min}:00`);
      // Get the offset between the selected timezone and UTC
      const tzOffset = (local.getTime() - dt.getTime()) / 60000;
      // Adjust the original date by the offset
      const utcDate = new Date(dt.getTime() - tzOffset * 60000);
      return utcDate.toISOString();
    }
    const fromUTC = toUTCString(fromDate, timezone);
    const toUTC = toUTCString(toDate, timezone);
    lastFromUTC = fromUTC;
    lastToUTC = toUTC;
    fetch(DOMAIN + '/api/selector/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ from: fromUTC, to: toUTC })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.shares) {
        const sharesArr = categories.map(cat => (data.shares[cat] || 0));
        chart.data.datasets[0].data = sharesArr;
        // Hide chart labels/title if all shares are 0
        if (sharesArr.every(val => val === 0)) {
          if (chart.options.plugins && chart.options.plugins.title) {
            chart.options.plugins.title.display = false;
          }
          chart.update();
          document.getElementById('category-listing').style.display = 'none';
          hideChartAndShowLogout();
          // Show centered error div
          let errorDiv = document.getElementById('no-data-error');
          if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'no-data-error';
            errorDiv.style.display = 'flex';
            errorDiv.style.justifyContent = 'center';
            errorDiv.style.alignItems = 'center';
            errorDiv.style.height = '200px';
            errorDiv.style.fontSize = '20px';
            errorDiv.style.color = '#C0504D';
            errorDiv.style.fontWeight = 'bold';
            errorDiv.style.textAlign = 'center';
            errorDiv.textContent = 'No browsing data between these times';
            document.querySelector('.container').appendChild(errorDiv);
          } else {
            errorDiv.style.display = 'flex';
          }
        } else {
          if (chart.options.plugins && chart.options.plugins.title) {
            chart.options.plugins.title.display = true;
          }
          chart.update();
          document.getElementById('piechart_3d').style.display = 'block';
          const logoutBtn = document.getElementById('logout-btn');
          if (logoutBtn) logoutBtn.style.display = '';
          // Hide error div if present
          let errorDiv = document.getElementById('no-data-error');
          if (errorDiv) errorDiv.style.display = 'none';
        }
      } else {
        chart.data.datasets[0].data = Array(categories.length).fill(0);
        if (chart.options.plugins && chart.options.plugins.title) {
          chart.options.plugins.title.display = false;
        }
        chart.update();
        document.getElementById('category-listing').style.display = 'none';
        hideChartAndShowLogout();
        // Show centered error div
        let errorDiv = document.getElementById('no-data-error');
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.id = 'no-data-error';
          errorDiv.style.display = 'flex';
          errorDiv.style.justifyContent = 'center';
          errorDiv.style.alignItems = 'center';
          errorDiv.style.height = '200px';
          errorDiv.style.fontSize = '20px';
          errorDiv.style.color = '#C0504D';
          errorDiv.style.fontWeight = 'bold';
          errorDiv.style.textAlign = 'center';
          errorDiv.textContent = 'No browsing data between these times';
          document.querySelector('.container').appendChild(errorDiv);
        } else {
          errorDiv.style.display = 'flex';
        }
      }
    })
    .catch(err => {
      chart.data.datasets[0].data = Array(categories.length).fill(0);
      chart.update();
      document.getElementById('category-listing').style.display = 'none';
      hideChartAndShowLogout();
      alert('Failed to send dates.');
    });
  });
}

// Category click handler for chart
chart.options.onClick = function (evt, elements) {
  if (!elements.length) return;
  const idx = elements[0].index;
  const category = categories[idx];
  if (!lastFromUTC || !lastToUTC) {
    alert('Please select a date range first.');
    return;
  }
  fetch(DOMAIN + '/api/category_listing/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ from: lastFromUTC, to: lastToUTC, category })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success && Array.isArray(data.websites)) {
        // Save data to localStorage and navigate to websites.html
        localStorage.setItem('websites_data', JSON.stringify({
          category,
          websites: data.websites
        }));
       
        window.location.href = '../websites/websites.html';
      } else {
        alert('No websites found for this category in the selected range.');
      }
    })
    .catch(() => {
      alert('Failed to load category listing.');
    });
};
