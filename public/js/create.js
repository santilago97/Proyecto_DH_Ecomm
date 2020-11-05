window.addEventListener('load', function(){
    
    let formProdCreate = document.querySelector('form.formCreate');
    
    formProdCreate.onsubmit = function (event){
        
        let campoNombre = document.querySelector('.nombreProdCreate')
        
        if (campoNombre.value == ''){
            event.preventDefault();
            alert('el producto debe tener un nombre')
            campoNombre.classList.add('is-invalid')
        }
        
        else if (campoNombre.value.length <= 5){
            event.preventDefault();
            alert('el nombre del producto debe tener al menos 5 caracteres')
            campoNombre.classList.add('is-invalid')
        }
        let campoDesc = document.querySelector('.descrProdCreate')
        
        if (campoDesc.value == ''){
            event.preventDefault();
            alert('El producto debe tener una descripcion')
            campoDesc.classList.add('is-invalid')
        }
        
        let campoImg = document.querySelector('.imgProdCreate')
        
        /*if (campoDesc.value == ''){
            event.preventDefault();
            alert('El producto debe tener una descripcion')
            campoNombre.classList.add('is-invalid')
        }*/
        
        let campoCategoria = document.querySelector('.categoriaProd')
        
        if( campoCategoria.value == null || campoCategoria.value == 0 ){
            event.preventDefault();
            alert('Debe seleccionar una categoria')
            campoCategoria.classList.add('is-invalid')
        }
        
        let campoCantidad = document.querySelector('.cantProdCreate').value
        
        if(isNaN(campoCantidad) ) {
            event.preventDefault();
            alert('Debe indicar el stock disponible')
            campoCantidad.classList.add('is-invalid')
        }
        
        let campoPrecio = document.querySelector('.precioProdCreate').value
        
        if(isNaN(campoPrecio) ) {
            event.preventDefault();
            alert('Debe indicar el precio del producto')
            campoPrecio.classList.add('is-invalid')
        }
        
    }
})