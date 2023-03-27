const socket = io()

function Enviar() {                    
    
    //rescata datos cargados en el chat
    let vuser = document.getElementById("iduser").value;
    let vmessage = document.getElementById("idmessage").value;    

    // carga de datos a enviar al servidor
    envchat = { 
        user: vuser, 
        message: vmessage 
    }    
    
    //envio al servidor
    socket.emit('env-chat', envchat)        
    
    Cancelar()
}

function Cancelar() {
    document.getElementById("iduser").value = "";
    document.getElementById("idmessage").value = "";
}

// mostrar mensajes en chat
socket.on("publichat", inf => {        
        
    mostrarchat.innerHTML +=  

       `<p>user: ${inf.user} </p> 
        <p>message: ${inf.message} </p>`    
})