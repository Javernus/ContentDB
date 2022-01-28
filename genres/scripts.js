function imageLoader (image, title) {
    console.log(image);
    console.log(title);
    var image = new Image();
    image.src = image;
    var int = setInterval(function() {
        if (img.complete) {
            clearInterval(int);
            document.getElementsById(title).style.backgroundImage = 'url(' + img.src + ')';
        }
    }, 50);
}
