
document.getElementById('add-item').addEventListener('click', realizarCalculos);
var diasFacturacion = 0;// los dias establecidos para la fkacturacion por la empresa 30 dias 
var consumo = 0;
var precioRango1 = 4.44; // hasta 200 kw
var precioRango2 = 6.97;// de 201 a 300
var precioRango3 = 10.86; // de 301 a 700 
var precioRango4 = 11.10;// de 700 en adelante. 

var cargofijo2 = 137.25 // si su sonsumo es mayor o igual a 100 kw al mes. 
var cargofijo1 = 37.95  // si su consumo es inferior a 100 kw 





function realizarCalculos() {
 let diario= document.getElementById("diario");
// let mensual= document.getElementById("mensual");
  if (diario.checked==true) {
    diasFacturacion = 30;
    } else {
      diasFacturacion = 1;
    }
    
    
  localStorage.clear();
  let kw = document.getElementById('entrada').value; //valor entrada 
  consumo = kw * diasFacturacion; //multiplicando para saber que consumo tendra mensual si el consumo diario es el introducido 
  //si no hay tareas en el local store

  let arreglo = [];//se inicializa el arreglo  tareas 
  // arreglo.push(consumo);//se agrega al arreglo tarea el item. 
  localStorage.setItem('kwhm', JSON.stringify(consumo));// agrega la tarea al storage en formato json

  ///document.getElementById('Formulario').reset();
  calculoRango(consumo);
  cargofijo(consumo);
  resultado();



}



function cargofijo(consumo) {
  //calculando el cargo fijo 
  if (consumo >= 100) {
    let cargo = cargofijo2;
    // arreglo.push(cargo);//se agrega al arreglo 
    localStorage.setItem('cargoFijo', JSON.stringify(cargofijo2)); //se almacena ) 

  } else {
    let cargo = cargofijo1;
    // arreglo.push(cargo);//se agrega al arreglo 
    localStorage.setItem('cargoFijo', JSON.stringify(cargofijo1)); //se almacena ) 

  }
}




function calculoRango(consumoCalc) {
  let arreglo = [];
  try {

    //Rango 1  , de 0 a 200 
    if (consumoCalc >= 200) {
      let resultadoRango = 200 * precioRango1;
      //ejemplo, si sonn 600 entonces quedarian 400 para la proxima escala o rango. 
      localStorage.setItem('Rango1_facturado', JSON.stringify(200)); //se almacena 

    } else {

      let resultadoRango = consumoCalc * precioRango1;
      localStorage.setItem('Rango1_facturado', JSON.stringify(consumoCalc)); //se almacena 

    }
    //Rango 2  de 201 a 300 
    if (consumo - 200 >= 100) { //  
      let resultadoRango = 100 * precioRango2;
      // si fue mayor de 100 entonces al restante se le resta 100 para seguir a la proxima etapa o rango. 
      localStorage.setItem('Rango2_facturado', JSON.stringify(100));
    }

    if (consumo - 200 <= 100 && consumo - 200 > 0) {
      let resultadoRango = (consumo - 200) * precioRango2;
      localStorage.setItem('Rango2_facturado', JSON.stringify(consumo - 200));
    }
    //Rango 3 de 301 a 700
    if ((consumo - 300) < 700 && (consumo - 300) > 0) {
      let resultadoRango = (consumo - 300) * precioRango3;
      localStorage.setItem('Rango3_facturado', JSON.stringify(consumo - 300));
    }
    if ((consumo - 300) > 700) {
      //let resultadoRango = (consumo-300)  * precioRango3;
      localStorage.setItem('Rango3_facturado', JSON.stringify(700));
    }
    //rango 4 
    if (consumo - 1000 > 0) {
      let resultadoRango = (consumo - 1000) * precioRango4;
      localStorage.setItem('Rango4_facturado', JSON.stringify(consumo - 1000));
    }
  } catch (error) {
    alert(error);
  }
}

function resultado() {  ///opteniendo los items.

  try {
    let consumoPromedioMes = localStorage.getItem('kwhm');
    let cargofijo = JSON.parse(localStorage.getItem('cargoFijo'));

    let rango1_facturado = JSON.parse(localStorage.getItem('Rango1_facturado'));
    let rango2_facturado = JSON.parse(localStorage.getItem('Rango2_facturado'));
    let rango3_facturado = JSON.parse(localStorage.getItem('Rango3_facturado'));
    let rango4_facturado = JSON.parse(localStorage.getItem('Rango4_facturado'));

    let rango1 = Math.round((rango1_facturado * precioRango1), 2);
    let rango2 = Math.round((rango2_facturado * precioRango2), 2);
    let rango3 = Math.round((rango3_facturado * precioRango3), 2);
    let rango4 = Math.round((rango4_facturado * precioRango4), 2);


    let total = rango1 + rango2 + rango3 + rango4 + cargofijo;

    const formatterDolar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })



    let facturacion = document.getElementById('descripcionConsumo');
    facturacion.innerHTML = '';
    facturacion.innerHTML += `<div>
      Consumo 30 días: ${consumoPromedioMes} <br>
      Cargo fijo: ${cargofijo} <br>
      
      ${rango1_facturado} x ${precioRango1} = ${rango1} <br>
      ${rango2_facturado} x ${precioRango2} = ${rango2} <br>
      ${rango3_facturado} x ${precioRango3} = ${rango3} <br>
      ${rango4_facturado} x ${precioRango4} =${rango4}<br>  
      <hr>
      <b>Total a Pagar : ${formatterDolar.format(total)}</b>   
      </div>
        `;



  } catch (error) {
    alert("error en resultados: " + error);
  }















}




