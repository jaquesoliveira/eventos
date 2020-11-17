import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';

import './evento-card.css';

function EventoCard(props){

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        firebase.storage().ref(`imagens/${props.img}`).getDownloadURL()
            .then(url => setUrlImagem(url))                       
    },[urlImagem]); 

    return(
        <div className="my-card col-md-3 col-sm-12 ">
            <img id="banner-evento" src={urlImagem} className="card-img-top img-cartao mx-auto" alt="Imagem do evento" />

            <div className="card-body">
                <h5>{props.titulo}</h5>
                <p className="card-text text-justify">
                    {props.detalhe}                     
                </p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to={'/eventodetalhes/' + props.id} className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>

                    <div className="col-6 text-right">
                        <i className="fa fa-eye" />
                        {props.visualizacoes}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventoCard;