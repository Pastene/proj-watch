let itemAssento = document.querySelectorAll(".container_cadeiras_containerAssentos-item");
for(var i=0; i < itemAssento.length; i++){
    itemAssento[i].addEventListener("click", function(){
        this.classList.add("active");
    });
}