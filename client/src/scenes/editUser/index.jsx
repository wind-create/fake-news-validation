import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Box, Button, TextField} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";

const EditUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const {id} = useParams();


  useEffect(()=> {
    getFaqById();
  },[])
  const getFaqById = async () => {
    const user = await axios.get(process.env.REACT_APP_BASE_URL + `/users/${id}`)
    setFirstName(user.data.firstName);
    setLastName(user.data.lastName);
    setEmail(user.data.email)
  }

//   useEffect(() => {
//     if(isSuccess) {
//       setPertanyaan('')
//       setResponse('')
//       navigate('/faq')
//     }
//   }, [isSuccess, navigate])

  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)

  const onSavedFAQClicked = async(e) => {
    e.preventDefault()
    try {
        await axios.patch(process.env.REACT_APP_BASE_URL + `/users/${id}/updatedatauser`, {
          pertanyaan,
          response
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
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
              label="FirstName"
              name="firstName"
              value={firstName}
              onChange={onFirstNameChanged}
              sx={{ gridColumn: "span 4" }}
              />
              <TextField
              fullWidth
              variant="filled"
              type="text"
              label="lastName"
              name="lastName"
              value={lastName}
              onChange={onLastNameChanged}
              sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onChange={onEmailChanged}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                update Data User
              </Button>
            </Box>
          </form>
        </Formik>
      </Box>
    </Box>
  )
}

export default EditUser