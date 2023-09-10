/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "npx serve@latest out",
  env: {
    NEXTAUTH_URL: "https://nurse-planner.firebaseapp.com",
    NEXTAUTH_SECRET: "omgsosecretmuchspyomg",
    REACT_APP_API_KEY: "AIzaSyArRmGwaWI0WsmJZojW0xToIw59N3BIqVM",
    REACT_APP_AUTH_DOMAIN: "nurse-planner.firebaseapp.com",
    REACT_APP_PROJECT_ID: "nurse-planner",
    REACT_APP_STORAGE_BUCKET: "nurse-planner.appspot.com",
    REACT_APP_MESSAGING_SENDER_ID: "22741616935",
    REACT_APP_APP_ID: "1:22741616935:web:d2ea7303362d72d4494102",
    REACT_APP_MEASUREMENT_ID: "G-03JD4K47ZD",
    RESEND_API: "re_FXdsnFTo_Hb5NZzbi67uDuT8nrFkkpGYY",
  },
};

module.exports = nextConfig;
