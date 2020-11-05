window.addEventListener('load', function(){

    let formularioLogin = document.querySelector('form.formularioLogin'); 
    //agrego esa clase al form login del ejs(formularioLogin)
    
    let campoEmail = formularioLogin.querySelector('input.email');
    let campoPass = formularioLogin.querySelector('input.password');
    //toma el input con id =email/password
    
    formularioLogin.onsubmit = function (event) {
        //funciona cuando le doy click al boton submit
        
        let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        //regexEmail es el formato que debe adoptar el input Email (name@algo.com)
        
        if (!regexEmail.test(campoEmail.value)){
            event.preventDefault();
            //cancelo el comportamiento por defecto
            campoEmail.classList.add('is-invalid');
            //agrego la clase, que enmarca el input en rojo
            let mostrarError = campoEmail.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'Formato de email Invalido';
            //mensaje de error

        }
        
        if (campoPass.value.length < 5){
            event.preventDefault();
            campoPass.classList.add('is-invalid');
            let mostrarError = campoPass.parentElement.querySelector('div.invalid-feedback');
            mostrarError.innerText = 'Password incorrecta';
        }
    }
    
    
    
    let passMostrar = formularioLogin.querySelector('#pass-mostrar');
    
    passMostrar.onmousedown  = () => {
        campoPass.type = 'text';
    }
    passMostrar.onmouseup = () => {
        campoPass.type = 'password';
    }
    
    
})

let login = formularioLogin.getElementById('inputPassword')
let eyeOn = formularioLogin.getElementById('hide1')
let eyeOff = formularioLogin.getElementById('hide2')

formularioLogin.onclick = function(){      
    
    if(login.type === 'password'){
        login.type ='text';
        eyeOn.style.display = "block";
        eyeOff.style.display = 'none';
    }else{
        login.type ='password';
        eyeOn.style.display = "none";
        eyeOff.style.display = 'block';
    }
}

