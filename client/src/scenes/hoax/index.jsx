import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetQAHoaxNewsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Hoax = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetQAHoaxNewsQuery();
  console.log("data", data);
  return (
    <div>Hoax</div>
  )
}

export default Hoax