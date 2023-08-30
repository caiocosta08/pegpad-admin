import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { settingsUpdateLang } from '../../store/actions/users/settings'
import { useTranslation } from 'react-i18next';
import usersServices from '../../services/usuarios';
import { AvatarCard, AvatarChip } from '../../styles/styled';
const settingsConfig: string[] = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string | any>(null);
  const [switchOn, setSwitchOn] = useState<boolean | any>(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, settings } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (settings.language == 'en') setSwitchOn(true)
    console.log('1', switchOn, settings)
  }, [])

  useEffect(() => {
    setSwitchOn(settings.language == 'en' ? true : false)
    console.log('2', settings.language)
    i18n.changeLanguage(settings.language)
  }, [settings.language])

  useEffect(() => {
    if (switchOn) dispatch(settingsUpdateLang('en'))
    if (!switchOn) dispatch(settingsUpdateLang('ptBR'))
    console.log('3', switchOn)
  }, [switchOn])

  const getUsers = async () => {
    // const data: any = await usersServices.getUsers();
    // setUsers(data);
  };

  const getUserName = (userInfo: any, initials?: boolean) => {
    if (initials)
      return userInfo?.first_name ? userInfo?.first_name[0] + userInfo?.last_name[0] : null
    else
      return userInfo?.first_name ? userInfo?.first_name + " " + userInfo?.last_name : null
  };
  useEffect(() => {
    getUsers()
    console.log(user)
  }, [])

  return (
    <AppBar className='navbar' position="static" elevation={0}>
      <Container
        // @ts-ignore
        maxWidth="none"
      >
        <Toolbar
          disableGutters
        >
          <Box sx={{
            ml: { sm: 0, md: 3 },
          }}>
            <Image src="/images/logo.png" height={50} width={160} style={{ marginLeft: 20, paddingTop: 10 }} alt="Cogni2" />
          </Box>

          {/* <Typography component="div" sx={{ flexGrow: 1, color: '#5F5F5F' }}>
               PT-BR <Switch checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)}/> ENG
          </Typography> */}

          <Typography component="div" sx={{ flexGrow: 1 }}></Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={handleOpenUserMenu}
              sx={{ textTransform: 'none', color: 'white' }}
            >
              <Stack direction="row" className="dropdownWrapper" sx={{ alignItems: 'center' }}>
                {/* <Avatar className="navbarAvatar" sx={{ mr: 2 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AvatarCard>
                  {((user && !user?.photo) || user?.photo[0] !== 'h') && <div
                    style={{
                      width: 30, height: 30, borderRadius: 50, backgroundColor: "#ddd", color: "#aaa",
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginRight: 3
                    }}>{getUserName(user, true)}</div>}
                  {((user && user?.photo) && user?.photo[0] === 'h') &&
                    <AvatarChip src={user?.photo} height={35} width={35} alt={getUserName(user)} />}
                </AvatarCard>

                <Stack sx={{ alignItems: 'start' }}>
                  {user && <Typography fontSize={18} fontWeight={'bold'}>{getUserName(user)}</Typography>}
                  <Typography fontSize={12}>{settings?.role || 'Usuário não logado'}</Typography>
                </Stack>
              </Stack>
            </Button>
            <Menu
              sx={{ mt: '70px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsConfig.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
