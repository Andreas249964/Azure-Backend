import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react'
import { loginRequest } from './auth-config'

const WrappedView = () => {

  const { instance } = useMsal();
  const activeAccount =instance.getActiveAccount();

  const handleRedirect = () => {
      instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <p>
            Authenticated Successfully
          </p>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect}>
          Sign up
        </button>
      </UnauthenticatedTemplate>
    </div>
  )
}

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
        <WrappedView />
    </MsalProvider>
  )
}

export default App
