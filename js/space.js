let planeta = "";

let info = [];

function mostrarPlanetas(array){
    let contenido = "";
    
    for(let planeta of array){
        if(planeta.links){
            contenido += `
            <div class="col-md-4">
            <div class="card mt-3" class="card mb-4 shadow-sm custom-card cursor-active">
                <div class="card-img-top">
                    <img id="img" src="`  + planeta.links[0].href + `" alt="planet image">
                </div>
                <div class="body">
                    <h4 class="card-title">${planeta.data[0].title}</h4>
                    <div class="card-text">
                        <div style="overflow: auto; width: 300px; height: 100px">
                        <p>${planeta.data[0].description}</p>
                        </div>
                        <p>${planeta.data[0].date_created}</p>
                    </div>
                </div>
            </div>
            </div>
            `   
            
        }
    }
    
    document.getElementById('contenedor').innerHTML = contenido;
};

let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('btnBuscar').addEventListener('click',()=>{
        
        planeta = document.getElementById('inputBuscar').value.toLowerCase();
        
        let direccion = "https://images-api.nasa.gov/search?q="+planeta;
        
        getJSONData(direccion).then(function(resultObj){
            if(resultObj.status === "ok"){
                info = resultObj.data.collection.items;
            }
          });
        
        mostrarPlanetas(info);

    });

});