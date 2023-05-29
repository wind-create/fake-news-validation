import React from 'react';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import useMediaQuery from "@mui/material/useMediaQuery";
import intent_confusion_matrix from "assets/intent_confusion_matrix.png"
import intent_histogram from "assets/intent_histogram.png"
import { Box } from '@mui/material';

const Dashboard = () => {
  // const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="1.5rem 2.5rem" sx={{
      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
    }}>
       <FlexBetween>
       <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
       
       </FlexBetween>
       <FlexBetween>
       
       
       <Box
       component="img"
       alt="intent_confusion_matrix"
       src={intent_confusion_matrix}
       height="800px"
       width="1000px"
       />
       </FlexBetween>
    </Box>
  )
}

export default Dashboard