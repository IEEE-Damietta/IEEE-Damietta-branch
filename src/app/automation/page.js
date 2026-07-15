import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BookingPanel from "./components/BookingPanel";
import { createServer } from "../utils/supabase/server";
import { useAuth } from "../utils/hooks/useAuth";

const page = async () => {
  const { getUserData } = useAuth();
  const user = await getUserData();

  const supabase = await createServer();
  const { data } = await supabase.from("automation_dates").select("*").eq('available', true);
  const { data: reservedDate } = await supabase
    .from("automation_dates")
    .select("*")
    .eq("reserved_by", user.id);
  return (
    <>
      <Nav />
      <BookingPanel dates={data} user={user} reservedDate={reservedDate} />
      <Footer />
    </>
  );
};

export default page;
