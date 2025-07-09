import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-f4ersp6xmlisgq2s.us.auth0.com"
      clientId="vxLEx7Bcariz0SRq5EpZ4XBApPucGcSF"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-f4ersp6xmlisgq2s.us.auth0.com/api/v2/",
        scope: "openid profile email"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
