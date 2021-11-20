import "tailwindcss/tailwind.css";
import "../styles.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    // it gives for every page a session prop so we dont have to prop drill to every page
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
