import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { AppProps } from 'next/app'; // Import AppProps from Next.js
import { UserProvider } from '@/context/userContext'; // Assuming this is the correct path to your UserProvider
import LeftNavbar from '@/components/LeftNavbar';

// Define the App component with TypeScript
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
