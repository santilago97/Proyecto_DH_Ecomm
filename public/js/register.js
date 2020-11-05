window.addEventListener('load', function(){
    let formRegister = document.querySelector('form.formRegister');
    
    formRegister.onsubmit = function (event){
        
        let campoNombre = document.querySelector('.nombreUsuario');
        
        if (campoNombre.value == ''){
            event.preventDefault();
            campoNombre.classList.add('is-invalid')   
            let mostrarError = campoNombre.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'El campo debe estar completo';
            
        }
        else if(campoNombre.value.length < 3){
            event.preventDefault();
            let mostrarError = campoNombre.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'El campo debe tener al menos 3 caracteres';
            campoNombre.classList.add('is-invalid') 
        }
        
        let campoApellido = document.querySelector('input.apellido');
        
        if (campoApellido.value == ''){
            event.preventDefault();
            campoApellido.classList.add('is-invalid') 
            let mostrarError = campoApellido.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'El campo debe estar completo';
            
        }
        else if(campoApellido.value.length < 3){
            event.preventDefault();
            let mostrarError = campoApellido.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'El campo debe tener al menos 3 caracteres';
            campoApellido.classList.add('is-invalid') 
        }
        
        let campoEmail = document.querySelector('#email');
        let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i 
        
        if (!regexEmail.test(campoEmail.value)){
            event.preventDefault();
            campoEmail.classList.add('is-invalid')
            let mostrarError = campoEmail.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'Debe poner un email valido';   
        }
        
        let campoContraseña = document.querySelector('.password')//agregar clase 'password' al html
        
        if (campoContraseña.value.length < 5){
            event.preventDefault();
            let mostrarError = campoContraseña.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'La contraseña debe tener al menos 5 caracteres';
            campoContraseña.classList.add('is-invalid')
        }
        
        let campoConfirmar = document.querySelector('.confirmarPassword');
        
        if (campoConfirmar.value != campoContraseña.value){
            event.preventDefault();
            let mostrarError = campoConfirmar.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'Las contraseñas deben coincidir';
            campoConfirmar.classList.add('is-invalid')
            
        }
    }        
})
