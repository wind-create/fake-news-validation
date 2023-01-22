import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Box, Button, TextField} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";

const EditQA = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate()
  const [pertanyaan, setPertanyaan] = useState('')
  const [response, setResponse] = useState('');
  const {id} = useParams();


  useEffect(()=> {
    getFaqById();
  },[])
  const getFaqById = async () => {
    const Faq = await axios.get(process.env.REACT_APP_BASE_URL + `/client/faq/${id}`)
    setPertanyaan(Faq.data.pertanyaan);
    setResponse(Faq.data.response)
  }

//   useEffect(() => {
//     if(isSuccess) {
//       setPertanyaan('')
//       setResponse('')
//       navigate('/faq')
//     }
//   }, [isSuccess, navigate])

  const onPertanyaanChanged = e => setPertanyaan(e.target.value)
  const onResponseChanged = e => setResponse(e.target.value)

  const onSavedFAQClicked = async(e) => {
    e.preventDefault()
    try {
        await axios.patch(process.env.REACT_APP_BASE_URL + `/client/faq/${id}/updatedatafaq`, {
          pertanyaan,
          response
        });
        navigate("/faq");
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Edit DATA QA" subtitle="Edit Pertanyaan dan Response" />
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
                update Data FAQ
              </Button>
            </Box>
          </form>
        </Formik>
      </Box>
    </Box>
  )
}

export default EditQA