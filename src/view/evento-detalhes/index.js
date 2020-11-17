import React, {useState, useEffect} from 'react';
import './evento-detalhes.css';
import {Link, Redirect} from 'react-router-dom';
import Navbar from '../../components/navbar'

import firebase from '../../config/firebase'
import {useSelector} from 'react-redux';
import Footer from '../../components/rodape';

function EventoDetalhes(props){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const [carregando, setCarregando] = useState(1);
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const [excluido, setExcluido] = useState(0);

    function remover(){
        firebase.firestore().collection('eventos').doc(props.match.params.id).delete()
            .then(( )=> {
                setExcluido(1);        
            })
    }

    useEffect(() =>{
        firebase.firestore().collection('eventos').doc(props.match.params.id).get()
            .then(resultado => {
                setEvento(resultado.data())                
                carregarImagem(resultado.data())
                
                firebase.firestore().collection('eventos').doc(props.match.params.id)
                    .update('visualizacoes', resultado.data().visualizacoes + 1)
            })        
    },[])

    function carregarImagem(eve){
        firebase.storage().ref(`imagens/${eve.foto}`).getDownloadURL()
            .then(url => {
                setUrlImg(url)
                setCarregando(0)
            })
    }

    return(
        <>
            <Navbar />     
            {excluido ? <Redirect to="/" />: null}       
            <div className="container-fluid">

                {
                    carregando > 0 ? <div className="row "> <div class="spinner-border text-danger mx-auto" role="status">
                                        </div></div> :

                <div>
                <div className="row">
                    <img src={urlImg} className="img-banner" alt="banner"/>

                    <div className="col-12 text-right mt-1 visualizacoes">
                        <i className="fas fa-eye"><span>{evento.visualizacoes + 1}</span></i>
                    </div>
                </div>

                <div className="row mt-5 d-flex justify-content-around">
                    <div className="col-md-3 col-sm-12 box-info p-3 my-1">
                        <i className="fas fa-ticket-alt fa-2x"></i>
                        <h5><strong>Tipo</strong></h5>
                        <span className="mt-3">{evento.titulo}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 box-info p-3 my-1">
                        <i className="fas fa-calendar-alt fa-2x"></i>
                        <h5><strong>Data</strong></h5>
                        <span className="mt-3">{evento.data}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 box-info p-3 my-1">
                        <i className="fas fa-clock
                         fa-2x"></i>
                        <h5><strong>Hora</strong></h5>
                        <span className="mt-3">{evento.hora}</span>
                    </div>
                </div>
                <div className="row box-detalhes mt-5">
                    <div className="col-12 text-center">                    
                        <h5><strong>Detalhes do Evento</strong></h5>
                    </div>
                
                    <div className="col-12 text-center">  
                        {evento.detalhes}                    
                    </div>
                </div>
                {
                    evento.usuario === usuarioLogado ? 
                    <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar "><i className="fas fa-pen-square fa-3x"></i></Link>
                    :'' 
                }
                

                {
                    evento.usuario === usuarioLogado ? 
                    <button type="button" onClick={remover} className="btn btn-lg btn-block mt-3 mb-1 btn-cadastro" >
                        excluir
                    </button>
                    :'' 
                }
                </div>
                }

               
            </div>
            <Footer />
        </>
    )
}

export default EventoDetalhes;