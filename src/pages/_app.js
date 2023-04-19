import '@/styles/globals.css'
import Navbar from '../../components/Navbar'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../../components/context'
import useUserData from '../../components/hook'



export default function App({ Component, pageProps }) {

  const userData = useUserData()

  return (
    <UserContext.Provider value={userData} >
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )

}
