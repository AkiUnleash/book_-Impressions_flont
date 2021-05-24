
export const errorResponse = async (props: any) => {
  switch (props.status) {
    case 400:
      return "パスワードが一致しません。";
    case 404:
      return "指定されたE-mailアドレスは登録されていません。"
    case 409:
      return "登録済みのアカウントです。"
  }
}