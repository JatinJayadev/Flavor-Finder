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
    
    let mealId=random.idMeal
    randomMealDiv.addEventListener('click',()=>{
        openpopup(mealId)
        console.log(mealId)
    })
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
            const div=document.createElement("div")
            
            div.innerHTML=`
            <div class="result-div" id="${dishes.idMeal}" >
                <img class="dish-image" id="Modal-open" src="${dishes.strMealThumb}" alt="">
                <h3 class="orange">${dishes.strMeal}</h3>
            </div>
            `
            div.onclick=()=>{
                console.log("no")
                openpopup(dishes.idMeal)
            }
            
            displayDish.append(div)
            
            // console.log(dishes.idMeal)
            // let mealId=document.getElementById(dishes.idMeal)
            // document.getElementById(dishes.idMeal).addEventListener('click',()=>{
            //     console.log(mealId)
            //     openpopup(dishes.idMeal)
            // })
        })
    })
    .catch(error=>{
        console.log(error)
    })
}

let modalOpen=document.getElementById("Modal-open")
// modalOpen.addEventListener('click',()=>{
//     document.getElementById("modal").style.display="block"
// })
let modalIngredients=document.getElementById("modalIngredients")

let modalClose=document.getElementById("closeBtn")
modalClose.addEventListener('click',()=>{
    document.getElementById("modal").style.display="none"
})

function openpopup(mealId){
    
    console.log(mealId)
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    
    .then(result=>{
        return result.json()
    })
    
    .then(response=>{
        // console.log(response.meals[0])
        let dishes=response.meals[0]

        modalIngredients.innerHTML=""
        
        for(let i=1;i<21;i++){
            let ingredient = dishes[`strIngredient${i}`];
            
            if (ingredient !== "" ) {
                console.log(`${ingredient}`);
                modalIngredients.innerHTML+=`
                <li>${ingredient}</li>`
            }
        }
        
        document.getElementById("modal").style.display="block"
    })
}
// modalOpen.addEventListener('click',()=>{
// })

// for(let i=1;i<=20;i++){
//     if (data.meals[0][`strIngredient${i}`] != "" && data.meals[0][`strIngredient${i}`]!=null){
//     document.getElementById("Ingredi-list").innerHTML += `<li>${data.meals[0][`strIngredient${i}`]}</li>`;
//   }}
