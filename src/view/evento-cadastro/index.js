import React, {useState, useEffect}  from 'react';
import './evento-cadastro.css';
import Navbar from '../../components/navbar';

import firebase from '../../config/firebase'
import 'firebase/auth';

import {useSelector} from 'react-redux';


function EventoCadastro(props){
    
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const [urlImg, setUrlImg] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();

    const [carregando, setCarregando] = useState();
        useEffect(() =>{
            if(props.match.params.id){
                firebase.firestore().collection('eventos').doc(props.match.params.id).get()
                .then(resultado => {
                    carregarImagem(resultado.data())    
                    
                    setTitulo(resultado.data().titulo);
                    setTipo(resultado.data().tipo);
                    setDetalhes(resultado.data().detalhes);
                    setData(resultado.data().data);
                    setHora(resultado.data().hora);
                    setFotoAtual(resultado.data().foto);                    
                })
            }    
        },[])
    

    function carregarImagem(eve){        
        firebase.storage().ref(`imagens/${eve.foto}`).getDownloadURL()
            .then(url => {
                setUrlImg(url)
            })
    }

    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);

        if(props.match.params.id){
            if(fotoNova){
                storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);   
                console.log(fotoNova)
            }

            console.log(fotoAtual.name)
            
            db.collection('eventos').doc(props.match.params.id).update({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                foto: fotoNova ? fotoNova.name : fotoAtual
                
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro =>{
                setMsg(erro);
                setMsgTipo('erro');
                setCarregando(0);
            });
            //})        
        }else{
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
                db.collection('eventos').add({
                    titulo: titulo,
                    tipo: tipo,
                    detalhes: detalhes,
                    data: data,
                    hora: hora,
                    usuario: usuarioEmail,
                    visualizacoes:0,
                    foto: fotoNova.name,
                    publico: 1,
                    criacao: new Date()
                }).then(() => {
                    setMsgTipo('sucesso');
                    setCarregando(0);
                }).catch(erro =>{
                    setMsg(erro);
                    setMsgTipo('erro');
                    setCarregando(0);
                });
            })
        }
    }

    return(
        <>  
            <Navbar />

                {msgTipo === 'sucesso' ?
                    <div class="alert alert-primary" role="alert">
                        <span><strong>Wow!</strong> Evento cadastrado com sucesso &#128526;</span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    : ''
                }

                {msgTipo === 'erro' ?    
                    <div class="alert alert-danger" role="alert">
                       <span><strong>Oops!</strong> {msg} &#128546;</span>
                       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                :''}
                
            {
                useSelector(state => state.usuarioLogado) > 0 ?
            <div className="col-12" >
                <form className="form-evento mx-auto">
                    <div className="row">
                        <h3 className="mx-auto font-weight-bold mt-3">
                            Cadastro de Evento
                        </h3>
                    </div>

                
                    <div className="form-group">
                        <label>Título: </label>
                        <input onChange={(e)=>setTitulo(e.target.value)} 
                            type="text" className="form-control" value={titulo} />
                    </div> 

                    <div className="form-group">
                        <label>Tipo do evento: </label>
                        <select  onChange={(e)=>setTipo(e.target.value)}  
                            className="form-control" value={tipo && tipo}>
                            <option disabled selected value>-- Selecione um tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>  

                    <div className="form-group">
                        <label>Detalhes: </label>
                        <textarea onChange={(e)=>setDetalhes(e.target.value)} 
                            className="form-control" rows="3" value={detalhes && detalhes}/>
                    </div>  

                     <div className="form-group row">
                        <div className="col-6">
                            <label>Data: </label>
                            <input onChange={(e)=>setData(e.target.value)} 
                                type="date" className="form-control" value={data && data}/>
                        </div>

                        <div className="col-6">
                            <label>Hora: </label>
                            <input onChange={(e)=>setHora(e.target.value)} 
                                type="time" className="form-control" value={hora && hora}/>
                        </div>
                    </div> 
                    
                    <div className="form-group">
                        <label>Imagem: </label>
                        <input onChange={(e)=>setFotoNova(e.target.files[0])} type="file" 
                            className="form-control"/>
                    </div>

                    <div className="row">
                        <img src={fotoNova ? fotoNova : urlImg } className="img-banner" alt="banner"/>
                        {console.log(fotoNova)}
                    </div> 
                    
                    <div className="row">                    
                    {
                        carregando ?  
                            <div class="spinner-border text-danger mx-auto" role="status">
                            </div> 
                            : 
                            <button onClick={cadastrar} type="button" 
                                className="btn btn-lg btn-block mt-3 mb-1 btn-cadastro">
                                    {props.match.params.id ? 'Alterar Evento' : 'Publicar Evento'}
                            </button>
                    }    
                    </div>                                             
                    
                </form>
            </div>
            : 
            <div class="alert alert-danger" role="alert">
                <span><strong>Oops!</strong> Você não está logado... &#128546;</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            }
        </>
    )
}

export default EventoCadastro;