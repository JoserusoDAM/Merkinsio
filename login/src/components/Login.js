import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { fire, googleAuthProvider } from '../config/init-firebase'

const Login = (props) => {

    const [isRegister, setRegister] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const hadleRegister = () => {
        setRegister(false)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmitCreate = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                localStorage.setItem('uid', res.user.uid);
                console.log(res.user.uid)
                history.push("/logged")
                console.log(res)    
            })    
            .catch(function (error) {
                // Handle Errors here.
                alert(error)
                console.log(error)
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                alert(errorCode)
                console.log(errorMessage);
                alert(errorMessage)
            });
    }

    const handleSubmitSign = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res.user.uid)
                localStorage.setItem('uid', res.user.uid);
                history.push("/logged")
                console.log(res)
                
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                alert(errorCode);
                console.log(errorMessage);
               // alert(errorCode);
            });
    }

    //var provider = new firebase.auth.GoogleAuthProvider();
    const googleButton = () => {
        fire.auth().signInWithPopup(googleAuthProvider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token)
            // The signed-in user info.
            var user = result.user;
            history.push("/logged")
            console.log(user.uid)
            localStorage.setItem('uid', user.uid);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode)
            var errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            console.log(email)
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential)
            // ...
        });
    }

    return (
        isRegister ?
            <form onSubmit={handleSubmitSign}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Dirección email</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Introducir email"
                        required
                        onChange={handleEmail}
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password"
                        className="form-control"
                        id="pasword"
                        placeholder="Password"
                        required
                        minLength="6"
                        onChange={handlePassword}
                        value={password}
                    />
                </div>
                <div >
                    <label onClick={hadleRegister}><u>No estoy registrado</u></label>
                </div>
                <div>
                    <button type="submit"
                        className="btn btn-primary"
                    >Entrar</button>
                </div>
                <div>
                    <button className="btn btn-primary" style={{marginTop: '5px'}} onClick={googleButton}>Entrar con google
                </button>
                </div>
            </form>
            :
            <form onSubmit={handleSubmitCreate}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Direccion email</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Introducir email"
                        required
                        onChange={handleEmail}
                        value={email} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password"
                        className="form-control"
                        id="pasword"
                        placeholder="Password"
                        required
                        minLength="6"
                        onChange={handlePassword}
                        value={password}
                    />
                </div>
                <button type="submit"
                    className="btn btn-primary">Entrar</button>
            </form>
    );
}

export default Login;