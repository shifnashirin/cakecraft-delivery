
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLoginForm, LoginFormData } from "@/hooks/useLoginForm";

const CustomerLoginForm = () => {
  const { form, isLoading, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    className="pl-10 border-cake-border focus-visible:ring-cake-primary"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Password</FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 border-cake-border focus-visible:ring-cake-primary"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="#"
              className="text-cake-primary hover:text-cake-dark transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-cake-primary hover:bg-cake-dark text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-cake-text/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cake-primary hover:text-cake-dark transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default CustomerLoginForm;
