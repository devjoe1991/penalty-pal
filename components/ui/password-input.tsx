'use client'

import { useState, useEffect, forwardRef } from "react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);

    // Caps lock detection
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        setCapsLockOn(event.getModifierState("CapsLock"));
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        setCapsLockOn(event.getModifierState("CapsLock"));
      };

      // Add event listeners
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);

      // Cleanup
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
        
        {/* Caps Lock Warning */}
        {capsLockOn && (
          <div className="absolute top-full left-0 mt-1 flex items-center text-amber-600 text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Caps Lock is on</span>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 