// websites.js
window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('websites_data') || '{}');
  const category = data.category || '';
  let websites = data.websites || [];
  document.getElementById('category-title').textContent = category ? `Websites for ${category}` : 'Websites';
  const listDiv = document.getElementById('websites-list');

  // Sort websites by start date (ascending)
  websites.sort((a, b) => new Date(a.start) - new Date(b.start));

  if (websites.length === 0) {
    listDiv.innerHTML = '<span style="color:#888;">No websites found for this category in the selected range.</span>';
  } else {
    listDiv.innerHTML = websites.map(site => {
      // Format times user-friendly
      const formatDate = timestamp => {
        if (!timestamp) return '';
        const d = new Date(timestamp);
        const day = d.getUTCDate().toString().padStart(2, '0');
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = d.getUTCFullYear();
        const hours = d.getUTCHours().toString().padStart(2, '0');
        const minutes = d.getUTCMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
      };
      const start = site.start ? formatDate(site.start) : '';
      const end = site.end ? formatDate(site.end) : '';
      return `<div class="website-item">
        <div class="website-url">${site.url}</div>
        <div class="website-time">${start} - ${end}</div>
      </div>`;
    }).join('');
  }
  document.getElementById('back-btn').onclick = () => {
    // Save last used dates to localStorage for restoring
    if (websites.length > 0 && websites[0].start && websites[websites.length-1].end) {
      localStorage.setItem('monitoring_last_from', websites[0].start);
      localStorage.setItem('monitoring_last_to', websites[websites.length-1].end);
    }
    window.location.href = '../monitoring/monitoring.html';
  };
});
