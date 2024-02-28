import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "8f108d9d-29e7-4e68-908e-dd9d0eccea96",
        authority: "https://login.microsoftonline.com/e2c258ac-b73e-46cd-ab4b-e6718566501c",
        knownAuthorities: [],
        cloudDiscoveryMetadata: "",
        redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false,
        clientCapabilities: ["CP1"],
    },
    cache: {
        cacheLocation: "sessionStorage",
        temporaryCacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        secureCookies: false,
        claimsBasedCachingEnabled: true,
    },
    system: {
        loggerOptions: {
            loggerCallback: ( level, message, containsPii ) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: false,
        },
        windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
        asyncPopups: false,
    },
    telemetry: {
        application: {
            appName: "My Application",
            appVersion: "1.0.0",
        },
    },
};

//const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
    scopes: ["api://53452971-9b79-4046-87a6-1c499331a5fb/invoke"]
}