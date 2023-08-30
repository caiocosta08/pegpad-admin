import { useEffect, useState } from 'react';
import Layout from '../layouts/layout';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// const columns: GridColDef[] = [
const columns: any[] = [
  // { field: '_id', headerName: 'ID', width: 30 },
  {
    field: 'usuarioId',
    headerName: 'Usuário',
    width: 210,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.usuarioId.email}`,
  },
  {
    field: 'travaId',
    headerName: 'Trava',
    width: 150,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => `${params.row.travaId.nome}`,
  },
  {
    field: 'data',
    headerName: 'Data',
    width: 220,
    valueGetter: (params: GridValueGetterParams) => `${params.row.data.split('T')[1].replace('Z', '')} - ${params.row.data.split('T')[0]}`,
  },
  {
    field: 'lat',
    headerName: 'Latitude',
    width: 170,
  },
  {
    field: 'long',
    headerName: 'Longitude',
    width: 170,
  },
];





import { Acesso } from '../interfaces/acesso';
import acessoServices from '../services/acessos';
import { useRouter } from 'next/router';
import { Button } from '@mui/base';
import ModalAdd from '../components/ModalAdd';


export default function Acessos() {
  const [loading, setLoading] = useState(false);
  const [acessos, setAcessos] = useState<Acesso[]>([]);
  const [modalAddVisible, setModalAddVisible] = useState<boolean>(false);
  const router = useRouter();

  const getAcessos = async () => {
    setLoading(true)
    const data: any = await acessoServices.getAcessos();
    console.log({ acessos: data })
    setAcessos(data || [])
    setLoading(false)
    return data?.items || []
  };
  useEffect(() => {
    getAcessos()
  }, [])


  if (loading) return (
    <Layout>
      <Stack spacing={3}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Stack>
    </Layout>

  )

  else return (
    // @ts-ignore
    <Layout>
      <Stack spacing={3} >
        <Box>
          <Button style={{ cursor: 'pointer' }} onClick={() => setModalAddVisible(true)}>Criar acesso</Button>
        </Box>
        <ModalAdd open={modalAddVisible} handleClose={() => setModalAddVisible(false)} refresh={getAcessos} />

        <Box style={{ width: '100%', flex: 1, maxHeight: '100vh', cursor: 'pointer' }}>
          <DataGrid
            getRowId={(row: any) => row?._id ? row._id : Date.now}
            rows={acessos || []}
            onRowClick={(e) => router.push('/acessos/' + e.id)}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>

      </Stack >
    </Layout >
  );
}