import { Box, Button, TextField, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { usePostaddDataQuery } from "state/api";
import { useState } from "react";
import axios from "axios";

const CreateQA = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [pertanyaan, setPertanyaan] = useState("");
  const [response, setResponse] =useState("");


  const saveData = async(e) => {
    e.preventDefault();
    try {  await axios.post("http://localhost:5001/client/add", {
      pertanyaan,
      response,
    }) 
  } catch (error) {console.log(error)}
  }
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CREATE DATA QA" subtitle="Create Pertanyaan dan Response" />
      <Box
      mt="30px"
      height="75vh">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={saveData}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Pertanyaan"
                onChange={(e) => setPertanyaan(e.target.value)}
                value={pertanyaan}
                name="pertanyaan"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Response"
                onChange={(e) => setResponse(e.target.value)}
                value={response}
                name="response"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  pertanyaan: yup.string().required("required"),
  response: yup.string().required("required"),
  collection: yup.string().required("required")
});
const initialValues = {
  pertanyaan: "",
  response: "",
  collection:""
};

export default CreateQA;