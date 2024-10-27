import { Button, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

interface LoginValues {
  email: string,
  password: string

}

interface LoginResponse{
  accessToken: string
}


const apiEndpoint = 'http://192.168.64.16:3000'
async function login(values: LoginValues){
  console.log(values);
  try {
    const response = await fetch(`${apiEndpoint}/apiAuth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    console.log(response, response.status);
    if(response.status === 201){
      return response.json() 
    }else{
      throw new Error('Error al enviar el correo')
    }
  
    
   
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear usuario')
    
  }
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const loginMutation = useMutation<LoginResponse, Error, LoginValues>({
    mutationFn:login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  return (
    <div className="getUserContMain">
        <h1>Obtener Token</h1>
        <div className="getUserCont">
          <form action="" onSubmit={(e)=>{
            e.preventDefault()
            loginMutation.mutate({email, password})
          }}>
            <div className='emailFormCont'>
              <TextField id="outlined-basic" type="email" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <Button variant='outlined' type="submit">Login</Button>
            </div>
          </form>
        </div>
        <div>
          <h2>Token del usuario</h2>
          <div className="userInfo">
            <p>Token: {accessToken}</p>
        </div>
      </div>
      </div>
  )
}