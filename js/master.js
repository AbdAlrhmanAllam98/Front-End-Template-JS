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
        removeActiveClassToColorsLi();
        e.currentTarget.classList.add("active");
        // SAVE COLOR IN LOCAL STORAGE 
        saveToLocalStorage("main-color",e.currentTarget.dataset.color);
    })
});
// SET MAIN COLOR FROM LOCAL STORAGE 
let mainColorLocalStorage=localStorage.getItem("main-color");
if(mainColorLocalStorage){
    document.documentElement.style.setProperty("--main-color",mainColorLocalStorage);
    removeActiveClassToColorsLi();
    colorsLi.forEach(li => {
        if(li.dataset.color==mainColorLocalStorage){
            li.classList.add("active");
        }
    });
}
function removeActiveClassToColorsLi(){
    colorsLi.forEach(li => {
        li.classList.remove("active");
    });
}
// END COLORS OPTION 
// END SETTINGS BOX

// START LANDING PAGE
//Start Randomly Change Background of Landing Page 
setInterval(() => {
    document.querySelector(".landing-page").style.backgroundImage=
    'url("images/landing-'+Math.floor(Math.random()*5)+'.jpg")';
}, 10000);
// END Randomly Change Background of Landing Page 
// END LANDING PAGE