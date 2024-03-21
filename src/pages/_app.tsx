import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { BalanceProvider } from '@/contexts/BalanceContext';
import { TransactionProvider } from '@/contexts/TransactionContext';
import { GlobalStyle } from '@/styles/globals';
import Modal from 'react-modal';
import { UserProvider } from '@/contexts/UserContext';

Modal.setAppElement('#__next');

function MyApp({ Component,pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserProvider>
        <BalanceProvider>
          <TransactionProvider>
            <Component {...pageProps} />
          </TransactionProvider>
        </BalanceProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
