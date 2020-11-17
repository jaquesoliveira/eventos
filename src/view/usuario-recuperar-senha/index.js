import React, {useState} from 'react';
import './usuario-recuperar-senha.css';

import firebase from '../../config/firebase'
import 'firebase/auth';

import Navbar from '../../components/navbar'

function UsuarioRecuperarSenha(){

    const [email, setEmail] = useState();    
    const [msg, setMsg] = useState();

    function recuperarSenha(){
        firebase.auth().sendPasswordResetEmail(email).then(resultado =>{
            setMsg('Enviamos um link de redefinição de senha para seu e-mail');

        }).catch(erro =>{
            setMsg('Verifique se o e-mail está correto!')
        });
    }

    return(
        <>
            <Navbar />
            
            <form className="text-center form-login mx-auto mt-5">
                <h3 className="mb-3">Recuperar Senha</h3>
                <input onChange={(e) =>setEmail(e.target.value) } type="email" className ="form-control my-2" /> 

                <button onClick={recuperarSenha} type="button" className="btn btn-block btn-enviar">Recuperar</button>

                <div className="msg my-4">
                    <span className="msg my-4 text-center">{msg}</span>
                </div>
            </form>
            
        </>
    )
}

export default UsuarioRecuperarSenha;