import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


interface UserValues{
  cedula: string,
  nombre: string,
  direccion: string,
  telefono: string,
  estrato: string,
  email: string,
  password: string
}
interface UserResponse{
  message: string
}

const apiEndpoint = 'http://192.168.64.17:3030'

async function crearUsuario(values: UserValues){
  try {
    const response = await fetch(`${apiEndpoint}/epa/create-user`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
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

export default function CrearUsuario() {
  
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [estrato, setEstrato] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const createUserMutation = useMutation<UserResponse, Error, UserValues>({
    mutationFn:crearUsuario,
    onSuccess: (data) => {
      setMessage(data.message)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleSubmit = () => {
    createUserMutation.mutate({cedula, nombre, direccion, telefono, estrato, email, password})

  }
    return (
      <div className="getUserContMain">
        <h1>Crear Usuario</h1>
        <div className="getUserCont">
          <form action="" onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
          }}>
            <div className='emailFormCont'>
              <TextField id="outlined-basic" value={cedula} onChange={(e)=>setCedula(e.target.value)} label="Cedula" variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" value={nombre} label="Nombre" onChange={(e)=>setNombre(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" value={direccion} label="Direccion" onChange={(e)=>setDireccion(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" value={telefono} label="Telefono" onChange={(e)=>setTelefono(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" value={estrato} label="Estrato" onChange={(e)=>setEstrato(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" value={email} label="E-mail" onChange={(e)=>setEmail(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" value={password} label="Contraseña" type="password" onChange={(e)=>setPassword(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <Button variant='outlined' type="submit">Crear</Button>
              <p>{message}</p>
            </div>
          </form>
        </div>
      </div>
    );
}