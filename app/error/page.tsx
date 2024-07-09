export default function ErrorPage({
  searchParams: { message }
}: {
  searchParams: { message: string }
}) {
  return (
    <>
      <h1>에러 메시지:</h1>
      <h2>{message}</h2>
    </>
  )
}
