//Getting RandomMeals from api and calling function to display in html

function fetchRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(result => {
      return result.json();
    })
    .then(finalresponse => {
      let randomMeal=finalresponse.meals[0]
      displayRandomMeal(randomMeal)
      console.log(finalresponse.meals[0])

    })
    .catch(error => {
      console.log('Error:', error);
    });
}
fetchRandomMeal();

function displayRandomMeal(random){
    let randomMealDiv=document.getElementById("randomMealDiv")
    randomMealDiv.innerHTML+=`
    <div class="result-div" id="Modal-open">
    <img class="dish-image" src="${random.strMealThumb}" alt="">
    <h3 class="orange" id="randomDishName">${random.strMeal}</h3>
    </div>`
}


let submitButton=document.getElementById("submit")
submitButton.addEventListener('click',()=>{
    let inputCategory=document.getElementById("input").value
    console.log(inputCategory)
    fetchSearchedMeal(inputCategory)
})


function fetchSearchedMeal(category){
    let categoryApi=`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
    
    fetch(categoryApi)
    
    .then(result=>{
        return result.json()
    })

    .then(response=>{
        
        let searchedCategory=response.meals
        console.log(searchedCategory)
        
        let displayDish=document.getElementById("searchedDish")
        
        displayDish.innerHTML=""
        searchedCategory.forEach(dishes=>{
            displayDish.innerHTML+=`
            <div class="result-div">
                <img class="dish-image" id="Modal-open" src="${dishes.strMealThumb}" alt="">
                <h3 class="orange">${dishes.strMeal}</h3>
            </div>
            `
            console.log(dishes.strMealThumb)
        })
    })
    .catch(error=>{
        console.log(error)
    })
}

let modalOpen=document.getElementById("Modal-open")
modalOpen.addEventListener('click',()=>{
    document.getElementById("modal").style.display="block"
})

let modalClose=document.getElementById("closeBtn")
modalClose.addEventListener('click',()=>{
    document.getElementById("modal").style.display="none"
})