function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  meals = document.getElementById("meals"),
  resultShow = document.getElementById("search-heading"),
  food = document.getElementById("food"),
  ingrElement = document.getElementById("ingrElement");

function searchMeal(e) {
  e.preventDefault();
  meals.innerHTML = food.innerHTML = ingrElement.innerHTML = "";
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultShow.innerHTML = `<h3> Search History '${term} :' </h3>`;
        if (data.meals === null) {
          resultShow.innerHTML = `<p> Search not found </p>`;
        } else {
          meals.innerHTML = data.meals.map(meal => `
              <div class = "meal" >
              <img src = "${meal.strMealThumb}" alt = "${meal.strMeal} />"
              <div class ="meal-info" onclick ="ingredients('${meal.idMeal}')"  data-mealID = "${meal.idMeal}" />
              <h4>${meal.strMeal}</h4>
              </div>
              </div>
              `
          )
            .join('');
        }
        search.value = '';
      })
  } else {
    alert('Invalid input');
  };
}

submit.addEventListener('submit', searchMeal);

function ingredients(idMeal) {
  ingrElement.innerHTML = "";
  const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal;
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let ingDet = data.meals;
      console.log(ingDet);
      return ingDet.map(function (ingDet) {
        let div = createNode('div');
        let img = createNode('img');
        let span = createNode('span');
        let ingredientsTitle = createNode('h3');
        let ingredientsDiv = createNode('div');
        let ul = createNode('ul');
        img.src = ingDet.strMealThumb;
        span.innerHTML = `${ingDet.strMeal}`;
        ingredientsTitle.innerHTML = `Ingredients`;
        append(div, img);
        append(div, span);
        append(ingredientsDiv, ingredientsTitle);
        for (i = 1; i < 10; i++) {
          let li = createNode('li');
          li.innerHTML = ingDet['strIngredient' + i];
          append(ul, li);
        }
        append(ingredientsDiv, ul);
        append(div, ingredientsDiv);
        append(ingrElement, div);
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}