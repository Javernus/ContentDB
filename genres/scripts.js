function slide(direction, id) {
    var container = document.getElementById('movie_items_' + id);
    scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'left'){
            container.scrollLeft -= 300;
        } else {
            container.scrollLeft += 300;
        }
        scrollCompleted += 10;
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 60);
}
