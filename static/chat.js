

const userName = prompt('Ваше имя:')
const nameBlock = document.querySelector('.name')
nameBlock.innerHTML = `${userName}`


const form = document.querySelector('.form')
const input = document.querySelector('input')
const messages = document.querySelector('.messages')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.files.length === 0) {
        return
    }
    else {
        socket.emit('upload img', {
            'name': input.files['0']['name'],
            'file': input.files[0],
            'user': userName
        })
        console.log(input.files[0])
        form.reset()
    }
})

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    str = `User ${userName} has connected!`
    socket.emit('connect user', str);
});

socket.on('upload img', (data) => {
    const li = document.createElement('li')

    var arrayBufferView = new Uint8Array(data['file']);
    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    var img_url = URL.createObjectURL(blob);

    img = `<img src="${img_url}">`


    li.innerHTML = `<span>${data['user']}</span>` + img
    messages.appendChild(li)

    window.scrollTo(0, document.body.scrollHeight)
})

