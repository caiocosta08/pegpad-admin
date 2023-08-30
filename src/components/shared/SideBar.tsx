import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import colors from '../../styles/_colors.module.scss';
import { useRouter } from 'next/router';
import { logoutUser } from '../../store/actions/users';
import { resetUser } from '../../store/actions//users/settings';
import { useDispatch } from 'react-redux';
import { Checklist, Person, Lock } from '@mui/icons-material';

interface Route {
  text: string;
  url: string;
  icon: string;
}

export default function Sidebar() {

  const routes: Route[] = [
    { text: 'Usuários', url: '/usuarios', icon: 'headset' },
    { text: 'Acessos', url: '/acessos', icon: 'brain' },
    { text: 'Travas', url: '/travas', icon: 'chart-relationship' },
  ];
  const router = useRouter();

  const LinkContainer = (route: Route) => {
    return (
      <Link href={route.url}>
        <Tooltip title={route.text} placement='top'>
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {route.url === '/usuarios' && <Person style={{ height: 24, width: 24 }} />}
            {route.url === '/acessos' && <Checklist style={{ height: 24, width: 24 }} />}
            {route.url === '/travas' && <Lock style={{ height: 24, width: 24 }} />}
          </ListItemIcon>
        </Tooltip>
      </Link>
    );
  }
  const useLogout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
      dispatch(logoutUser()); // Dispara a ação que limpa todos os reducers
      dispatch(resetUser()); // Dispara a ação que limpa todos os reducers
      router.push('http://18.222.169.213/'); // Redireciona para a página inicial
    };

    return handleLogout;
  };

  const logout = useLogout()
  const LogoutLinkContainer = (route: Route) => {
    return (
      // <Link href={route.url}>
      <Link onClick={logout} href="/">
        <Tooltip title={route.text} placement='top'>
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <Image src={`/images/icons/${route.icon}.svg`} height={24} width={24} alt="Delete" />
          </ListItemIcon>
        </Tooltip>
      </Link>
    );
  }

  return (
    <Box sx={{ position: 'absolute' }}>
      <Drawer
        variant="permanent"
        sx={{ '& .MuiDrawer-paper': { pt: '5vh', display: 'flex', height: '100vh', top: 0, backgroundColor: colors.sidebarBg } }}
        PaperProps={{
          sx: {
            backgroundColor: colors.sidebarBg
          }
        }}
      >
        <List>
          {routes.map((route, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 2,
                  px: 0,
                  mb: 2,
                  backgroundColor: router.pathname === route.url ? '#223FA7' : "transparent"
                }}
              >
                <LinkContainer {...route} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ListItemButton
          sx={{
            mt: 'auto',
            minHeight: 48,
            position: 'absolute',
            bottom: 0,
            px: 0,
            mb: 2
          }}
        >
          <Tooltip title='Sair' placement='top'>
            <ListItemIcon
              sx={{
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <LogoutLinkContainer text="Logout" url="/" icon="logout" />
            </ListItemIcon>
          </Tooltip>
        </ListItemButton>
      </Drawer>
    </Box>
  );
}
