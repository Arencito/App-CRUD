var bd;

function IniciarBaseDatos()
  {
    var BtnGuardar = document.querySelector("#btn-guardar");
    BtnGuardar.addEventListener("click", AlmacenarContacto);
   
   var solicitud = indexedDB.open("Data");

   solicitud.addEventListener("error", MostrarError);
   solicitud.addEventListener("succes", Comenzar);
   solicitud.addEventListener("upgradeneeded", CrearAlmacen);
  }

function MostrarError (evento)
{
    alert("Tenemos un ERROR: " + evento.code + " / " + evento.message);
}
function Comenzar (evento)
{
    bd = evento.target.result;
}

function CrearAlmacen (evento)
{
    var basedatos = evento.target.result;
    var almacen = basedatos.createObjectStore("Data", {keypath: "id"});
    almacen.createIndex ("BuscarNombre", "nombre", {unique: false});
}
function AlmacenarContacto()
{
  var N = document.querySelector("#nombre").value;
  var I = document.querySelector("#id").value;
  var E = document.querySelector("#edad").value; 


  var transaccion = bd.transaction(["Contactos"], "read");
  var almacen = transaccion.objectStore("Contactos");

  almacen.add({
        nombre: N,
        id: I,
        edad: E
  });

  document.querySelector("#nombre").value = "";
  document.querySelector("#id").value = ""; 
  document.querySelector("#edad").value = ""; 



}

window.addEventListener("load", IniciarBaseDatos);


