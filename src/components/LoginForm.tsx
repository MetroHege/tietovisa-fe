import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserContext } from "@/hooks/contextHooks";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import eye icons

interface LoginFormProps {
  onClose: () => void;
}

export function LoginForm({ onClose }: LoginFormProps) {
  const { handleLogin, authLoading, authError } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

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
        <div className="grid gap-2 relative">
          <Label htmlFor="password-login">Salasana</Label>
          <div className="relative">
            <Input
              id="password-login"
              type={showPassword ? "text" : "password"} // Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10" // Add padding to the right to make space for the icon
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={authLoading}>
        {authLoading ? "Ladataan..." : "Kirjaudu"}
      </Button>
      {authError && <p className="text-red-500 mt-2">{authError}</p>}
    </form>
  );
}
