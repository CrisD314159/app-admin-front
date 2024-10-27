import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UserValues{
  cedula: string,
}

interface UserResponse{
  data: Recibo[]
}
interface Recibo{
  codigo: string,
  cedula_cliente: string,
  cobro: string,
  fecha_creacion: string,
  fecha_vencimiento: string,
  paid:number

}

const apiEndpoint = 'http://192.168.64.18:8000'

async function obtenerRecibos(values: UserValues){
  try {
    const response = await fetch(`${apiEndpoint}/epa/invoices/${values.cedula}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response, response.status);
    if(response.status === 200){
      return response.json()
    }else{
      throw new Error('Error al enviar el correo')
    }
  
    
   
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener los recibos')
    
  }
}

async function pagarRecibo(codigo: string){
  try {
    const response = await fetch(`${apiEndpoint}/epa/invoices/${codigo}`,{
      method: 'PUT',
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
    throw new Error('Error al pagar el recibo')
    
  }
}


export default function ObtenerRecibo() {
  const [cedula, setCedula] = useState('')
  const [message, setMessage] = useState('')
  const [recibos, setRecibos] = useState<Recibo[]>([])
  const obtenerRecibosMutation = useMutation<Recibo[], Error, UserValues>({
    mutationFn:obtenerRecibos,
    onSuccess: (data:Recibo[]) => {
      console.log(data);
      setRecibos(data)
    },
    onError: (error) => {
      console.log(error)
    }

  })

  const pagarReciboMutation = useMutation<UserResponse, Error, string>({
    mutationFn:pagarRecibo,
    onSuccess: (data) => {
      console.log(data);
      setMessage('Recibo pagado')
    },
    onError: (error) => {
      console.log(error);
      setMessage('Error al pagar el recibo')
    }
  })

  const handleSubmit = ()=>{
    obtenerRecibosMutation.mutate({cedula})
  }
    return (
      <div className="getUserContMain">
        <h1>Obtener Recibo</h1>
        <div className="getUserCont">
          <form action="" onSubmit={(e)=>{
            e.preventDefault()
            handleSubmit()
          }}>
            <div className='emailFormCont'>
              <TextField id="outlined-basic"  label="Cedula" value={cedula} onChange={(e)=>setCedula(e.target.value)} variant="outlined" required sx={{marginBottom:'10px'}}/>
              <Button variant='outlined' type="submit">Buscar</Button>
            </div>
          </form>
        </div>
        <div>
          <h2>Recibos del usuario</h2>
          <div className="recibosCont">
          <p>{message}</p>
         {
          recibos && recibos.map((recibo:Recibo)=>{
            return (
              <div key={recibo.codigo} className='userInfo'>
                <p><strong>Codigo:</strong> {recibo.codigo}</p>
                <p><strong>Cedula:</strong> {recibo.cedula_cliente}</p>
                <p><strong>Cobro:</strong> {recibo.cobro}</p>
                <p><strong>Fecha de creación:</strong> {recibo.fecha_creacion}</p>
                <p><strong>Fecha de vencimiento:</strong> {recibo.fecha_vencimiento}</p>
                <p><strong>Pagado:</strong> {recibo.paid}</p>
                {recibo.paid === 0 && <Button variant='outlined' onClick={()=>{
                  pagarReciboMutation.mutate(recibo.codigo)
                }}>Pagar</Button>}
                
              </div>
            )
          })
         }

          </div>
      </div>
      </div>
    );  
}