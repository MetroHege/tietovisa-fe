import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserContext } from "@/hooks/contextHooks";

interface RegisterFormProps {
  onClose: () => void;
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const { handleRegister, authLoading, authError } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (email && password) {
      await handleRegister({
        username: email.split("@")[0], // Extracting username from email for simplicity
        email: email,
        password: password,
      });
      onClose(); // Close the modal after successful registration
    }
  };

  return (
    <form onSubmit={onRegisterSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="email-register">Sähköposti</Label>
          <Input
            id="email-register"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password-register">Salasana</Label>
          <Input
            id="password-register"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Vahvista salasana</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={authLoading}>
        {authLoading ? "Loading..." : "Rekisteröidy"}
      </Button>
      {authError && <p className="text-red-500 mt-2">{authError}</p>}
    </form>
  );
}
