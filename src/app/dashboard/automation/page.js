import { useAuth } from "@/app/utils/hooks/useAuth";
import { createServer } from "@/app/utils/supabase/server";
import AutomationWorkshopForm from "./components/AutomationWorkshopForm";

const page = async () => {
  const { getUserData } = useAuth();

  const user = await getUserData();

  const supabase = await createServer();

  const {data} = await supabase.from("automation_dates").select("*");
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Automation workshop dates
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create workshop dates and hours that will appear in the public
            booking panel.
          </p>
        </div>
      </div>

      <AutomationWorkshopForm user={user} dates={data} />
    </div>
  );
};

export default page;
