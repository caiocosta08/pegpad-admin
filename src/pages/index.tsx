import { useState, FormEvent, useEffect } from 'react';
import Layout from '../layouts/layout';
import loginStyles from '../styles/login.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { settingsUpdateLang, settingsUpdateRole, settingsUpdateToken } from '../store/actions/users/settings';
import { userUpdate } from '../store/actions/users';
import ModalQuestion from '../components/ModalQuestion';
import ModalLoading from '../components/ModalLoading';
import usuariosServices from '../services/usuarios';


export default function Login() {
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const oldState = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true)
    const response = await usuariosServices.login(userName!, password!);
    dispatch(userUpdate(response))
    setLoading(false)
    router.push('http://pegpag.acutistecnologia.com/acessos');
  };

  const { t, i18n } = useTranslation()

  return (
    <Layout login>
      <Grid container className={`${loginStyles.loginWrapper}`}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', mt: 2 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button variant="contained" size='small' onClick={() => { i18n.changeLanguage('en') }}>ENGLISH</Button>
            <Button variant="contained" size='small' onClick={() => { i18n.changeLanguage('ptBR') }}>PORTUGUÉS</Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap" sx={{ textAlign: 'center' }}>
            <Box sx={{ mx: 'auto' }}>
              <Image src="/images/cogni2.svg" height={70} width={70} alt="Cogni2" />
            </Box>
            <Box>
              <Typography variant="h5" component="div">
                {t('title_login')}
              </Typography>
            </Box>
            <Card sx={{ minWidth: 400 }}>
              <CardContent sx={{ p: 3, pb: 0 }}>
                <Paper elevation={0} sx={{ mb: 2 }}>
                  <TextField fullWidth size="small" id="emailInput" onChange={(e) => setUserName(e.target.value)} label="Email" variant="outlined" />
                </Paper>
                <Paper elevation={0} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    type="password"
                    size="small"
                    // @ts-ignore
                    d="passwordInput"
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    variant="outlined"
                  />
                </Paper>
              </CardContent>
              <CardActions sx={{ p: 3 }}>
                <Stack spacing={{ xs: 1 }} sx={{ width: '100%' }}>
                  <Button sx={{ width: '100%' }} variant="contained" type="submit" onClick={handleSubmit}>Login</Button>
                  <Button sx={{ width: '100%' }} variant="text" >Sign up</Button>
                </Stack>
              </CardActions>
            </Card>
            {showAlert && <Alert sx={{ position: 'absolute', right: 20, bottom: 20 }} onClose={() => setShowAlert(false)} severity="error">{alertMsg}</Alert>}
            <ModalQuestion open={isModalQuestionOpen} handleClose={() => setIsModalQuestionOpen(false)} />
            <ModalLoading open={loading} handleClose={() => setLoading(false)} />
          </Stack>
        </Grid>
      </Grid>

    </Layout>
  );
}