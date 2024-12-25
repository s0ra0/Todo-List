import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { emailLogin, signup } from "./actions";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { OAuthButtons } from "./oauth-signin";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/todos");
  }

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">логин</CardTitle>
          <CardDescription>
            введи свою почту чтобы подтвердить вход
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">почта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">пароль</Label>
              </div>
              <Input
                minLength={6}
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            {searchParams.message && (
              <div className="text-sm font-medium text-destructive">
                {searchParams.message}
              </div>
            )}
            <Button formAction={emailLogin} className="w-full">
              войти
            </Button>
          </form>
          <OAuthButtons />
          <div className="text-center text-sm">
            нет аккаунта?{" "}
            <button formAction={signup} form="login-form" className="underline">
              ну зарегайся хз
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
