import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react'
import { loginRequest } from './auth-config'

const CallAPI = (instance, accounts, setApiData) => {
    // Silently acquires an access token which is then attached to a request for API call
    instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
    }).then((response) => {
        console.log(response.accessToken);

        fetch('https://getallcards.azurewebsites.net', { 
            method: 'post', 
            headers: new Headers({
                'Authorization': 'Bearer ' + response.accessToken,
                'Accept': 'application/json'
            })
        })
        
        .then(data => data.json())
        .then(json => {
            console.log(json);
            setApiData(json);
        });
    });
}

const AppContent = () => {
    
    const { instance, accounts } = useMsal();
    const [apiData, setApiData] = useState(null);

    return (
        <div>
            <p>App Content</p>
            {/* You can include components or other content here */}
        </div>
    );
}

const WrappedView = () => {

    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const [apiData, setApiData] = useState(null);

    const handleRedirect = () => {
        instance
        .loginRedirect({
          ...loginRequest,
          prompt: "create",
        })
        .catch((error) => console.log(error))
    }

    const handleCallAPI = () => {
        CallAPI(instance, instance.getActiveAccount(), setApiData);
    }

    return (
        <div className="App">
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <div>
                        
                        <p>Authenticated Successfully</p>
                        <button onClick={handleCallAPI}>Call API</button>
                    </div>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={handleRedirect}>Sign up</button>
            </UnauthenticatedTemplate>
        </div>
    );
}

const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <WrappedView />
        </MsalProvider>
    );
}

export default App;
