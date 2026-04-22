import { useState } from "react";
import { useNavigate } from "react-router";

export default function NewPost(){
const navigate = useNavigate();
const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [text, setText] = useState('');
const [img, setImg] = useState(null);
const [status, setStatus] = useState('');
function handleTitleChange(e){
setTitle(e.target.value);
}
function handleAuthorChange(e){
setAuthor(e.target.value);
}
function handleTextChange(e){
setText(e.target.value);
}
function handleFile(e){
const selectedFile = e.target.files?.[0];
if(!selectedFile){
setImg(null);
return;
}
const fileInfo = {
file: selectedFile,
filename: selectedFile.name
};
setImg(fileInfo);
}
function handleSubmit(e){
e.preventDefault();

if(!title.trim() || !author.trim() || !text.trim() || !img){
setStatus('Completá titulo, autor, texto e imagen.');
return;
}

const formInfo = new FormData();
formInfo.append('title', title);
formInfo.append('author', author);
formInfo.append('text', text);
formInfo.append('img', img.file, img.filename);
fetch("http://localhost:8000/posts/new",{
method: "POST",
body: formInfo,
})
.then((res) => {
if(!res.ok){
throw new Error('No se pudo crear el post.');
}
setStatus('Post agregado correctamente. Redirigiendo al blog...');
setTitle('');
setAuthor('');
setText('');
setImg(null);
setTimeout(() => navigate('/blog'), 900);
})
.catch( () => {
setStatus('Hubo un error al guardar el post.');
})
}
return(
<div className="new-post-wrapper">
<h1>Nuevo post</h1>
<form className="new-post-form" onSubmit={handleSubmit}>
<input type='text' placeholder='Titulo del post' value={title} onChange={handleTitleChange}></input>
<input type='text' placeholder='Autor (ej. Juan Perez)' value={author} onChange={handleAuthorChange}></input>
<textarea placeholder='Escribi el texto del post...' value={text} onChange={handleTextChange} rows={7}></textarea>
<input type='file' onChange={handleFile} accept='image/*'></input>
<button type='submit'>Publicar post</button>
{status && <p className='status-message'>{status}</p>}
</form>
</div>
);
}