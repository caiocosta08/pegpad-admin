import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { Input } from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';

interface Field {
  placeholder: string;
  type?: string;
  validation?: any;
}

interface GenericModalProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  entityName: string;
  entityFields: Field[];
  onSave: (data: any) => Promise<boolean>;
}

export default function GenericModal({ 
  open, 
  handleClose, 
  entityName, 
  entityFields, 
  onSave, 
  refresh 
}: GenericModalProps) {
  
  const [formData, setFormData] = useState<any>({});

  const handleSaveEntity = async () => {
    try {
      const response = await onSave(formData)
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
                {`Crie um novo ${entityName}`}
              </Box>
              <Box p={3}>
                {entityFields.map((field, index) => (
                  <Input 
                    key={index} 
                    style={styles.input} 
                    placeholder={field.placeholder} 
                    type={field.type || 'text'} 
                    value={formData[field.placeholder]} 
                    onChange={(e) => setFormData({ ...formData, [field.placeholder]: e.target.value })} 
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialogFooter'>
          <Button variant="text" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSaveEntity}>
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