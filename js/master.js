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

// START ANIMATE SKILLS WHEN REACHING THE SECTION
let skills=document.querySelector(".skills");
let progressesSkills=skills.querySelectorAll("progress");
window.onscroll=function(){
    if(window.scrollY >= (skills.offsetTop+skills.clientHeight-window.innerHeight)){
        progressesSkills.forEach(progress => {
            progress.setAttribute("value",progress.dataset.value);
        });       
    }
}
// END ANIMATE SKILLS WHEN REACHING THE SECTION

// START POPUP BOX FOR OUR-GALLERY SECTION
let gallery=document.querySelectorAll(".gallery img");
let popupOverlay,popupBox;
gallery.forEach(img => {
    img.addEventListener("click",e=>{
        // ADD OVERLAY ELEMENT 
        popupOverlay=document.createElement("div");
        popupOverlay.className="popup-overlay";
        document.body.appendChild(popupOverlay);
        // ADD POPUP BOX TO CARRY OUT TARGET IMAGE 
        popupBox=document.createElement("div");
        popupBox.className="popup-box";
        // ADD ALTERNATIVE TEXT OF IMAGE 
        if(img.alt!=null){
            let imageAlt=document.createElement("h3");
            let imageAltText=document.createTextNode(img.alt);
            imageAlt.appendChild(imageAltText);
            popupBox.appendChild(imageAlt)
        }
        // ADD TARGET IMAGE TO POPUP BOX 
        let popupImage=document.createElement("img");
        popupImage.src=img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        // ADD CLOSED BUTTON TO CLOSE POPUP-BOX AND POPUP OVERLAY 
        let closedButton=document.createElement("span");
        let closedButtonText=document.createTextNode("X");
        closedButton.className="closed-button";
        closedButton.appendChild(closedButtonText);
        popupBox.appendChild(closedButton);
    })
});
// CLOSE POPUP-BOX AND POPUP OVERLAY 
document.addEventListener("click",function(e){
    if(e.target.className=='closed-button'){
        e.target.parentNode.remove();
        popupOverlay.remove();
    }    
});
// END POPUP BOX FOR OUR-GALLERY SECTION