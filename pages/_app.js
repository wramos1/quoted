import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

const noAuthRequired = ['/', '/login', '/signup'];

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Navbar />
          <Component {...pageProps} />
        </ProtectedRoute>
      )
      }
    </AuthProvider>
  )
}
