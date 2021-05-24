import axios from 'axios'

type props = {
  email: string,
  password: string
  username?: string
}

export const login_handler = async (props: props) => {
  return await fetch(process.env.NEXT_PUBLIC_API_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: props.email,
      password: props.password
    })
  })
}

export const signupHandler = async (props: props) => {
  return await fetch(process.env.NEXT_PUBLIC_API_SIGNUP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: props.email,
      password: props.password
    })
  })
}

// Logout
export const logoutHandler = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_LOGOUT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}
