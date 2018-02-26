
var elemento;

function Inicializa(){
	elemento = document.getElementById("text-lines");
}	
function moveToFrontWhiteSpace(text, index, value){
	var formatted;
	formatted = text.substring(0,index)
	for(var i = 0 ; i < value ; i++){
		formatted+=' ';
	}
	formatted+= text.substr(index);	
	console.log(formatted);
	console.log(elemento);
	return formatted;
}
function espaces(){
	var cursorPosition = $('#text-lines').prop("selectionStart");
	elemento.value=moveToFrontWhiteSpace(elemento.value, cursorPosition, 4);
	elemento.focus();
	elemento.selectionEnd = cursorPosition + 4;
	elemento.selectionStart = cursorPosition + 4;
	console.log(cursorPosition);
}	


/*var teclaEsquerda = jQuery.Event("keypress");
	teclaEsquerda.ctrlKey = false;
	teclaEsquerda.which = 21; //Código da tecla - seta esquerda
	$("botao").trigger(teclaEsquerda);*/