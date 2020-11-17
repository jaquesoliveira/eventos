import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';
import {useSelector} from 'react-redux';

import firebase from '../../config/firebase'

function Home({match}){

    
    const[eventos, setEventos] = useState([]);    
    const [pesquisa, setPesquisa] = useState('');    
    let listaEventos = [];  
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {

        if(match.params.id){
            firebase.firestore().collection('eventos').where('usuario','==',usuarioEmail).get().then(async(resultado) =>{
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0)
                    {
                        listaEventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                console.log(pesquisa)
                setEventos(listaEventos);       
            })
        }else{
            firebase.firestore().collection('eventos').get().then(async(resultado) =>{
                await resultado.docs.forEach(doc => {
                    if(doc.data().titulo.indexOf(pesquisa) >= 0)
                    {
                        listaEventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                console.log(pesquisa)
                setEventos(listaEventos);       
            })
        }          
    },[pesquisa])

    return(
        <>
            <Navbar />

            <div className="container-fluid">

                <div className="row p-3 mt-2" >
                    <h3 className="mx-auto">Eventos Publicados</h3>
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control mt-3" placeholder="Pesquisar evento pelo título..." />   
                </div>

                <div className="row ">
                    {eventos.map(item => 
                        <EventoCard 
                            key={item.id}
                            id={item.id}
                            img={item.foto} 
                            titulo={item.titulo}
                            detalhe={item.detalhes}
                            visualizacoes={item.visualizacoes}/> )}
                </div>
            </div>    
        </>
    )
}

export default Home;