
const titulo = document.getElementById('titulo');
const miAutor = document.getElementById('autor');
const miFecha = document.getElementById('fecha');
const miContenido = document.getElementById('contenido-noticia');
const miImagen = document.getElementById('img-file');
const miAudio = document.getElementById('audio-file');
const nuevaNoticia = document.getElementById('btn-addNoticia');
const modal_container = document.getElementById('modal_container');
const publicar = document.getElementById('btn-publicar');
const render = document.querySelector('.contenidoNew');
const actualizarPost = document.getElementById('btn-actualizar');
const salirModal = document.getElementById('btn-salir');

let post = {
    titulo: "",
    autor: "",
    fecha: "",
    contenido: "",
    imagen: "",
    audio: ""
}
let posts = [];

nuevaNoticia.addEventListener('click', () => {

    modal_container.classList.add('show');
    limpiarcampos();
    publicar.style.display = "block";
    actualizarPost.style.display = "none";

});

salirModal.addEventListener('click', () =>{
    modal_container.classList.remove('show');
})

publicar.addEventListener('click', (event) => {
    event.preventDefault()
    let nuevoPost = {
        titulo: post.titulo,
        autor: post.autor,
        fecha: post.fecha,
        contenido: post.contenido,
        imagen: post.imagen,
        audio: post.audio
    }

    if (miImagen.files.length > 0) {
        const getImg = miImagen.files[0];
        const imgUrl = URL.createObjectURL(getImg);
        nuevoPost.imagen = imgUrl
    }

    if (miAudio.files.length > 0) {
        const getAudio = miAudio.files[0];
        const audioUrl = URL.createObjectURL(getAudio);

        console.log(audioUrl);
        nuevoPost.audio = audioUrl
    }
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = [...posts, nuevoPost];

    localStorage.setItem("posts", JSON.stringify(posts));
    modal_container.classList.remove('show');
    limpiarcampos();
    getNoticia();
});

const limpiarcampos = () => {
    const titulo = document.getElementById('titulo').value = '';
    const miAutor = document.getElementById('autor').value = '';
    const miFecha = document.getElementById('fecha').value = '';
    const miContenido = document.getElementById('contenido-noticia').value = '';
    const miImagen = document.getElementById('img-file').value = '';
    const miAudio = document.getElementById('audio-file').value = '';

}

const getNoticia = () => {

    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    const cards = posts.map((noticia, index) => {
        return `
        <div>
        <div class="acciones">
            <button type="button" onclick="actualizar('${index}')" style = "background-color: #95adb6">Actualizar</button>
            <button type="button" onclick="eliminar('${index}')" style = "background-color: #95adb6 ">Eliminar</button>
        </div>
        <a href="./img/imgSena-removebg-preview.png" download="imagen-sena"></a>
        <div class="noticia">
            <h2>Noticia: ${noticia.titulo}</h2>
        <div class="autor">
            <h3>Autor: ${noticia.autor}</h3>
        </div>
        <div class="fecha">
            <p> Fecha: ${noticia.fecha}</p>
        </div>
        <div class="contenido">
            <p>Contenido: <br>${noticia.contenido}</p>
        </div>
        <div class="imagen" >
        <img src="${noticia.imagen}" style="width:250px;height:250px;border-radius:30%"></img>
        </div>
        <div class="audio">
        <audio controls crossorigin="anonymous">
            <source src="${noticia.audio}" type="audio/mpeg" >
        </audio>
        </div>
        <a href="./img/imgSena-removebg-preview.png" download>Descargar</a>
        </div>
        <hr>
        </div>
        `;
    }).join("");
    render.innerHTML = cards;
};

getNoticia();

titulo.addEventListener("keyup", (event) => {
    let titulo = event.target.value
    post.titulo = titulo

});

miAutor.addEventListener("keyup", (event) => {
    let autor = event.target.value
    post.autor = autor

});



miContenido.addEventListener("keyup", (event) => {
    let contenido = event.target.value
    post.contenido = contenido

});

miFecha.addEventListener("keyup",(event) => {
    let fecha = event.target.value
    post.fecha = fecha
})



const actualizar = (index) => {
    modal_container.classList.add('show');
    publicar.style.display = "none";
    actualizarPost.style.display = "block";
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    if (index >= 0 && index < posts.length) {
        var post = posts[index];
        titulo.value = post.titulo;
        miAutor.value = post.autor;
        miFecha.value = post.fecha;
        miContenido.value = post.contenido;


        actualizarPost.addEventListener('click', function () {

            post.titulo = titulo.value;
            post.autor = miAutor.value;
            post.fecha = miFecha.value;
            post.contenido = miContenido.value;

            if (miImagen.files.length > 0) {
                const getImg = miImagen.files[0];
                const imgUrl = URL.createObjectURL(getImg);
                post.imagen = imgUrl;
            }

            if (miAudio.files.length > 0) {
                const getAudio = miAudio.files[0];
                const audioUrl = URL.createObjectURL(getAudio);
                post.audio = audioUrl;
            }

            localStorage.setItem('posts', JSON.stringify(posts));
            modal_container.classList.remove('show');
            limpiarcampos();
            getNoticia();

        })

    } else {
        alert('No hay registros con ese index');
    }
}


const eliminar = (index) => {

    let posts = JSON.parse(localStorage.getItem('posts'))
    console.log(posts);
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    confirm('seguro que deseas borrar la noticia');
    getNoticia();
}



