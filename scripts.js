const botao = document.querySelector(".pedir");
const closed = document.querySelector(".fechar");


function abrir(){
  document.getElementById("miniTela").style.display = "flex";
}

function fechar(){
  document.getElementById("miniTela").style.display = "none";
}

botao.addEventListener("click", abrir);
closed.addEventListener("click", fechar);

// Cria a tela de cada açaí com ml, creme e acompanhamentos
function criarTelaAçai(index) {
  var div = document.createElement("div");
  div.classList.add("tela", "ativa");
  div.id = "tela2_" + index;

  div.innerHTML = `
    <h2>Açaí ${index + 1}</h2>

    <h3 class="titulo-qcp"> Quantidade (ml)</h3>

  <div class="quantidade-ml">
    <label><input type="radio" name="ml_${index}" value="200"> 200ml</label>
    <label><input type="radio" name="ml_${index}" value="300"> 300ml</label>
    <label><input type="radio" name="ml_${index}" value="400"> 400ml</label>
    <label><input type="radio" name="ml_${index}" value="500"> 500ml</label>
  </div>

  <h3 class="titulo-qcp ">Creme</h3>

  <div class="Centralizando-creme">
  <div class="cremeMini"> 
    <label><input type="radio" name="creme_${index}" value="Ninho"> Ninho</label>
    <label><input type="radio" name="creme_${index}" value="Ninho Trufado"> Ninho Trufado</label>
    <label><input type="radio" name="creme_${index}" value="Ovomaltine"> Ovomaltine</label>
    <label><input type="radio" name="creme_${index}" value="Oreo"> Oreo</label>
    <label><input type="radio" name="creme_${index}" value="Cookies"> Cookies</label>
    <label><input type="radio" name="creme_${index}" value="Morango"> Morango</label>
</div>
  <div class="cremeMini">
    <label><input type="radio" name="creme_${index}" value="Maracujá"> Maracujá</label>
    <label><input type="radio" name="creme_${index}" value="Kiwi"> Kiwi</label>
    <label><input type="radio" name="creme_${index}" value="Abacaxi Suíço"> Abacaxi Suíço</label>
    <label><input type="radio" name="creme_${index}" value="Amendoim"> Amendoim</label>
    <label><input type="radio" name="creme_${index}" value="Tapioca"> Tapioca</label>
  </div>
  </div>


    <h3 class="titulo-qcp">Acompanhamentos</h3>
  <div class="centralizando-acom"> 
  <div class="acompanhamento-mini"> 
    <label><input type="checkbox" name="acompanhamento_${index}" value="Leite em pó"> Leite em pó</label>
    <label><input type="checkbox" name="acompanhamento_${index}" value="Choco Ball"> Choco Ball</label>
    <label><input type="checkbox" name="acompanhamento_${index}" value="Disquete"> Disquete</label>
    <label><input type="checkbox" name="acompanhamento_${index}" value="Jujuba"> Jujuba</label>
  </div>
  <div class="acompanhamento-mini"> 
    <label><input type="checkbox" name="acompanhamento_${index}" value="Amendoim"> Amendoim</label>
    <label><input type="checkbox" name="acompanhamento_${index}" value="Granola"> Granola</label>
    <label><input type="checkbox" name="acompanhamento_${index}" value="Leite condensado"> Leite condensado</label>
    <label><input type="checkbox" name="acompanhamento_${index}" value="Todos"> Todos </label>
  </div>
  </div>
  `;
  return div;
}

// Avança da tela 1 para as telas de cada açaí
function avançarTela() {
  var quantidade = parseInt(document.getElementById("quantidadeInput").value);
  if (!quantidade || quantidade < 1) {
    alert("Digite uma quantidade válida (mínimo 1).");
    return;
  }
  else if (!quantidade || quantidade > 10) {
    alert("Digite uma quantidade válida (max 10).");
    return
}

  document.getElementById("tela1")
  var container = document.getElementById("telasAçaiContainer");
  container.innerHTML = "";

  for (var i = 0; i < quantidade; i++) {
    container.appendChild(criarTelaAçai(i));
  }

  document.getElementById("finalizarDiv").style.display = "flex";
}

// Volta para a tela 1


// Finaliza pedido e envia para WhatsApp
function finalizarPedido() {
  var quantidade = parseInt(document.getElementById("quantidadeInput").value);
  var resultados = [];
  
  for (var i = 0; i < quantidade; i++) {
    var ml = document.querySelector(`input[name="ml_${i}"]:checked`)?.value || "Não definido";
    var creme = document.querySelector(`input[name="creme_${i}"]:checked`)?.value || "Não selecionado";
    var acompanhamentos = [];
    var acompInputs = document.querySelectorAll(`input[name="acompanhamento_${i}"]`);
    acompInputs.forEach(input => { if(input.checked) acompanhamentos.push(input.value); });

    // Formatação correta com quebras de linha e espaços
    resultados.push(`Açaí ${i + 1}:%0AQuantidade: ${ml}ml%0ACreme: ${creme}%0AAcompanhamentos: ${acompanhamentos.join(", ") || "Nenhum"}`);
  }

  var mensagem = `Olá! Quero fazer o seguinte pedido de açaí:%0A%0A${resultados.join("%0A%0A")}`;

  // Substitua pelo seu número com DDD
  var numeroWhats = "5584986260054";
  window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, "_blank");
}