type props = {
  bookid: string,
  booktitle: string,
  imageurl: string,
  title: string,
  body: string
}

export const impressionRegister = async (props: props) => {
  return await fetch(process.env.NEXT_PUBLIC_API_IMPRESSION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      bookid: props.bookid,
      booktitle: props.booktitle,
      imageurl: props.imageurl,
      title: props.title,
      body: props.body
    })
  })
}

export const impressionsRead = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_IMPRESSIONS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}

export const impressionRead = async (id: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_IMPRESSION}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
}