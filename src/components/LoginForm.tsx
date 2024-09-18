import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserContext } from "@/hooks/contextHooks";

interface LoginFormProps {
  onClose: () => void;
}

export function LoginForm({ onClose }: LoginFormProps) {
  const { handleLogin, authLoading, authError } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await handleLogin(email, password);
      onClose(); // Close the modal after successful login
    }
  };

  return (
    <form onSubmit={onLoginSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="email-login">Sähköposti</Label>
          <Input
            id="email-login"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password-login">Salasana</Label>
          <Input
            id="password-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={authLoading}>
        {authLoading ? "Loading..." : "Kirjaudu"}
      </Button>
      {authError && <p className="text-red-500 mt-2">{authError}</p>}
    </form>
  );
}
