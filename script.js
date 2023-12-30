const container = document.getElementById("current-image-container");
const your_api_key = "BoinOXgqkTwVR71I2IhVs0R6mhvckVTyAe7khXGD";
/////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    // display search history onPageLoad
    addSearchToHistory();
    ////////////////
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchDate = document.getElementById('search-input').value;
        getImageOfTheDay(searchDate, false);
        saveSearch(searchDate);
        addSearchToHistory();
    });
    //////////////////////////////////////
    const previousSearches = document.getElementById("search-history");
    previousSearches.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI'){
            const selectedDate = event.target.textContent;
            getImageOfTheDay(selectedDate);
        }
    });
});

