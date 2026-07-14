import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { adminLogin, resetPassword } from "../lib/firebase";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginForm) => {
    try {
      setLoading(true);

      await adminLogin(data.email, data.password);

      toast.success("Login Successful");

      window.location.hash = "#admin";
    } catch (error) {
      console.error(error);

      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {

    const email = getValues("email");

    if (!email) {

      toast.error("Please enter your email first.");

      return;

    }

    try {

      await resetPassword(email);

      toast.success(
        "Password reset email sent successfully."
      );

    } catch {

      toast.error(
        "Unable to send reset email."
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 px-4">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome
        </h1>

        <p className="text-white/70 mb-8">
          Sign in to your admin account
        </p>

        <form onSubmit={handleSubmit(handleLogin)}>

          {/* Email */}

          <div className="mb-5">

            <label className="block text-sm text-white mb-2">
              Email Address
            </label>

            <div className="relative">

              <Mail
                className="absolute left-3 top-3 text-white/60"
                size={20}
              />

              <input
                type="email"
                autoFocus
                placeholder="admin@example.com"
                {...register("email")}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
              />

            </div>

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="block text-sm text-white mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                className="absolute left-3 top-3 text-white/60"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password")}
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-3 text-white/70"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Remember Me */}

          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2 text-white text-sm">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              Remember Me

            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-cyan-300 hover:text-cyan-200 text-sm transition"
            >
              Forgot Password?
            </button>

          </div>

          {/* Sign In */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="mt-8 text-center text-white/60 text-sm">
          Salam Baku Restaurant
        </div>

      </motion.div>

    </div>
  );
}