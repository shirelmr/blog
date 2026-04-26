import { useState} from "react";
import { useNavigate } from "react-router";

export default function Login({ onLoginSuccess }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        setError('');

        fetch('http://localhost:8000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(async (res) => {
            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || 'No se pudo iniciar sesion');
            }
            return res.json();
        })
        .then((data) => {
            if (onLoginSuccess) {
                onLoginSuccess();
            }
            navigate('/');
        })
        .catch((error) => {
            setError(error.message || 'Usuario o contrasena incorrectos.');
        });
    }
    return(
        <div className="login">
            <h1>Inicia sesion</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor='username'>Usuario</label>
                <input
                    id='username'
                    type='text'
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder='Tu usuario'
                    autoComplete='username'
                ></input>
                <label htmlFor='password'>Contrasena</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='Tu contrasena'
                    autoComplete='current-password'
                ></input>
                <input type='submit' value='Entrar' className="submit"></input>
                {error ? <p className='login-error'>{error}</p> : null}
            </form>
        </div>
    )
}