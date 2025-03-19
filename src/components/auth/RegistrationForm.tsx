
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RegistrationForm = ({role}) => {
  const { form, isLoading, onSubmit } = useRegisterForm(role);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Full Name</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    placeholder="John Doe"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Phone Number</FormLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    placeholder="(123) 456-7890"
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
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Confirm Password</FormLabel>
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
        
        <Button
          type="submit"
          className="w-full bg-cake-primary hover:bg-cake-dark text-white"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-cake-text/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cake-primary hover:text-cake-dark transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
