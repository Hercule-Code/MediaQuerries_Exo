/*
- La flèche vers la droite fera avancer d'une image (changement instantané, pas de défilement)
- La flèche vers la gauche fera reculer d'une image
- Toutes les 5 secondes, on avancera d'une image
- Quand la souris sera sur l'image, le changement devra s'arrêter, et reprendre quand la souris quittera l'image
*/


// On s'assure que le document est chargé
window.onload = () => {
    // On récupère l'élément "fleche-droite"
    let flecheDroite = document.querySelector("#fleche-droite");

    // setInterval(function(){
    //     // On "simule" un clic sur la flèche droite
    //     flecheDroite.click();
    // }, 5000);

    // On stock l'intervalle dans change , ce qui permettra de l'arreter 
    let change = setInterval(avanceImage, 5000);

    

    // On écoute l'évènement "click" sur flecheDroite
    flecheDroite.addEventListener("click", avanceImage);

    // On récupère l'élément "fleche-gauche"
    let flecheGauche = document.querySelector("#fleche-gauche");

    // On écoute l'évènement "click" sur flecheGauche
    flecheGauche.addEventListener("click", function(){
        //On récupère l'image active
        let image = document.querySelector("#carousel .active");

        // On lui enlève la classe "active"
        image.classList.remove("active");

        // On doit mettre la classe "active" à la figure qui précède ou à la dernière si je suis sur la 1ère figure
        // Si l'élément qui précède l'image n'est pas inexistant
        if(image.previousElementSibling != null){
            // On met la classe active à l'élément précédent
            image.previousElementSibling.classList.add("active");
        }else{
            // On met la classe active à la dernière figure
            // On va chercher la dernière figure
            let figure = document.querySelector("#carousel figure:last-of-type");

            figure.classList.add("active");
        }
    });

    // Gestion du survol
    // On récupère l'élément (#carousel)
    let carousel = document.querySelector("#carousel");

    // On écoute l'événement "mouseenter"
    carousel.addEventListener("mouseenter", function(){
        // Se déclenche quand la souris entre sur le carousel
        // On arrete le defilement
        clearInterval(change);

    })
    // On écoute l'évenement "mouseleave"
    carousel.addEventListener("mouseleave", function(){
        // Se declenche quand la souris sort du carousel
        // On reprend le défilement
        change = setInterval(avanceImage, 5000);
        
        // Pour la nav bar ( Exemple le reste se fait en CSS)
        // menu.addEventListener("click", function(){
            //     let ul = document.querySelector("nav ul");
            //     ul.style.display = "initial";
    })

} // fin window.onload

function avanceImage(){
    // L'utilisateur a fait 1 clic sur la flèche droite
    // On doit déplacer la classe "active" d'une balise figure à la suivante ou à la 1ère si on est à la fin du diaporama
    // On récupère la figure qui a la classe active
    let image = document.querySelector("#carousel .active");

    // On lui enlève la classe active
    image.classList.remove("active");

    // On met la classe active à la balise figure qui suit, ou à la 1ère si la suivante est une span
    // Si l'élément qui suit mon image est une figure
    if(image.nextElementSibling.localName === "figure"){
        // On met la classe active à l'élément suivant notre image
        image.nextElementSibling.classList.add("active");
    }else{
        // On met la classe active à la 1ère figure du carousel
        // On récupère la 1ère figure
        let figure = document.querySelector("#carousel figure:first-of-type");

        // On lui met la classe "active"
        figure.classList.add("active");
    }
}
