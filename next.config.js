const path = require("path");
const withPWAInit = require("next-pwa");
let nextConfig={}, withPWA = ()=>{};

if(process.env.NODE_ENV === 'production'){
  nextConfig = {
      reactStrictMode: true,
      webpack: (config) => {
        const entry = generateAppDirEntry(config.entry);
        config.entry = () => entry;    
        return config;
      },
    };
    

  withPWA = withPWAInit({
    dest: "public",
    
    buildExcludes: ["app-build-manifest.json"],
  });

  const generateAppDirEntry = (entry) => {
    const packagePath = require.resolve('next-pwa');
    const packageDirectory = path.dirname(packagePath);
    const registerJs = path.join(packageDirectory, "register.js");

    return entry().then((entries) => {
      if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
        if (Array.isArray(entries["main-app"])) {
          entries["main-app"].unshift(registerJs);
        } else if (typeof entries["main-app"] === "string") {
          entries["main-app"] = [registerJs, entries["main-app"]];
        }
      }
      return entries;
    });
  };

}

module.exports = withPWA(nextConfig);
