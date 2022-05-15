import { useState } from "react"

export default function MintForm() {
  const [file, setFile] = useState(null);

  return (
    <form action="">
      <input type="file" />
    </form>
  )
}
