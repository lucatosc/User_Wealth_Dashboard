/** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

export const getServerSideProps = async () => {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false, // Use 'true' for permanent redirects (301)
      },
    }
  };