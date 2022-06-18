let env = {
    serverUrl: import.meta.env.VITE_Server_Url,
    isDev: Boolean(import.meta.env.VITE_Is_Development),
};

export default env;