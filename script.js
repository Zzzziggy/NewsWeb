const API_KEY = "5dd162e032bd435c8810227918f2c046";
const url = "https://newsapi.org/v2/everything?apiKey=";

async function fetchData(query) {
    try {
        const res = await fetch(`${url}${API_KEY}&q=${query}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

fetchData("all").then(data => {
    if (data) {
        renderMain(data.articles);
    } else {
        console.error("No data available");
    }
});

// Menu button functionality
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
});

// Render news function
function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += `<div class="card">
                            <a href="${arr[i].url}">
                                <img src="${arr[i].urlToImage}" alt="News Image" loading="lazy" />
                                <h4>${arr[i].title}</h4>
                                <div class="publishbyDate">
                                    <p>${arr[i].source.name}</p>
                                    <span>•</span>
                                    <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                                </div>
                                <div class="desc">
                                    ${arr[i].description}
                                </div>
                            </a>
                         </div>`;
        }
    }

    document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(searchInput.value);

    const data = await fetchData(searchInput.value);
    if (data) {
        renderMain(data.articles);
    }
});

searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInputMobile.value);
    if (data) {
        renderMain(data.articles);
    }
});

async function Search(query) {
    const data = await fetchData(query);
    if (data) {
        renderMain(data.articles);
    }
}
