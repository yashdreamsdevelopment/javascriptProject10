const meals = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const randomMeal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await randomMeal.json();
  const mealData = data.meals[0];

  addMeal(mealData, true);
}

async function getMealById(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();
  const mealData = data.meals[0];

  return mealData;
}

async function getMealsBySearch(term) {
  const response =
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}
    `);

  const data = await response.json();
  const meal = data.meals;

  return meal;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meals");

  meal.innerHTML = `
        <div class="meal">
            <div class="meal-header">
                <img src="${mealData.strMealThumb}" alt="${mealData.strTags}">

                ${
                  random
                    ? `<span class="random">
                                Random Recipe
                            </span>`
                    : ""
                }
                
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button aria-meal-id=${mealData.idMeal} class="fav-btn">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", (e) => {
    btn.classList.toggle("active");
    const currentMealId = btn.getAttribute("aria-meal-id");

    if (!btn.classList.contains("active")) {
      removeMealFromLocalStorage(currentMealId);
      btn.classList.remove("active");
    } else {
      addMealToLocalStorage(currentMealId);
      btn.classList.add("active");
    }
  });

  meals.appendChild(meal);
}

function removeMealFromLocalStorage(mealId) {
  const mealsIds = getMealsFromLocalStorage();

  localStorage.setItem(
    "mealsId",
    JSON.stringify(mealsIds.filter((id) => id !== mealId))
  );

  window.location.reload();
}

function addMealToLocalStorage(mealId) {
  const mealsIds = getMealsFromLocalStorage();

  if (mealsIds !== null) {
    localStorage.setItem("mealsId", JSON.stringify([...mealsIds, mealId]));
  } else {
    localStorage.setItem("mealsId", JSON.stringify([mealId]));
  }

  window.location.reload();
}

function getMealsFromLocalStorage() {
  const meals = localStorage.getItem("mealsId");

  return JSON.parse(meals);
}

async function fetchFavMeals() {
  const mealsIds = getMealsFromLocalStorage();
  console.log(mealsIds);

  for (let i = 0; i < mealsIds.length; i++) {
    const mealId = mealsIds[i];

    const mealDetailsById = await getMealById(mealId);
    addMealFav(mealDetailsById);
  }
}

function addMealFav(mealData) {
  const favMeals = document.createElement("li");

  favMeals.innerHTML = `
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                <span>${mealData.strMeal.substr(0, 5)}...</span>
                <button aria-meal-id="${
                  mealData.idMeal
                }" class="close">X</button>
                `;

  const removeFavMealBtn = favMeals.querySelector(".close");

  removeFavMealBtn.addEventListener("click", () => {
    const mealId = removeFavMealBtn.getAttribute("aria-meal-id");

    removeMealFromLocalStorage(mealId);
  });

  favoriteContainer.appendChild(favMeals);
}

searchBtn.addEventListener("click", async () => {
  meals.innerHTML = "";
  const search = searchTerm.value;

  const mealsItem = await getMealsBySearch(search);

  if (mealsItem) {
    mealsItem.forEach((meal) => {
      addMeal(meal);
    });
  } else {
    meals.innerHTML = `<h2>No result found for ${search}</h2>`;
  }
});
