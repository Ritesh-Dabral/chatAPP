window.onload = function(){
    var socket = io.connect('http://localhost:8085/');

    //var for Client
    var message = document.getElementById('message'),
        output  = document.getElementById('output'),
        handle  = document.getElementById('alias'),
        sendBtn    = document.getElementById('send'),
        feedback    = document.getElementById('feedback');

    sendBtn.addEventListener('click',()=>{
        if(message.value!==""){
            socket.emit('chat',{
                message : message.value,
                handle : handle.value
            });
        }
    })

    message.addEventListener('keypress',()=>{
        socket.emit('typing',handle.value);
    })
    //add event litener
    socket.on('chat',data=>{
        feedback.innerHTML="";
        message.value="";
        output.innerHTML+=`<div><strong>${data.handle}</strong><br/><p>${data.message}</p></div>`;
    });

    socket.on('typing',(data)=>{
        feedback.innerHTML=`<p>${data} is typing...`;
    })
}