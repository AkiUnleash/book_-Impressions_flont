import axios from 'axios'

type props = {
  email: string,
  password: string
}

export const login_handler = async (props: props) => {
  return await axios.post(process.env.API_LOGIN, {
    email: props.email,
    password: props.password
  }, {
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  })
}