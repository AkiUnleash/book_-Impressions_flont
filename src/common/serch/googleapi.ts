type props = {
  keyword: string,
  maxResults?: number
}

export const searchHandler = async (props: props) => {
  const url = props.maxResults === 0 ?
    `${process.env.NEXT_PUBLIC_API_GOOGLE_BOOK}/${props.keyword}` :
    `${process.env.NEXT_PUBLIC_API_GOOGLE_BOOK}?q=${props.keyword}&maxResults=${props.maxResults}`

  return await fetch(url, { method: 'GET', },)

}