import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-f4ersp6xmlisgq2s.us.auth0.com";
const clientId = "vxLEx7Bcariz0SRq5EpZ4XBApPucGcSF";
const audience = "https://dev-f4ersp6xmlisgq2s.us.auth0.com/api/v2/";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);