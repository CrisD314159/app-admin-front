import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UserValues{
  cedula: string,
}

interface UserResponse{
  cedula: string,
  nombre: string,
  direccion: string,
  telefono: string,
  estrato: string,
  email: string
}
interface Usuario{
  cedula: string,
  nombre: string,
  direccion: string,
  telefono: string,
  estrato: string,
  email: string

}

const apiEndpoint = 'http://192.168.64.17:3030'
async function obtenerUsuario(values: UserValues){
  console.log(values.cedula);
  try {
    const response = await fetch(`${apiEndpoint}/epa/get-user/${values.cedula}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(response.status === 200){
      return response.json() 
    }else{
      throw new Error('Error al enviar el correo')
    }
  
    
   
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear usuario')
    
  }
}

export default function ObtenerUsuario() {
  const [cedula, setCedula] = useState('')
  const [user, setUser] = useState<Usuario>()
  const obtenerUsuarioMutation = useMutation<UserResponse, Error, UserValues>({
    mutationFn:obtenerUsuario,
    onSuccess: (data) => {
      console.log(data.cedula);
      console.log(data);
      setUser(data)
    },
    onError: (error) => {
      console.log(error)
    },

  }) 
    return (
      <div className="getUserContMain">
        <h1>Obtener Usuario</h1>
        <div className="getUserCont">
          <form action="" onSubmit={(e)=>{
            e.preventDefault()
            obtenerUsuarioMutation.mutate({cedula})
          }}>
            <div className='emailFormCont'>
              <TextField id="outlined-basic" label="Cedula" value={cedula} onChange={(e)=>setCedula(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <Button variant='outlined' type="submit">Buscar</Button>
            </div>
          </form>
        </div>
        <div>
          <h2>Información del usuario</h2>
          <div className="userInfo">
            {
              user ? (
                <>
                  <p>Cedula: {user.cedula}</p>
                  <p>Nombre: {user.nombre}</p>
                  <p>Dirección: {user.direccion}</p>
                  <p>Telefono: {user.telefono}</p>
                  <p>Estrato: {user.estrato}</p>
                  <p>Email: {user.email}</p>
                </>
              ):(
                <p>No se ha encontrado el usuario</p>
              )
            }
        </div>
      </div>
      </div>
    );
}