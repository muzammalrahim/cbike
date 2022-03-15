import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderContextProvider from '../context/headerContext';



function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeaderContextProvider>
      <ToastContainer/> 
        <Component {...pageProps} />
        </HeaderContextProvider>
    </>
  )
}

export default MyApp
