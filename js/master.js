// Start The GLOBE 
function saveToLocalStorage(key,value){
    localStorage.setItem(key,value);
}
// END The GLOBE 
// START SETTINGS BOX
// START Toggle classes at Settings Box
document.querySelector(".settings-box .settings-icon i").onclick=function(){
    // Toggle the spin class of an icon gear 
    this.classList.toggle("fa-spin");  
    // Toggle the open Class OF Settings Box 
    document.querySelector(".settings-box").classList.toggle("open");
};
// END Toggle classes at Settings Box
// START COLORS OPTION 
let colorsLi=document.querySelectorAll(".settings-box .colors-list li");
colorsLi.forEach(li => {
    // SET THE COLOR FOR EACH ELEMENT IN COLORS LIST
    li.style.backgroundColor=li.dataset.color;
    li.addEventListener("click",e=>{
        // SET COLOR IN ROOT 
        document.documentElement.style.setProperty("--main-color",e.currentTarget.dataset.color);
        // TOGGLE CLASS ACTIVE FROM ALL LI ELEMENTS 
        removeActiveClassFromElements(colorsLi);
        e.currentTarget.classList.add("active");
        // SAVE COLOR IN LOCAL STORAGE 
        saveToLocalStorage("main-color",e.currentTarget.dataset.color);
    })
});
// SET MAIN COLOR FROM LOCAL STORAGE 
let mainColorLocalStorage=localStorage.getItem("main-color");
if(mainColorLocalStorage!=null){
    document.documentElement.style.setProperty("--main-color",mainColorLocalStorage);
    removeActiveClassFromElements(colorsLi);
    colorsLi.forEach(li => {
        if(li.dataset.color==mainColorLocalStorage){
            li.classList.add("active");
        }
    });
}
// END COLORS OPTION 
// START RANDOM BACKROUND
let randomBackgroundElements=document.querySelectorAll(".random-background span");
let backgroundOption=true;
let backgroundInterval;
randomizeImages();
// LOOP IN TWO SPAN 
randomBackgroundElements.forEach(span => {
    span.addEventListener("click",e=>{
        // TOGGLE CLASS ACTIVE FROM TWO SPAN  
        removeActiveClassFromElements(randomBackgroundElements);
        e.currentTarget.classList.add("active"); 
        // CHECK CHOICE OF RANDOM BACKGROUND IMAGES THEN OPERATE
        checkRandomizeBackground(e.currentTarget.dataset.random);
        // SAVE THE OPTION AND THE IMAGE TO LOCAL STORAGE
        saveToLocalStorage("background-image",document.querySelector(".landing-page").style.backgroundImage);
        saveToLocalStorage("background-option",e.currentTarget.dataset.random);
    });
});
// SET RANDOM BACKGROUND COLOR FROM LOCAL STORAGE 
let randomBackroundOptionLocalStorage=localStorage.getItem("background-option");
let randomBackroundImageLocalStorage=localStorage.getItem("background-image");
if(randomBackroundOptionLocalStorage!=null){
    checkRandomizeBackground(randomBackroundOptionLocalStorage);
    removeActiveClassFromElements(randomBackgroundElements);
    if(randomBackroundOptionLocalStorage==randomBackgroundElements[0].dataset.random){
        randomBackgroundElements[0].classList.add("active");
    }
    else{
        randomBackgroundElements[1].classList.add("active");
    }
}
if(randomBackroundImageLocalStorage!=null){
    document.querySelector(".landing-page").style.backgroundImage=randomBackroundImageLocalStorage;
}
function checkRandomizeBackground(element){
    if(element=="yes"){
        backgroundOption=true;
        randomizeImages();
    }
    else if(element=="no"){
        backgroundOption=false;
        clearInterval(backgroundInterval);
    }
}
// Randomly Change Background Images
function randomizeImages(){
    if(backgroundOption){
        backgroundInterval=setInterval(() => {
            document.querySelector(".landing-page").style.backgroundImage=
            'url("images/landing-'+Math.floor(Math.random()*5)+'.jpg")';
        }, 10000);
    }
}
// END RANDOM BACKROUND
// REMOVE ACTIVE CLASS FROM ALL ELEMENTS OF ANY COLLECTION
function removeActiveClassFromElements(arrayOfElements){
    arrayOfElements.forEach(el => {
        el.classList.remove("active");
    });
}

// END SETTINGS BOX

// START LANDING PAGE
// END LANDING PAGE