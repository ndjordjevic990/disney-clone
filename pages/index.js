import Head from "next/head";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";

export default function Home() {
  const [session] = useSession();
  return (
    <div>
      <Head>
        <title>Disney+ Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {!session ? <c /> : <main>App</main>}
    </div>
  );
}

// remove the loading and fetch the user session on server side; to be used just inside of the main page (index.js)
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
