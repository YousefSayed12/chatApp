const socket = io.connect('http://localhost:5000')
const userName = document.getElementById('userName')
const Chat = document.getElementById('Chat')
const send = document.getElementById('send')
const message = document.getElementById('message')

send.addEventListener('click' , () => {
    socket.emit('message' , {
        userName:userName.value,
        message:message.value
    })
})

socket.on('new_message' , (data) => {
    Chat.innerHTML += `<p>${data.userName} : ${data.message}</p>`
})