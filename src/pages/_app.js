import '@/styles/globals.css'
import Navbar from '../../components/Navbar'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../../components/context'
import useUserData from '../../components/hook'

function MadeBy(){
  console.log("\nThis beautiful and powerfull website made by : EL MEDIRI Azdin\n");
}

if (typeof window !== 'undefined') {
  window.MadeBy = MadeBy;
}

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
