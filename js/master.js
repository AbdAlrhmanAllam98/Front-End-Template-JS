// START GLOBAL FUNCTION 
// SAVE VALUE TO LOCAL STORAGE 
function saveToLocalStorage(key,value){
    localStorage.setItem(key,value);
}
// REMOVE ACTIVE CLASS FROM ALL ELEMENTS OF ANY COLLECTION
function handleActiveClassFromElements(arrayOfElements,activeElement){
    if(activeElement===null){
        arrayOfElements.forEach(el => {
            el.classList.remove("active");
        });
    }
    else{
        arrayOfElements.forEach(el => {
            el.classList.remove("active");
        });
        activeElement.classList.add("active")
    }
}
// SCROLL TO THIS ELEMENT SMOOTHLY
function scrollToAnyWhere(elements){
    elements.forEach(element => {
        element.addEventListener("click",e=>{
            e.preventDefault();
            document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
                behavior:'smooth'
            });
        })
    });
}
// END GLOBAL FUNCTION 

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
        handleActiveClassFromElements(colorsLi,e.target);
        // SAVE COLOR IN LOCAL STORAGE 
        saveToLocalStorage("main-color",e.currentTarget.dataset.color);
    })
});
// SET MAIN COLOR FROM LOCAL STORAGE 
let mainColorLocalStorage=localStorage.getItem("main-color");
if(mainColorLocalStorage!=null){
    document.documentElement.style.setProperty("--main-color",mainColorLocalStorage);
    handleActiveClassFromElements(colorsLi,null);
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
        handleActiveClassFromElements(randomBackgroundElements,e.target);
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
    handleActiveClassFromElements(randomBackgroundElements,null);
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
// START SHOW BULLETS 
// KEEP TRACK OF NAVIGATION BULLETS OPTIONS 
let navBullet=document.querySelector(".nav-bullet");
let showBulletsOption=document.querySelectorAll(".bullets-option span");
showBulletsOption.forEach(span => {
    span.addEventListener("click",e=>{
        handleActiveClassFromElements(showBulletsOption,e.target);
        if(e.target.dataset.display=="block"){
            navBullet.style.display="block";
        }
        else{
            navBullet.style.display="none";
        }
        saveToLocalStorage("bullets-show",e.target.dataset.display);
    }) 
});
// SET NAVIGATION BULLETS BASED ON LOCAL STORAGE 
if(localStorage.getItem("bullets-show")!=null){
    if(localStorage.getItem("bullets-show")=="block"){
        navBullet.style.display="block";
        handleActiveClassFromElements(showBulletsOption,showBulletsOption[0]);
    }
    else if(localStorage.getItem("bullets-show")=="none"){
        navBullet.style.display="none";
        handleActiveClassFromElements(showBulletsOption,showBulletsOption[1]);
    }
}
// END SHOW BULLETS 
// START RESET OPTION BUTTON 
document.querySelector(".reset-option").onclick=function(){
    // REMOVE ITEMS FROM LOCAL STORAGE 
    localStorage.removeItem("background-image");
    localStorage.removeItem("bullets-show");
    localStorage.removeItem("background-option");
    localStorage.removeItem("main-color");
    // RELOAD THE PAGE 
    window.location.reload();
}
// END RESET OPTION BUTTON 
// END SETTINGS BOX
// START HEADROOM HEADER 
var myElement = document.querySelector("header");
var headroom  = new Headroom(myElement);
headroom.init();
// END HEADROOM HEADER 
// START NAVIGATION BULLETS WITH HEADER LINKS
let unOrderList=document.querySelector("header .nav-bar");
let unOrderListAsideMenu=document.querySelector(".toggle-menu .aside-menu ul");
let allSections=["skills","gallery","timeline","features","testimonials","contact"];
// CREATE [li a] NAV BAR IN HEADER
allSections.forEach(section=>{
    let list=addLinkFromSections(section);
    unOrderList.appendChild(list);
});
allSections.forEach(section=>{
    let list=addLinkFromSections(section);
    unOrderListAsideMenu.appendChild(list);
});
// ADD LINK TO NAV BAR AND ASIDE BAR FROM SECTION ARRAY 
function addLinkFromSections(section){
    let list=document.createElement("li");
    let link=document.createElement("a");
    link.className="text-white";
    link.href="#";
    link.setAttribute("data-section",section);
    let linkText=document.createTextNode(section.toUpperCase());
    link.appendChild(linkText);
    list.appendChild(link);
    return list;
}
// CREATE ALL BULLETS OF NAV-BULLET  
allSections.forEach(bullet=>{
    let bulletElement=document.createElement("div");
    bulletElement.className="bullet background-white";
    bulletElement.setAttribute("data-section",bullet);
    let tooltip=document.createElement("div");
    tooltip.className="tooltip background-main-color text-white";
    let tooltipText=document.createTextNode(bullet);
    tooltip.appendChild(tooltipText);
    bulletElement.appendChild(tooltip);
    navBullet.appendChild(bulletElement);
 });
 // ADD ACTIVE CLASS AT ACTIVE LINK AND REMOVE ACTIVE CLASS FROM OTHERS
 let allBullets=document.querySelectorAll(".nav-bullet .bullet");
 let allLinks=document.querySelectorAll("header li a");
 let allAsideLinks=document.querySelectorAll("header .aside-menu li");
 
 allBullets.forEach(bullet => {
    bullet.addEventListener("click",e=>{
        handleActiveClassFromElements(allBullets,e.target);
        handleActiveClassFromElements(allLinks,null);
        allLinks.forEach(link => {
            if(e.target.dataset.section===link.dataset.section){
                link.classList.add("active");
            }
         });
     });
 });
 // ADD ACTIVE CLASS AT ACTIVE LINK AND REMOVE ACTIVE CLASS FROM OTHERS
allLinks.forEach(link => {
    link.addEventListener("click",e=>{
        handleActiveClassFromElements(allLinks,e.target);
        handleActiveClassFromElements(allBullets,null);
        allBullets.forEach(bullet => {
            if(e.target.dataset.section==bullet.dataset.section){
                bullet.classList.add("active");
            }
        });
    });
});
// SCROLL TO CHOICED SECTION BY USER FROM [li || bullets]
scrollToAnyWhere(allBullets);
scrollToAnyWhere(allLinks);
// END NAVIGATION BULLETS WITH HEADER LINKS

// START ASIDE BAR HEADER 
let toggleMenu=document.querySelector(".toggle-menu");
toggleMenu.onclick=function(e){
    e.stopPropagation();
    unOrderListAsideMenu.classList.add("open");
}
document.addEventListener("click",e=>{    
    if(e.target!=toggleMenu && e.target.parentNode!=unOrderListAsideMenu){
        if(unOrderListAsideMenu.classList.contains("open")){
            unOrderListAsideMenu.classList.remove("open");
        }
    }
});

allAsideLinks.forEach(link => {
    link.addEventListener("click",e=>{
        handleActiveClassFromElements(allLinks,e.target.childNodes[0]);
        document.querySelector(`.${e.target.childNodes[0].dataset.section}`).scrollIntoView();
        handleActiveClassFromElements(allBullets,null);
        allBullets.forEach(bullet => {
            if(e.target.childNodes[0].dataset.section==bullet.dataset.section){
                bullet.classList.add("active");
            }
        });
    });
});

// END ASIDE BAR HEADER 

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
let popupOverlay,popupBox,closedButton;
gallery.forEach(img => {
    img.addEventListener("click",e=>{
        // ADD OVERLAY ELEMENT 
        popupOverlay=document.createElement("div");
        popupOverlay.className="popup-overlay";
        document.body.appendChild(popupOverlay);
        // ADD POPUP BOX TO CARRY OUT TARGET IMAGE 
        popupBox=document.createElement("div");
        popupBox.className="popup-box background-white";
        // ADD ALTERNATIVE TEXT OF IMAGE 
        if(img.alt!=null){
            let imageAlt=document.createElement("h3");
            let imageAltText=document.createTextNode(img.alt);
            imageAlt.className="text-main-color";
            imageAlt.appendChild(imageAltText);
            popupBox.appendChild(imageAlt)
        }
        // ADD TARGET IMAGE TO POPUP BOX 
        let popupImage=document.createElement("img");
        popupImage.src=img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        // ADD CLOSED BUTTON TO CLOSE POPUP-BOX AND POPUP OVERLAY 
        closedButton=document.createElement("span");
        let closedButtonText=document.createTextNode("X");
        closedButton.className="closed-button background-main-color";
        closedButton.appendChild(closedButtonText);
        popupBox.appendChild(closedButton);
    })
});
// CLOSE POPUP-BOX AND POPUP OVERLAY 
document.addEventListener("click",e=>{
    if(e.target==popupOverlay || e.target==closedButton){
        popupOverlay.remove();
        closedButton.parentNode.remove();
    }
});
// END POPUP BOX FOR OUR-GALLERY SECTION