import Footer from '@/components/Footer'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Jost } from 'next/font/google'
import UserProvider from '@/context/UserContext'
import CartProvider from '@/context/CartContext'

//@ts-ignore
const inter = Jost({ subsets: ['latin'], weight: '400' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
          <Footer></Footer>
        </CartProvider>
      </UserProvider>
    </>
  )
}
