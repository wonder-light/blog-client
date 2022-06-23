const svg = import.meta.glob('@/assets/img/**.svg');
for (let key in svg) {
    let v = svg[key];
    key = key.split('/').pop();
    svg[key] = v;
}


let env = {
    serverUrl: import.meta.env.VITE_Server_Url,
    isDev: import.meta.env.VITE_Is_Development === "true",
    svg,
};

export default env;