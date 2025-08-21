import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/apis/auth.api";
import { toast } from "sonner";

export default function useLogin() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await login({ email, password });

      if (!response?.token) {
        throw new Error(response?.message || "Something went wrong");
      }

      // Save token to localStorage
      localStorage.setItem("token", response.token);

      return response;
    },
    onSuccess: () => {
      toast.success("Login successfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { isPending, error, login: mutate };
}
