const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('userId');

fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
.then(response => response.json())
.then(posts => {
    const userPostsTitle = document.getElementById("userPostsTitle");
    const userPostsList = document.getElementById("userPostsList");

    userPostsTitle.textContent = `User ${userId}'s Posts`;

    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4"; 

        card.innerHTML = `
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
              </div>
            </div>
        `;
        userPostsList.appendChild(card);
    });
})
.catch(error => console.error('Hata:', error));
