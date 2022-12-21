import { Box, Button, TextField, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const CreateQA = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
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
          <form onSubmit={handleSubmit}>
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pertanyaan}
                name="pertanyaan"
                error={!!touched.pertanyaan && !!errors.pertanyaan}
                helperText={touched.pertanyaan && errors.pertanyaan}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Response"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.response}
                name="response"
                error={!!touched.response && !!errors.response}
                helperText={touched.response && errors.response}
                sx={{ gridColumn: "span 4" }}
              />
              <FormLabel>Penyimpanan data</FormLabel>
              <RadioGroup
                name="collection"
                value={values.collection}
                onChange={handleChange}
              >
                <FormControlLabel control={<Radio />} label="FAQ" value="faqs"/>
                <FormControlLabel control={<Radio />} label="Hoax" value="hoax_faqs"/>
              </RadioGroup>
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