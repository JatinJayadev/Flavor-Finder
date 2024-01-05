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

//Displaying Random Meal
function displayRandomMeal(random){
    let randomMealDiv=document.getElementById("randomMealDiv")
    
    randomMealDiv.innerHTML+=`
    <div class="result-div" id="Modal-open">
    <img class="dish-image" src="${random.strMealThumb}" alt="">
    <h3 class="orange" id="randomDishName">${random.strMeal}</h3>
    </div>`
    
    let mealId=random.idMeal   //Sending meal id into another function to display ingredients on click
    randomMealDiv.addEventListener('click',()=>{
        openModal(mealId)
        console.log(mealId)
    })
}


//Getting value of searched category from user
let searchButton=document.getElementById("submit")

searchButton.addEventListener('click',()=>{
    
    let inputCategory=document.getElementById("input").value
    console.log(inputCategory)
    
    fetchSearchedMeal(inputCategory)
})


//Fetching api category according userInput

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
            const div=document.createElement("div")
            
            //Displaying searched Meals in inner HTML
            div.innerHTML=`
            <div class="result-div" id="${dishes.idMeal}" >
                <img class="dish-image" id="Modal-open" src="${dishes.strMealThumb}" alt="">
                <h3 class="orange">${dishes.strMeal}</h3>
            </div>
            `
            let mealId=dishes.idMeal
            div.onclick=()=>{
                openModal(mealId) //Taking id to other function to display ingredients on click
            }
            
            displayDish.append(div)
            
        })
    })

    .catch(error=>{
        console.log(error)
    })
}

//Creating variables related to modal
let modalOpen=document.getElementById("Modal-open")
let modalIngredients=document.getElementById("modalIngredients")

//This is for closing modal
let modalClose=document.getElementById("closeBtn")
modalClose.addEventListener('click',()=>{
    document.getElementById("modal").style.display="none"
})

//Function for opening Modal
function openModal(mealId){
    
    console.log(mealId)
    
    //Fetching ingredients of clicked dish
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    
    .then(result=>{
        return result.json()
    })
    
    .then(response=>{
        let dishes=response.meals[0]

        modalIngredients.innerHTML=""
        
        //Looping through all ingredients
        for(let i=1;i<21;i++){

            let ingredient = dishes[`strIngredient${i}`];
            
            //Displaying ingredients until all ingredients print in HTML
            if (ingredient !=="" ) {
                
                console.log(`${ingredient}`);

                modalIngredients.innerHTML+=`
                <li>${ingredient}</li>`
            }
        }
        
        //Displaying modal after everything gets ready
        document.getElementById("modal").style.display="block"
    })
}