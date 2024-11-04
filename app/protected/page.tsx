import { MainPage } from "@/components/mainPage";
import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <MainPage />
  );
}
