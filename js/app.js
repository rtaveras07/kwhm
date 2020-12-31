 document.getElementById('add-item').addEventListener('click', realizarCalculos);
const facturacion = document.getElementById('descripcionConsumo');
var isclean = document.getElementById('clean');
//boton del dialog
const configButton = document.getElementById('configButton');

var diasFacturacion = 0;// los dias establecidos para la fkacturacion por la empresa 30 dias 
var consumo = 0;
var precioRango1 = 4.44; // hasta 200 kw
var precioRango2 = 6.97;// de 201 a 300
var precioRango3 = 10.86; // de 301 a 700 
var precioRango4 = 11.10;// de 700 en adelante. 

var cargofijo2 = 137.25 // si su sonsumo es mayor o igual a 100 kw al mes. 
var cargofijo1 = 37.95  // si su consumo es inferior a 100 kw 

var consumofinal1=0; //variables para guardar el valor en consumo kwh segun el rango de consumo. 
var consumofinal2=0;
var consumofinal3=0;
var consumofinal4=0;

//Evento click para el boton del dialog
configButton.addEventListener('click', () => configConfirm());

function configConfirm () {
    console.log('Listo');
}

function realizarCalculos() {

  consumofinal1 = 0;
  consumofinal2 = 0;
  consumofinal3 = 0;
  consumofinal4 = 0;

  //validando seleccion radio button
  let diario = document.getElementById("diario");
  if (diario.checked == true) {
    diasFacturacion = 30;
  } else {
    diasFacturacion = 1;
  }
//tomando la entrada del usuario. 
  let kw = document.getElementById('entrada').value; //valor entrada 
  consumo = kw * diasFacturacion;
  calculoRango(consumo);
  resultado();
}
function calculoRango(consumoCalc) {
//logica de rango de consumo. 
  try {
    //Rango 1  , de 0 a 200 
    if (consumoCalc >= 200) {
      consumofinal1 = 200;
    } else {
      consumofinal1 = consumoCalc;
    }
    //Rango 2  de 201 a 300 
    if (consumo - 200 >= 100) {
      consumofinal2 = 100;
    }
    if (consumo - 200 <= 100 && consumo - 200 > 0) {
      consumofinal2 = consumo - 200;
    }
    //Rango 3 de 301 a 700
    if ((consumo - 300) < 700 && (consumo - 300) > 0) {
      let resultadoRango = (consumo - 300) * precioRango3;
      consumofinal3 = consumo - 300;
    }
    if ((consumo - 300) > 700) {
      consumofinal3 = 700;
    }

    //rango 4 
    if (consumo - 1000 > 0) {

      consumofinal4 = consumo - 1000;
    }
  } catch (error) {
    alert(error);
  }
}
//Calculando el cargo fijo 
function resultado() {  
  try {
    if (consumo >= 100) {
      cargofijo = cargofijo2
    }
    else {
      cargofijo = cargofijo1
    }
//calculando el consumo consu respectivo rango de consumo. 
    let rango1 = Math.round((consumofinal1 * precioRango1), 2);
    let rango2 = Math.round((consumofinal2 * precioRango2), 2);
    let rango3 = Math.round((consumofinal3 * precioRango3), 2);
    let rango4 = Math.round((consumofinal4 * precioRango4), 2);
    let total = rango1 + rango2 + rango3 + rango4 + cargofijo;
    //moneda 
    const formatterDolar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }) 
    //desplegando el resultado 
    facturacion.innerHTML = '';
    facturacion.innerHTML += `<div>
      Consumo 30 días: ${consumo} <br>
      Cargo fijo: ${cargofijo} <br>      
      ${consumofinal1} x ${precioRango1} = ${rango1} <br>
      ${consumofinal2} x ${precioRango2} = ${rango2} <br>
      ${consumofinal3} x ${precioRango3} = ${rango3} <br>
      ${consumofinal4} x ${precioRango4} =${rango4}<br>  
      <hr>
      <b>Total a Pagar : ${formatterDolar.format(total)}</b>   
      </div>`;
  } catch (error) {
    alert("error en resultados: " + error);
  }
}