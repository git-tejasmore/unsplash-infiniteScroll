
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let totalImage = 0;
let photosArray = [];


// Unsplash API
const count = 30;
const apiKey = 'JLoR-3V3vUqBOJw6vS3CqrgNGr89A8CMpWhmEe27OIA';
const search = 'nature';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${search}`;


// check if image is loaded
function imageLoaded(){
    
    imagesloaded++;
    if(imagesloaded === totalImage){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes
function setAttributes(element, attributes){

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos and add it to dom
function displayPhotos(){
    imagesloaded = 0;
    totalImage = photosArray.length;
// Run this on each object
    photosArray.forEach((photo) =>{
        // Create anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank'
        });
        
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        // Create Image for a photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
       // Event listner to check each event is loaded
        img.addEventListener('load', imageLoaded());
        // put image inside anchor then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}



// Get Photos from unsplash api
async function getPhotos(){

    try{
        const response = await fetch (apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Catch Errors here
        console.log(error);
    }
}

// check if we are at the end of the scroll

window.addEventListener('scroll',() =>{
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    getPhotos();
    ready = false;

   }
});

//On Load
getPhotos();
