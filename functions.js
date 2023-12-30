// This function should fetch the data for the selected date from the NASA API and display it in the UI.
// It should also save the date to local storage and also show it in the search history unordered list.
async function getImageOfTheDay(date) {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`
    );
    if (!response.ok){
      throw new Error(`API fetching failed: Please check the API_key or Fetch url`);
    }
    const myData = await response.json();
    if (date == new Date().toISOString().split("T")[0]) {
      displayData(myData, true);
    } else {
      displayData(myData, false);
    }
  } catch (err) {
    // alert("API fetching failed: Please check the API_key or Fetch url");
    alert(err.message);
  }
}

function displayData(myData, isToday) {
  let heading;
  if (isToday) {
    heading = "NASA Picture of the Day";
  } else {
    heading = `Picture On ${myData.date}`;
  }
  container.innerHTML = `
    <h1>${heading}</h1>
    <img src="${myData.url}" alt="Space Image">
    <h3>${myData.title}</h3>
    <p>${myData.explanation}</p>
    `;
  // make the date empty again
  document.getElementById("search-input").value = "";
}

function getCurrentImageOfTheDay() {
  let todayDate = new Date().toISOString().split("T")[0];
  // console.log(todayDate);
  getImageOfTheDay(todayDate, true);
}
// This function should fetch the data for the current date
// from the NASA API and display it in the UI. This function runs when the page loads.

function saveSearch(date) {
  // get the searches array in localStorage
  const searches = getSearchList();
  searches.push({ date: `${date}` });
  localStorage.setItem("searches", JSON.stringify(searches));
}
// This function should save a date to local storage. As shown in the recording,
// you need to just save the dates in an array.

function addSearchToHistory() {
  const previousSearches = document.getElementById("search-history");
  previousSearches.innerHTML = "";
  const searchList = getSearchList();
  for (const item of searchList) {
    const li = document.createElement("li");
    li.innerText = item.date;
    previousSearches.appendChild(li);
  }
}
// This function should add the date to the search history list in the Ui.
// You need to get the searches array from localstorage and display it as an unordered list in the ui.
// When a user clicks on the specific list item, you need to fetch the data for that specific date all over again and show it in the black div.

function getSearchList() {
  // return array if present or else, return empty array
  return JSON.parse(localStorage.getItem("searches")) || [];
}
