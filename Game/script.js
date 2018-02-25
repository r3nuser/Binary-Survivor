var elemento;
var text;
function Inicializa(){
	elemento = document.getElementById("text-lines");
}

function espaces(){
	console.log("xupa")
	elemento.focus();
	text = elemento.value;
	text+="    "
	elemento.value = text;
	console.log(elemento);
var teclaEsquerda = jQuery.Event("keypress");
teclaEsquerda.ctrlKey = false;
teclaEsquerda.which = 21; //Código da tecla - seta esquerda

$("botao").trigger(teclaEsquerda);
	
}