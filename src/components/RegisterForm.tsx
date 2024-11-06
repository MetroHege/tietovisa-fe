import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserContext } from "@/hooks/contextHooks";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import eye icons

interface RegisterFormProps {
  onClose: () => void;
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const { handleRegister, authLoading, authError } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [validationError, setValidationError] = useState("");

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
      return "Salasanan on oltava vähintään 8 merkkiä pitkä.";
    }
    if (!hasUpperCase) {
      return "Salasanassa on oltava vähintään yksi iso kirjain.";
    }
    if (!hasNumber) {
      return "Salasanassa on oltava vähintään yksi numero.";
    }
    return "";
  };

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setValidationError(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Salasanat eivät täsmää.");
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
        <div className="grid gap-2 relative">
          <Label htmlFor="password-register">Salasana</Label>
          <div className="relative">
            <Input
              id="password-register"
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
        <div className="grid gap-2 relative">
          <Label htmlFor="confirm-password">Vahvista salasana</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"} // Toggle input type
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pr-10" // Add padding to the right to make space for the icon
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      {validationError && (
        <p className="text-red-500 mb-4">{validationError}</p>
      )}
      <Button type="submit" className="w-full" disabled={authLoading}>
        {authLoading ? "Ladataan..." : "Rekisteröidy"}
      </Button>
      {authError && <p className="text-red-500 mt-2">{authError}</p>}
    </form>
  );
}
