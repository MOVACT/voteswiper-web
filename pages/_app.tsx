import { AppComponent } from 'next/dist/next-server/lib/router/router';
import Layout from '../components/layout';
import '../styles/app.scss';

const App: AppComponent = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
