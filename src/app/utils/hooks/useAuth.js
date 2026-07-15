import { createServer } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export function useAuth() {
  const getUserData = async () => {
    const supabase = await createServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  };

  const checkAuth = async () => {
    const user = await getUserData();

    if (!user) redirect("/");

    return user;
  };

  return { getUserData ,checkAuth };
}
