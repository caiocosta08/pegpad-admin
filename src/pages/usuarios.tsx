import { useEffect, useState } from 'react';
import Layout from '../layouts/layout';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// const columns: GridColDef[] = [
const columns: any[] = [
  { field: '_id', headerName: 'ID', width: 30 },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 150,
    editable: true,
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    width: 150,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
  },
  {
    field: 'dataDeNascimento',
    headerName: 'Data de Nascimento',
    width: 150,
  },
  // {
  //   field: 'valor',
  //   headerName: 'Telefone',
  //   width: 140,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `R$${(params.row.valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
  // },
];





import { Usuario } from '../interfaces/usuario';
import usuarioServices from '../services/usuarios';
import { useRouter } from 'next/router';
import { Button } from '@mui/base';
import ModalAdd from '../components/ModalAdd';


export default function Usuarios() {
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAddVisible, setModalAddVisible] = useState<boolean>(false);
  const router = useRouter();

  const getUsuarios = async () => {
    setLoading(true)
    const data: any = await usuarioServices.getUsers();
    setUsuarios(data || [])
    setLoading(false)
    return data?.items || []
  };
  useEffect(() => {
    getUsuarios()
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
          <Button style={{ cursor: 'pointer' }} onClick={() => setModalAddVisible(true)}>Criar usuário</Button>
        </Box>
        <ModalAdd open={modalAddVisible} handleClose={() => setModalAddVisible(false)} refresh={getUsuarios} />

        <Box style={{ width: '100%', flex: 1, maxHeight: '100vh', cursor: 'pointer' }}>
          <DataGrid
            getRowId={(row: any) => row?._id ? row._id : Date.now}
            rows={usuarios || []}
            onRowClick={(e) => router.push('/usuarios/' + e.id)}
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