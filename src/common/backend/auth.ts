import axios from 'axios'

type props = {
  email: string,
  password: string
}

export const login_handler = async (props: props) => {
  return await axios.post('https://localhost:8083/api/account/login', {
    email: props.email,
    password: props.password
  }, {
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  })
}