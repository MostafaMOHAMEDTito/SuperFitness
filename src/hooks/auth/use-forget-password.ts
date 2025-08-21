import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  forgetPassword,
  verifyResetCode,
  resetPassword,
} from "@/lib/apis/auth.api";

// Forget Password Mutation
export function useForgetPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: ForgetPasswordData) => {
      const response = await forgetPassword(data);

      if (!response?.message) {
        throw new Error("Failed to send reset email");
      }

      return response;
    },
    onSuccess: () => {
      toast.success("Reset email sent successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { isPending, error, forgetPassword: mutate };
}

// Verify Reset Code Mutation
export function useVerifyResetCode() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: VerifyResetData) => {
      const response = await verifyResetCode(data);

      if (!response?.status) {
        throw new Error(response?.message || "Invalid reset code");
      }

      return response;
    },
    onSuccess: () => {
      toast.success("Reset code verified");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { isPending, error, verifyResetCode: mutate };
}

// Reset Password Mutation
export function useResetPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await resetPassword(data);

      if (!response?.message) {
        throw new Error("Reset failed");
      }

      return response;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { isPending, error, resetPassword: mutate };
}
