import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BookingPanel from "./components/BookingPanel";
import { createServer } from "../utils/supabase/server";
import { useAuth } from "../utils/hooks/useAuth";

const page = async () => {
  const { getUserData } = useAuth();
  const user = await getUserData();

  const supabase = await createServer();
  const { data, error } = await supabase.from("automation_dates").select(
    `
    *,
    automation_dates_reservations(user_id)
  `,
  );

  return (
    <>
      <Nav />
      <BookingPanel dates={data} user={user} />
      <Footer />
    </>
  );
};

export default page;
