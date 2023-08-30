import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import { Input } from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import usuariosServices from '../services/usuarios';

interface ModalAddProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  values?: any[];
}

export default function ModalAdd({ open, handleClose, values, refresh }: ModalAddProps) {

  const schema = yup.object().shape({
    title: yup.string().required('Digite o nome do workspace'),
  });
  const [newProject, setNewProject] = useState({
    titulo: "",
    descricao: "",
    valor: 0
  });

  const handleSaveProject = async () => {
    try {
      const response = await usuariosServices.register(newProject)
      if (response) {
        await refresh()
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px"
            },
          },
        }}
      >
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Box p={3}>
                Crie um novo projeto
              </Box>
              <Box p={3}>
                <Input style={styles.input} placeholder="Título" value={newProject.titulo} onChange={(e) => setNewProject({ ...newProject, titulo: e.target.value })} />
                <Input style={styles.input} placeholder="Descrição" value={newProject.descricao} onChange={(e) => setNewProject({ ...newProject, descricao: e.target.value })} />
                <Input style={styles.input} type='number' placeholder="Valor" value={newProject.valor} onChange={(e) => setNewProject({ ...newProject, valor: parseInt(e.target.value) })} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialogFooter'>
          <Button variant="text" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSaveProject}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const styles: { input: CSSProperties } = {
  input: {
    width: '100%',
    height: 50,
    padding: 5,
    marginTop: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '',
  }
}