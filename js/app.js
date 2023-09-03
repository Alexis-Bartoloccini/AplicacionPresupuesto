const ingresos = [
]
const egresos = [
]
let cargarApp =()=> {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for (let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso
}
let cargarCabecero =()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos()
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto) ;
    document.getElementById("porcentaje").innerHTML= formatoPorcentaje(porcentajeEgreso);
    document.getElementById("egresos").innerHTML= formatoMoneda(totalEgresos());
    document.getElementById("ingresos").innerHTML= formatoMoneda(totalIngresos());
}

const formatoMoneda = (valor) => {
    return  valor.toLocaleString("en-US",{style:"currency", currency:"USD", minimumFractionDigits:2});
}
const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString("en-US",{style:"percent", minimumFractionDigits:2})
}
//Funcion que une a todos los elementos en un solo texto html en funcion de todos los items del arreglo "ingresos".
const cargarIngresos =()=> {
    let ingresosHTML = "";
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML
}
//Función que genera un nuevo ingreso en html que luego se usa en "cargarIngresos()"
const crearIngresoHTML = (ingreso)=> {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"
                            onClick="eliminarIngreso(${ingreso.id})"></ion-icon>
                        </button>
                </div>
            </div>
        </div>` ;
    return ingresoHTML;
}
const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();

}
const eliminarEgreso = (id) => {
    let indiceEliminar = ingresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}
const cargarEgresos = () => {
    let egresosHTML = "";
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso) ;
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}
const crearEgresoHTML = (egreso) =>{
    let egresoHTML= `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje((egreso.valor/totalEgresos()))}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onClick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
       
    </div>
</div>`;  
    return egresoHTML;
}
let agregarDato = () => {
    let forma = document.forms["forma"]
    let tipo = forma["tipo"]
    let descripcion= forma["descripcion"];
    let valor = forma["valor"];
    if(descripcion.value !== "" && valor.value !==""){
        if (tipo.value==="ingreso"){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)))
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value==="egreso"){
            egresos.push( new Egreso(descripcion.value, Number(valor.value)))
            cargarCabecero();
            cargarEgresos();
        }
    }
}