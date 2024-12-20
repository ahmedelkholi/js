// Fetch data from the JSON file
async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        displayRecommendations(data);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }
}

// Display recommendations dynamically
function displayRecommendations(data) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';
    data.cities.forEach(city => {
        const cityCard = `
            <div class="city-card">
                <img src="${city.imageUrl}" alt="${city.name}">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
            </div>
        `;
        recommendationsDiv.innerHTML += cityCard;
    });
}

// Search functionality
function search() {
    const keyword = document.getElementById('search').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.cities.filter(city => city.description.toLowerCase().includes(keyword));
            displayRecommendations({ cities: filtered });
        })
        .catch(error => console.error("Error during search:", error));
}

// Clear results
function clearResults() {
    document.getElementById('search').value = '';
    fetchRecommendations();
}

// Load recommendations on page load
window.onload = fetchRecommendations;
