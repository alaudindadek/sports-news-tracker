document.getElementById("notifyBtn").addEventListener("click", function() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    fetchSportsNews();
});

async function fetchSportsNews() {
    const response = await fetch('https://newsapi.org/v2/everything?q=sports&apiKey=f8f56fbd1aa5481c8e9091c122170a8e');
    const data = await response.json();
    displayNews(data.articles);
    if (data.articles.length > 0) {
        data.articles.forEach(article => {
            showNotification(article.title, article.description);
        });
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = ""; // Clear previous news
    articles.forEach(article => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${article.title}</h3><p>${article.description}</p>`;
        newsContainer.appendChild(div);
    });
}

function showNotification(title, body) {
    const options = {
        body: body,
        icon: 'icon-url.png' // URL ของไอคอนการแจ้งเตือน
    };
    new Notification(title, options);
}

// Set interval to fetch news every minute
setInterval(fetchSportsNews, 60000);
