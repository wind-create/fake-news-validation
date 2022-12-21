import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetFaqQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Faq = () => {
  const theme = useTheme();
  const [sort, setSort] = useState({});
  const { data, isLoading } = useGetFaqQuery({
    sort: JSON.stringify(sort),
  });
  console.log("data", data);

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
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="data FAQ" subtitle="List pertanyaan dan response FAQ"/>
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