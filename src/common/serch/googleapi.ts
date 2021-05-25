type props = {
  keyword: string,
}

export const searchHandler = async (props: props) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_GOOGLE_BOOK}/${props.keyword}&maxResults=40`, {
    method: 'GET',
  },
  )
}