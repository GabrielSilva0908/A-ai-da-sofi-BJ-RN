let botao = document.querySelector(".pedir");
let closed = document.querySelector(".fechar")

function abrir(){
  document.getElementById("miniTela").style.display = "flex";
}

function fechar(){
  document.getElementById("miniTela").style.display = "none";
}



botao.addEventListener("click", abrir);
closed.addEventListener("click", fechar);