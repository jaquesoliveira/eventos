import React, {useState} from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';


function NovoUsuario(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1)

        if(!email || !senha){
            setMsgTipo('erro')
            setCarregando(0);
            setMsg('Você precisa informar email e senha')
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(resultado => {
                setCarregando(0);
                setMsgTipo('sucesso')
            }).catch(erro => {
                setMsgTipo('erro')
                setCarregando(0);                
                switch(erro.message)
                {
                    case 'Password should be at least 6 characters':
                        setMsg('A senha deve ter pelo menos 6 caracteres');
                        break;
                    case 'The email address is already in use by another account.':
                        setMsg('Este e-mail já está sendo utilizado por outro usuário')    
                        break;

                    case 'The email address is badly formatted.':
                        setMsg('O formato do e-mail é inválido')    
                        break;
                    default:
                        setMsg('Não foi possível cadastrar. Tente novamente mais tarde!')    
                }
            });
    }

    return(
        <>
            <Navbar />

            {msgTipo === 'sucesso' ?
                    <div class="alert alert-primary" role="alert">
                       <span>Usuário cadastrado com sucesso &#128526;</span>
                    </div>
                    : ''
                }

                {msgTipo === 'erro' ?    
                    <div class="alert alert-danger" role="alert">
                        <span><strong>Oops!</strong> {msg} &#128546;</span>
                    </div>
                :''}

            <div className="form-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                    <input onChange={(e)=>setEmail(e.target.value)}  type="email" className="form-control my-2" placeholder="Email"></input>
                    <input onChange={(e)=>setSenha(e.target.value)}  type="password" className="form-control my-2" placeholder="senha"></input>

                    {
                        carregando ?  <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                        </div> : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-1 btn-cadastro">Cadastrar</button>
                    }
                    
                    <Link to='/' type="button" className="btn btn-lg btn-block mb-1 btn-secondary">Voltar</Link>
                    
                </form>
            </div>
        </>
    )
}

export default NovoUsuario;