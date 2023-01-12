import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetFaqQuery} from "state/api";
import Header from "components/Header";
import { DataGrid} from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Faq = () => {
  const theme = useTheme();
  const [ deletedId, setDeletedId ] = useState(null);
  const [sort, setSort] = useState({});
  const { data, isLoading } = useGetFaqQuery({
    sort: JSON.stringify(sort),
  });

  useEffect(() => {
    if (deletedId) {
      // refresh component by re-fetching the data
      const { data, isLoading } = useGetFaqQuery({
      sort: JSON.stringify(sort),
      });
    }
  }, [deletedId]);

  // const fetchData = async () => {
  //   const { data, isLoading } = await useGetFaqQuery({
  //   sort: JSON.stringify(sort),
  //   });
  // }
  // const [faqData, setFaqData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  
  // useEffect(() => {
  //     if (deletedId) {
  //       // refresh component by re-fetching the data
  //       setIsLoading(true);
  //       const { data } = useGetFaqQuery({sort: JSON.stringify(sort)});
  //       setFaqData(data);
  //       setIsLoading(false);
  //     }
  //   }, [deletedId]);
  
  const navigate = useNavigate()
  // const deletedFAQ= async (id) => {
  //   try {
  //     await axios.delete(process.env.REACT_APP_BASE_URL + `/client/faq/${id}/deletefaq`);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log("data", data);
  const onButtonDeleteClick = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(process.env.REACT_APP_BASE_URL + `/client/faq/${id}/deletefaq`);
      setDeletedId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const onButtonEditClick = (e, id) => {
    e.stopPropagation();
    //do whatever you want with the row
    navigate(`/client/faq/${id}/editdatafaq`)
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "pertanyaan",
      headerName: "pertanyaan",
      flex: 0.5,
    },
    {
      field: "response",
      headerName: "response",
      flex: 0.5,
    },
    {
      field: 'edit',
      headerName: 'edit',
      sortable: false,
      renderCell: (row) => {
        return (
          <Button
            onClick={(e) => onButtonEditClick(e, row.id)}
            variant="contained"
          >
            edit
          </Button>
        );
      }
      },
      {
        field: 'delete',
        headerName: 'delete',
        sortable: false,
        renderCell: (row) => {
          return (
            <Button
              onClick={(e) => onButtonDeleteClick(e, row.id)}
              variant="contained"
            >
              Delete
            </Button>
          );
        }
      },
    
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Data FAQ" subtitle="List Pertanyaan dan Response FAQ"/>
      <Box
      mt="30px"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
      }}
      >
        <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={data || []}
        columns={columns}
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  )
}

export default Faq