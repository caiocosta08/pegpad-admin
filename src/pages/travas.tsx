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
    field: 'codigo',
    headerName: 'Código',
    width: 220,
    editable: true,
  },
  {
    field: 'qrCode',
    headerName: 'QRCode',
    width: 570,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
  },
  // {
  //   field: 'valor',
  //   headerName: 'Telefone',
  //   width: 140,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `R$${(params.row.valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
  // },
];





import { Trava } from '../interfaces/trava';
import travaServices from '../services/travas';
import { useRouter } from 'next/router';
import { Button } from '@mui/base';
import ModalAdd from '../components/ModalAdd';
import travasServices from '../services/travas';


export default function Travas() {
  const [loading, setLoading] = useState(false);
  const [travas, setTravas] = useState<Trava[]>([]);
  const [modalAddVisible, setModalAddVisible] = useState<boolean>(false);
  const router = useRouter();

  const getTravas = async () => {
    setLoading(true)
    const data: any = await travaServices.getTravas();
    setTravas(data || [])
    setLoading(false)
    return data?.items || []
  };

  const addTrava = async (data: any) => {
    setLoading(true)
    const response: any = await travasServices.register(data);
    await getTravas()
    setLoading(false)
    return response?.items || []
  };
  useEffect(() => {
    getTravas()
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
          <Button style={{ cursor: 'pointer' }} onClick={() => setModalAddVisible(true)}>Criar trava</Button>
        </Box>
        <ModalAdd
          open={modalAddVisible}
          handleClose={() => setModalAddVisible(false)}
          refresh={getTravas}
          onSave={addTrava}
          entityName="Trava"
          entityFields={[{ placeholder: 'nome' }, { placeholder: 'qrCode' }, { placeholder: 'codigo' }]}
        />

        <Box style={{ width: '100%', flex: 1, maxHeight: '100vh', cursor: 'pointer' }}>
          <DataGrid
            getRowId={(row: any) => row?._id ? row._id : Date.now}
            rows={travas || []}
            onRowClick={(e) => router.push('/travas/' + e.id)}
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