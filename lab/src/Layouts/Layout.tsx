import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import { useLoading } from 'src/context/loading';
import Loading from 'src/components/Loading';
import { useEffect } from 'react';
import { useProductCart } from 'src/hooks/useProductCarts';




export default function Layout() {

  const { loading } = useLoading()
  const { getCartUser } = useProductCart();

  useEffect(() => {
    getCartUser();
  }, []);
  return (
    <><Loading isShow={loading} />
      <ToastContainer
      />
      <Header />
      <Outlet />

      <Footer />
    </>
  );
}