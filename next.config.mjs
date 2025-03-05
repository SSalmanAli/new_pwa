import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true, // Ensures service worker is registered
  skipWaiting: true, // Activates SW immediately
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
