import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

interface EmailValues{
  email: string,
  subject: string,
  message: string
}
interface EmailResponse{
  data: string
}

const apiEndpoint = 'http://ec2-34-230-80-159.compute-1.amazonaws.com:4000'
async function enviarCorreo(values: EmailValues){
  try {
    const response = await fetch(`${apiEndpoint}/epa/send-email`,{
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
  
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Error al enviar el correo')
    
  }
}


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const [subject, setAsunto] = React.useState('')
  const [message, setMensaje] = React.useState('')

  const enviarCorreoMutation = useMutation<EmailResponse, Error, EmailValues>({
    mutationFn:enviarCorreo,
    onSuccess: (data) => {
      console.log(data)
      handleClose()
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    enviarCorreoMutation.mutate({email, subject, message})

  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Enviar Email
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Enviar email"}
        </DialogTitle>
        <form action="" className='formularyEmail' onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}>
          <DialogContent>
            <div className='emailFormCont'>
              <TextField id="outlined-basic" type='email' label="Enviar a" variant="outlined" required value={email} onChange={(e)=>setEmail(e.target.value)} sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" label="Asunto" variant="outlined" required value={subject} onChange={(e)=>setAsunto(e.target.value)} sx={{marginBottom:'10px'}}/>
              <TextField id="outlined-basic" label="Mensaje" variant="outlined" required value={message} onChange={(e)=>setMensaje(e.target.value)} sx={{marginBottom:'10px'}}/>

            </div>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button autoFocus type='submit'>
              Enviar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
