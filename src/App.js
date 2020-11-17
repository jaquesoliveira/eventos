import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './view/login'
import NovoUsuario from './view/usuario-novo'
import Home from './view/home';
import {store, persistor} from '../src/store';
import { Provider } from 'react-redux';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import EventoCadastro from './view/evento-cadastro'
import EventoDetalhes from './view/evento-detalhes';

import {PersistGate} from 'redux-persist/integration/react'

function App() {
  return (   
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home}></Route>
          <Route path='/eventos/:id' component={Home}></Route>
          <Route exact path='/novousuario' component={NovoUsuario}></Route>
          <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/eventocadastro' component={EventoCadastro}></Route>
          <Route exact path='/eventodetalhes/:id' component={EventoDetalhes}></Route>
          <Route exact path='/editarevento/:id' component={EventoCadastro}></Route>
        </Router>
      </PersistGate>
  </Provider>
  );
}

export default App;
