import { useState, useEffect } from "react";
import { useAddDataFAQMutation } from "state/api";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Box, Button, TextField} from "@mui/material";
import { Formik } from "formik";

const CreateQA = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [ addNewData, {
    isSuccess,
  }] = useAddDataFAQMutation()
  const navigate = useNavigate()
  const [pertanyaan, setPertanyaan] = useState('')
  const [response, setResponse] = useState('');

  useEffect(() => {
    if(isSuccess) {
      setPertanyaan('')
      setResponse('')
      navigate('/faq')
      window.location.reload()
    }
  }, [isSuccess, navigate])

  const onPertanyaanChanged = e => setPertanyaan(e.target.value)
  const onResponseChanged = e => setResponse(e.target.value)

  const onSavedFAQClicked = async(e) => {
    e.preventDefault()
    addNewData({ pertanyaan, response})
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CREATE DATA QA" subtitle="Create Pertanyaan dan Response" />
      <Box
      mt="30px"
      height="75vh">
        <Formik>
          <form className="form" onSubmit={onSavedFAQClicked}>
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
              name="pertanyaan"
              value={pertanyaan}
              onChange={onPertanyaanChanged}
              sx={{ gridColumn: "span 4" }}
              />
              <TextField
              fullWidth
              multiline
              variant="filled"
              type="text"
              label="Response"
              name="response"
              value={response}
              onChange={onResponseChanged}
              sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Data FAQ
              </Button>
            </Box>
          </form>
        </Formik>
      </Box>
    </Box>
  )
}

export default CreateQA