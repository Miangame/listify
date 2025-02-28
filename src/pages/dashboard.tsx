import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const DashboardPage = () => {
  // const [prompt, setPrompt] = useState('')
  // const [response, setResponse] = useState<
  //   SpotifyGeneratePlaylistResponse | undefined
  // >()
  // const [loading, setLoading] = useState(false)

  // const generatePlaylist = async () => {
  //   if (!prompt) return

  //   setLoading(true)
  //   setResponse(undefined)

  //   try {
  //     const res = await fetch('/api/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ prompt })
  //     })

  //     if (!res.ok) {
  //       throw new Error('Error fetching data')
  //     }

  //     const data = await res.json()

  //     setResponse(data)
  //   } catch (error) {
  //     console.error(error)
  //   }

  //   setLoading(false)
  // }

  return <h1>DASHBOARD</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default DashboardPage
