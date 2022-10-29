var iniciarJuego = document.querySelector(".btn-jugar");
var canvas = document.getElementById("canvas").getContext("2d");
var palabras = ["ALURA", "CHALLENGE", "AHORCADO", "PROGRAMA", "JAVASCRIPT"];
var palabraSorteada = "";
var letras = [];
var erroresTotales = 12;
var errores = 0;
var dibujos = [{"posXini":0,"posYini":0,"posXfin": 0,"posYfin": 0},{"posXini":0,"posYini":0,"posXfin": 0,"posYfin":500},{"posXini":570,"posYini":60,"posXfin": 570,"posYfin": 200},{"posXini":570,"posYini":200,"posXfin": 610,"posYfin": 270},{"posXini":570,"posYini":200,"posXfin": 530,"posYfin": 270},{"posXini":570,"posYini":120,"posXfin": 530,"posYfin": 190},{"posXini":570,"posYini":120,"posXfin": 610,"posYfin": 190}];
var aciertos = 0;

var palabraNueva = document.querySelector(".palabraInput");
var Guardar = document.querySelector(".botonGuardar");


sortearPalabra();

function sortearPalabra(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSorteada = palabra
    console.log(palabraSorteada);

    dibujarCanvas();
    dibujarLineas();
    restarError();

    document.onkeydown = (e) =>{
        let letra = e.key.toUpperCase();

        if(comprobarLetra(letra) && palabraSorteada.includes(letra)){

            for(let i = 0; i < palabraSorteada.length; i++){
                if(palabraSorteada[i] === letra){
                    escribirLetraCorrecta(i);
                    aciertos = aciertos +1;
                }
            }
                if(palabraSorteada.length == aciertos){
                alert("¡Felisidades ganste!");
                }    
        }
        
        else if(errores < erroresTotales){
            errores = errores +1;
            restarError();
            escribirLetraIncorrecta(letra, erroresTotales);   
            dibujarError();
            console.log(errores)           
            }

            if(errores == 6){
                alert("Fin del juego")
            }
        }
    }


function dibujarCanvas(){
    canvas.strokeStyle = "black";
    canvas.lineWidth = 4;
    canvas.lineCap = "round";

    canvas.beginPath();
    canvas.moveTo(370, 350);
    canvas.lineTo(570, 350);
    canvas.stroke();
    canvas.closePath();

    canvas.beginPath();
    canvas.moveTo(470, 350);
    canvas.lineTo(470, 50);
    canvas.stroke();
    canvas.closePath();

    canvas.beginPath();
    canvas.moveTo(470, 50);
    canvas.lineTo(570, 50);
    canvas.stroke();
    canvas.closePath();

    canvas.beginPath();
    canvas.moveTo(570, 50);
    canvas.lineTo(570, 60);
    canvas.stroke();
    canvas.closePath();
}


function dibujarLineas(){
    canvas.strokeStyle = "black";
    canvas.lineWidth = 2;

    let ancho = 600/palabraSorteada.length;

    for(let i = 0; i <= palabraSorteada.length; i++){
        canvas.stroke();
        canvas.moveTo(210 + (ancho*i), 450);
        canvas.lineTo(260 + (ancho*i), 450);
        canvas.closePath();
    }
}


function dibujarError(){
    
    if(errores == 1){
        dibujarCabeza();
    }
    else{
        dibujarPalo();
    }   
}

function dibujarCabeza(){

    canvas.strokeStyle = "black";
    canvas.lineWidth = 4;
    canvas.lineCap = "round";

    
    canvas.beginPath();
    canvas.arc(570,80,20,0,2*3.14); 
    canvas.fill();
    canvas.closePath();
}

function dibujarPalo(){
    let dibujo = dibujos[errores];

    canvas.strokeStyle = "black";
    canvas.lineWidth = 4;
    canvas.lineCap = "round";

    canvas.beginPath();
    canvas.moveTo(dibujo.posXini, dibujo.posYini);
    canvas.lineTo(dibujo.posXfin, dibujo.posYfin);
    canvas.stroke();
    canvas.closePath();
}


function comprobarLetra(key){
    let estado = false;
    console.log(key);
    if(key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)){
        letras.push(key);
        console.log(key);
        return estado;
    }
        else{
            estado = true;
            return estado;
        }
}


function escribirLetraCorrecta(index){
    canvas.font = "60px Inter";
    canvas.lineWidth = 2;

    let ancho = 600/palabraSorteada.length;
    canvas.fillText(palabraSorteada[index], 215+(ancho*index), 435);
}



function escribirLetraIncorrecta(letra, error){
    canvas.font = "30px Inter";
    canvas.lineWidth = 2;
    canvas.fillText(letra, 200+(40*(14-error)), 490, 40);
}

function restarError(){
    erroresTotales = erroresTotales -1;
}