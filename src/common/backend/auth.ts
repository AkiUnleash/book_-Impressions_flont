import axios from 'axios'

type props = {
  email: string,
  password: string
  username?: string
}

export const login_handler = async (props: props) => {
  return await axios.post(process.env.NEXT_PUBLIC_API_LOGIN, {
    email: props.email,
    password: props.password
  }, {
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  })
}

export const signupHandler = async (props: props) => {
  return await axios.post(process.env.NEXT_PUBLIC_API_SIGNUP, {
    name: props.username,
    email: props.email,
    password: props.password
  }, {
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  })
}

// Logout
export const logoutHandler = async () => {
  return await axios.post('http://localhost:8082/account/logout', {}, {
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  })
}
