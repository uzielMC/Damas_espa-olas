//Variables auxiliares
var seleccionado = 0, colSelect = 0, renSelect = 0, turno = 1, contRo=12, contAZ=12;
// ejecuta esta función cuando se cargue el documento
//La función crea el tablero con las fichas en los lugares correspondientes
window.onload = function() {
	for(ren = 1; ren<= 8; ren++) {
		x = (ren % 2 == 0) ? 1 : 0;
		createRow(ren);
		for(col = 1; col <= 8; col++) {
			if(col % 2 == x) {
				createCol_black(ren,col);
				if(ren<=3){ 
					createfichas1(col,ren); 
				}
				if(ren>=6){
					createfichas2(col, ren);    
				} 
			}
			else
				createCol_white(ren,col);
		}  
	}
}

/*Aqui por si lo ocupan, evento del click para las fichas
function prueba (ficha){
	var cadena  = ""+ficha.getAttribute("id");
	subc = cadena.substring(7);
	var fichaCol = ficha.getAttribute("fcol");
	//alert(fichaCol);
}*/

function createRow(element){
    var div = document.createElement("div");
    div.id = "row-"+ren;
    div.className ="row";
    document.getElementById("contenedor").appendChild(div);
}

function createCol_black(element){
	//Creamos el elemento de tipo Div
	var div = document.createElement("div");
	//Se le asigna el nombre de clase col-black, que sirve para la hoja de estilos
	div.className ="col-black";
	//Le asignamos de id la cadena col-black concatenada con el renglon y la columna en la que se encuentra
	div.id = "col_black-"+ren+"-"+col;
	//Al elemento row le agregamos de hijo el elemento que creamos, en este caso seria la casilla Negra
	document.getElementById("row-"+ren).appendChild(div);
	var casillaN= document.getElementById("col_black-"+ren+"-"+col);
	//Obtenemos el elemento y le agregamos un manejador de elemento, en este caso del click
	casillaN.addEventListener("click", function () {
		//Al realizar un click sobre la casilla se ejecutará la siguiente función
		movimientoFicha(casillaN);
		if(contAZ == 0 || contRo ==0){
			if(contAZ != 0){
				alert("¡Jugador 1 marron has ganado!");
			}
			else{
				alert("¡Jugador 2 rojo has ganado!");
			}
		}
	});
}

function createCol_white(element){
	var div = document.createElement("div");
	div.className ="col-white";
	div.id = "col_white-"+col;
	document.getElementById("row-"+ren).appendChild(div);
}

//Función que crea las fichas rojas
function createfichas1(element){
	var div = document.createElement("div");
	div.className ="ficha1";
	document.getElementById("col_black-"+ren+"-"+col).appendChild(div);
	div.id = "ficha1-"+ren+"-"+col;
	var ficha = document.getElementById("ficha1-"+ren+"-"+col);
	//Al ser un "elemento" le podemos crear atributos, en este caso el renglon actual en el que se encuentra así como su columna actual
	ficha.setAttribute("fcol", col);
	ficha.setAttribute("fren", ren);
	var cas =  document.getElementById("col_black-"+ren+"-"+col);
	//Al elemento casilla le creamos el atributo ficha que contiene la cadena de id que tiene ficha
	cas.setAttribute("ficha", ficha.getAttribute("id"));
	//Seleccionado
	/*ficha.addEventListener("click", function () {
		prueba(ficha);
	});*/
}

function createfichas2(element){
	var div = document.createElement("div");
	div.className ="ficha2";
	document.getElementById("col_black-"+ren+"-"+col).appendChild(div);
	div.id = "ficha2-"+ren+"-"+col;
	var ficha = document.getElementById("ficha2-"+ren+"-"+col);
	ficha.setAttribute("fcol", col);
	ficha.setAttribute("fren", ren);
	var cas =  document.getElementById("col_black-"+ren+"-"+col);
	cas.setAttribute("ficha", ficha.getAttribute("id"));
}

