let env = {
    id: 12234526152101,
    serverUrl: import.meta.env.VITE_Server_Url,
    isDev: import.meta.env.VITE_Is_Development === "true",
};

export default env;