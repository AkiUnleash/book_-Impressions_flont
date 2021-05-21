
export const errorResponse = async (props: any) => {
  switch (props.response.status) {
    case 400:
      return "パスワードが一致しません。";
    case 404:
      return "指定されたE-mailアドレスは登録されていません。"
  }
}