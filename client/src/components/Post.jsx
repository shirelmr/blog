import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { resolveImage } from "../utils/resolveImage";

export default function Post(){
	const { id_post } = useParams();
	const [post, setPost] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		setError('');

		fetch(`${import.meta.env.VITE_API_URL}/posts/${id_post}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error('No se pudo cargar el post');
				}

				return res.json();
			})
			.then((data) => setPost(data))
			.catch(() => setError('No se pudo cargar la información del post.'))
			.finally(() => setIsLoading(false));
	}, [id_post]);

	if (isLoading) {
		return <p>Cargando post...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	const author = post.author_full_name || post.author_name || post.author || post.name_author || post.id_author;
	const image = resolveImage(post.image || post.img);
	const formattedDate = post.date ? String(post.date).substring(0, 10) : '';

	return(
		<div className='post-detail'>
			{image && <img src={image} alt={post.title || 'Imagen del post'} />}
			<h1>{post.title}</h1>
			<h2>Escrito por: {author}</h2>
			<h2>{formattedDate}</h2>
			<p>{post.text}</p>
		</div>
	);
}