function more(button){
    const card = button.parentElement;
    const text = card.querySelector(".readmore");
        text.classList.toggle("show");
}