function movimientoFicha(casillaN){
	//Obtenemos la cadena que tiene por id la casilla Negra que detecto el click
	var cadena = ""+casillaN.getAttribute("id");
	//Obtenemos la cadena que tiene por id la ficha que se encuentra en la casilla Negra
	var fichaActual = casillaN.getAttribute("ficha");
	//Obtenemos la casilla anterior que detectó el primer click (en caso de que la haya)
	var casAnt = document.getElementById("col_black-"+renSelect+"-"+colSelect);
	//Obtenemos el renglón y la columna de la casilla Negra
	var subc = cadena.substring(10);
	var fichaTurno = 0;
	//Si existe una ficha dentro de la casilla negra obtenemos si es una ficha1 o una ficha2
	if (fichaActual != null){
		fichaTurno = fichaActual.substring(5,6);
	}
	//Si dentro de la casilla Negra existe una ficha y el turno es igual al tipo de ficha
	if (casillaN.hasAttribute("ficha")&& fichaTurno == turno){
		//Si existe una casilla anterior que previamente fue seleccionada la "deseleccionamos"
		if(casAnt != null){
			casAnt.className = "col-black";
		}
		//Le cambiamos el estilo a la casilla para mostrar que fue "seleccionada"
		casillaN.className = "col-black-2";
		seleccionado = 1;
		//Obtenemso la columna y el renglón de la casilla que fue seleccionada
		colSelect = document.getElementById(fichaActual).getAttribute("fcol");
		renSelect = document.getElementById(fichaActual).getAttribute("fren");
		
	}
	//Si una ficha esta "seleccionada" y es el turno de las fichas rojas----------------------------------------------------------------------------------------------rojas
	else if (seleccionado == 1 && turno == 1){
		//Obtenemos el id de la ficha que se encuentra en la casilla anterior
		var fichaAnt = casAnt.getAttribute("ficha");
		//Si se le da el segundo click a una casilla vacía
		var nClase = document.getElementById(fichaAnt).className;
		if(casillaN.hasAttribute("ficha")==false && nClase == "ficha1"){
			//Si llega al otro lado se corona dama
			if(parseInt(subc[0])==8){
				document.getElementById(fichaAnt).className = "fDamas1";
			}
			var condicion1 = (parseInt(renSelect) + 1 == parseInt(subc[0])) && (parseInt(colSelect)+1 == parseInt(subc[2]));
			var condicion2 = (parseInt(renSelect) + 1 == parseInt(subc[0])) && (parseInt(colSelect)-1 == parseInt(subc[2]));
			if(condicion1 || condicion2){
				//"deseleccionamos" la casilla anterior
				casAnt.className = "col-black";
				//Actualizamos los atributos renglón y columna de la ficha
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				//A la casilla Negra actual le asignamos el atributo ficha, además se lo agregamos como hijo
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				//A la casilla anterior le removemos el atributo ficha
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				//Cambiamos al turno de las fichas azules
				turno = 2;
			}
			//-------------------------------------------------INSTRUCCIONES PARA COMER de la roja a la azul----------------------------------------------------------------
			var condicion3 = (parseInt(renSelect) + 2 == parseInt(subc[0])) && (parseInt(colSelect)+2 == parseInt(subc[2]));
			var condicion4 = (parseInt(renSelect) + 2 == parseInt(subc[0])) && (parseInt(colSelect)-2 == parseInt(subc[2]));
			var fichaAux = null;
			if(parseInt(renSelect)+1 < 9 && parseInt(colSelect)+1 <9){
				fichaAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)+1)).getAttribute("ficha");
			}
			var subc2 = 0;
			if(fichaAux != null){
				subc2 = fichaAux.substring(5,6);
			}
			var fichaAux2 = null;
			if(parseInt(renSelect)+1 < 9 && parseInt(colSelect)-1 >0){
				fichaAux2 = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)-1)).getAttribute("ficha");
			}
			var subc3 = 0;
			if(fichaAux2 != null){
				subc3 = fichaAux2.substring(5,6);
			}
			if(condicion3 && subc2 == "2"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)+1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 2;
				contAZ=contAZ-1;
				//alert(contAZ);

			}
			else if (condicion4 && subc3 == "2"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)-1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux2));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 2;
				contAZ=contAZ-1;
				//alert(contAZ);

			}
		}
		//---------------------------------------------MOVIMIENTOS DE LA DAMA ROJA---------------------------------------------------
		else if (casillaN.hasAttribute("ficha")==false && nClase == "fDamas1"){
			var condicion1 = (parseInt(renSelect) + 1 == parseInt(subc[0])) && (parseInt(colSelect)+1 == parseInt(subc[2]));
			var condicion2 = (parseInt(renSelect) + 1 == parseInt(subc[0])) && (parseInt(colSelect)-1 == parseInt(subc[2]));
			var condicion3 = (parseInt(renSelect) - 1 == parseInt(subc[0])) && (parseInt(colSelect)+1 == parseInt(subc[2]));
			var condicion4 = (parseInt(renSelect) - 1 == parseInt(subc[0])) && (parseInt(colSelect)-1 == parseInt(subc[2]));
			if(condicion1 || condicion2 || condicion3 || condicion4){
				//"deseleccionamos" la casilla anterior
				casAnt.className = "col-black";
				//Actualizamos los atributos renglón y columna de la ficha
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				//A la casilla Negra actual le asignamos el atributo ficha, además se lo agregamos como hijo
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				//A la casilla anterior le removemos el atributo ficha
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				//Cambiamos al turno de las fichas azules
				turno = 2;
			}
			//-----------------------------------------------------COME LA DAMA---------------------------------------------------
			var condicion5 = (parseInt(renSelect) + 2 == parseInt(subc[0])) && (parseInt(colSelect)+2 == parseInt(subc[2]));
			var condicion6 = (parseInt(renSelect) + 2 == parseInt(subc[0])) && (parseInt(colSelect)-2 == parseInt(subc[2]));
			var condicion7 = (parseInt(renSelect) - 2 == parseInt(subc[0])) && (parseInt(colSelect)+2 == parseInt(subc[2]));
			var condicion8 = (parseInt(renSelect) - 2 == parseInt(subc[0])) && (parseInt(colSelect)-2 == parseInt(subc[2]));
			var fichaAux = null;
			if(parseInt(renSelect)+1 < 9 && parseInt(colSelect)+1 <9){
				fichaAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)+1)).getAttribute("ficha");
			}
			var subc2 = 0;
			if(fichaAux != null){
				subc2 = fichaAux.substring(5,6);
			}
			
			var fichaAux2 = null;
			if(parseInt(renSelect)+1 < 9 && parseInt(colSelect)-1 >0){
				fichaAux2 = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)-1)).getAttribute("ficha");
			}
			var subc3 = 0;
			if(fichaAux2 != null){
				subc3 = fichaAux2.substring(5,6);
			}
			
			var fichaAux3 = null;
			if(parseInt(renSelect)-1 > 0 && parseInt(colSelect)+1 < 9){
				fichaAux3 = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)+1)).getAttribute("ficha");
			}
			var subc4 = 0;
			if(fichaAux3 != null){
				subc4 = fichaAux3.substring(5,6);
			}
			
			var fichaAux4 = null;
			if(parseInt(renSelect)-1 > 0 && parseInt(colSelect)-1 > 0){
				fichaAux4 = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)-1)).getAttribute("ficha");
			}
			var subc5 = 0;
			if(fichaAux4 != null){
				subc5 = fichaAux4.substring(5,6);
			}
			
			if(condicion5 && subc2 == "2"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)+1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 2;
				contAZ=contAZ-1;
				//alert(contAZ);

			}
			else if (condicion6 && subc3 == "2"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)-1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux2));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 2;
				contAZ=contAZ-1;
				//alert(contAZ);

			}
			else if (condicion7 && subc4 == "2"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)+1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux3));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				seleccionado = 0;
				turno = 2;
				contAZ=contAZ-1;
				//alert(contAZ);
			}
			else if (condicion8 && subc5 == "2"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)-1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux4));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 2;
				contAZ=contAZ-1;
				//alert(contAZ);
			}
		}
	}
	//Si una ficha esta "seleccionada" y es el turno de las fichas azules----------------------------------------------------------------------------------------------------------------azules
	else if (seleccionado == 1 && turno == 2){
		var fichaAnt = casAnt.getAttribute("ficha");
		var nClase =document.getElementById(fichaAnt).className;
		if(casillaN.hasAttribute("ficha")==false && nClase == "ficha2"){
			var condicion1 = (parseInt(renSelect) - 1 == parseInt(subc[0])) && (parseInt(colSelect)+1 == parseInt(subc[2]));
			var condicion2 = (parseInt(renSelect) - 1 == parseInt(subc[0])) && (parseInt(colSelect)-1 == parseInt(subc[2]));
			//Si llega al otro lado se corona dama
			if(parseInt(subc[0])==1){
				document.getElementById(fichaAnt).className = "fDamas2";
			}
			if(condicion1 || condicion2){
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;

			}
			//-------------------------------------------------INSTRUCCIONES PARA COMER de la azul la roja----------------------------------------------------------------
			var condicion3 = (parseInt(renSelect) - 2 == parseInt(subc[0])) && (parseInt(colSelect)+2 == parseInt(subc[2]));
			var condicion4 = (parseInt(renSelect) - 2 == parseInt(subc[0])) && (parseInt(colSelect)-2 == parseInt(subc[2]));
			var fichaAux = null;
			if(parseInt(renSelect)-1 > 0 && parseInt(colSelect)+1 <9){
				fichaAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)+1)).getAttribute("ficha");
			}
			var subc2 = 0;
			if(fichaAux != null){
				subc2 = fichaAux.substring(5,6);
			}
			var fichaAux2 = null;
			if(parseInt(renSelect)-1 > 0 && parseInt(colSelect)-1 >0){
				fichaAux2 = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)-1)).getAttribute("ficha");
			}
			var subc3 = 0;
			if(fichaAux2 != null){
				subc3 = fichaAux2.substring(5,6);
			}
			if(condicion3 && subc2 == "1"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)+1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;
				contRo=contRo-1;
				//alert(contRo);
			}
			else if (condicion4 && subc3 == "1"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)-1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux2));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;
				contRo=contRo-1;
				//alert(contRo);
			}
		}
		//-------------------------------MOVIMIENTOS DE LA DAMA AZUL------------------------------------------------------
		else if(casillaN.hasAttribute("ficha")==false && nClase == "fDamas2"){
			var condicion1 = (parseInt(renSelect) - 1 == parseInt(subc[0])) && (parseInt(colSelect)+1 == parseInt(subc[2]));
			var condicion2 = (parseInt(renSelect) - 1 == parseInt(subc[0])) && (parseInt(colSelect)-1 == parseInt(subc[2]));
			var condicion3 = (parseInt(renSelect) + 1 == parseInt(subc[0])) && (parseInt(colSelect)+1 == parseInt(subc[2]));
			var condicion4 = (parseInt(renSelect) + 1 == parseInt(subc[0])) && (parseInt(colSelect)-1 == parseInt(subc[2]));
			if(condicion1 || condicion2 || condicion3 || condicion4){
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;
			}
			//------------------COME DAMA AZUL----------------------------
			var condicion5 = (parseInt(renSelect) + 2 == parseInt(subc[0])) && (parseInt(colSelect)+2 == parseInt(subc[2]));
			var condicion6 = (parseInt(renSelect) + 2 == parseInt(subc[0])) && (parseInt(colSelect)-2 == parseInt(subc[2]));
			var condicion7 = (parseInt(renSelect) - 2 == parseInt(subc[0])) && (parseInt(colSelect)+2 == parseInt(subc[2]));
			var condicion8 = (parseInt(renSelect) - 2 == parseInt(subc[0])) && (parseInt(colSelect)-2 == parseInt(subc[2]));
			var fichaAux = null;
			if(parseInt(renSelect)+1 < 9 && parseInt(colSelect)+1 <9){
				fichaAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)+1)).getAttribute("ficha");
			}
			var subc2 = 0;
			if(fichaAux != null){
				subc2 = fichaAux.substring(5,6);
			}
			
			var fichaAux2 = null;
			if(parseInt(renSelect)+1 < 9 && parseInt(colSelect)-1 >0){
				fichaAux2 = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)-1)).getAttribute("ficha");
			}
			var subc3 = 0;
			if(fichaAux2 != null){
				subc3 = fichaAux2.substring(5,6);
			}
			
			var fichaAux3 = null;
			if(parseInt(renSelect)-1 > 0 && parseInt(colSelect)+1 < 9){
				fichaAux3 = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)+1)).getAttribute("ficha");
			}
			var subc4 = 0;
			if(fichaAux3 != null){
				subc4 = fichaAux3.substring(5,6);
			}
			
			var fichaAux4 = null;
			if(parseInt(renSelect)-1 > 0 && parseInt(colSelect)-1 > 0){
				fichaAux4 = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)-1)).getAttribute("ficha");
			}
			var subc5 = 0;
			if(fichaAux4 != null){
				subc5 = fichaAux4.substring(5,6);
			}
			
			if(condicion5 && subc2 == "1"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)+1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;
				contRo=contRo-1;
				//alert(contRo);
			}
			else if (condicion6 && subc3 == "1"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)+1) + "-" +(parseInt(colSelect)-1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux2));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;
				contRo=contRo-1;
				//alert(contRo);
			}
			else if (condicion7 && subc4 == "1"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)+1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux3));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				seleccionado = 0;
				turno = 1;
				contRo=contRo-1;
				//alert(contRo);
			}
			else if (condicion8 && subc5 == "1"){
				var casAux = document.getElementById("col_black-"+ (parseInt(renSelect)-1) + "-" +(parseInt(colSelect)-1));
				casAux.removeAttribute("ficha");
				casAux.removeChild(document.getElementById(fichaAux4));
				casAnt.className = "col-black";
				document.getElementById(fichaAnt).setAttribute("fren", subc[0]);
				document.getElementById(fichaAnt).setAttribute("fcol", subc[2]);
				casillaN.setAttribute("ficha", fichaAnt);
				casillaN.appendChild(document.getElementById(fichaAnt));
				casAnt.removeAttribute("ficha");
				seleccionado = 0;
				turno = 1;
				contRo=contRo-1;
				//alert(contRo);
			}
		}
	}
}   