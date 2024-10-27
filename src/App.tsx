import './App.css'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import AlertDialog from './components/AlertDialog'

function App() {


  return (
    <>
     <header className='headerPrincipal'>
      <h1>
        EPA - Empresas Públicas de Armenia
      </h1>
     </header>
     <div className='mainContainer'>
      <div className='card cardUsuario'>
        <h1>Servicios de usuario</h1>
        <div>
          <p>Aquí puede obtener los usuario mediante su cedula y crear nuevos usuarios en la base de datos</p>
          <div className='buttonContainer'>
            <NavLink to='/obtener-usuario' className='link'><Button variant='outlined' sx={{width:'100%'}}>Obtener información del usuario</Button></NavLink>
            <NavLink to='/crear-usuario' className='link'><Button variant='outlined' sx={{width:'100%'}}>Crear un usuario</Button></NavLink>
          </div>
        </div>
      </div>
      <div className='card cardInvoices'>
        <h1>Servicios de recibos</h1>
        <p>Aquí puede obtener el historial de los recibos de un usuario, y en caso de que no estén pagos, puede pagarlos</p>
        <div className='buttonContainer'>
          <NavLink to='/obtener-recibo'className='link'><Button variant='outlined' sx={{width:'100%'}}>Obtener recibos</Button></NavLink>
        </div>
      </div>
      <div className='card classEmail'>
        <h1>Enviar E-mail</h1>
        <p>Envíe un email con la información que desee</p>
        <div className='buttonContainer'>
          <AlertDialog/>
        </div>
      </div>
      <div className='card cardInvoices'>
        <h1>Servicios de login (Token)</h1>
        <p>Aquí puede obtener un token para acceder a otros servicios externos de la empresa</p>
        <div className='buttonContainer'>
          <NavLink to='/login'className='link'><Button variant='outlined' sx={{width:'100%'}}>Loguearse</Button></NavLink>
        </div>
      </div>

     </div>
    </>
  )
}

export default App
