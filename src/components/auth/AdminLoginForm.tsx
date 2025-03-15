
import React from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLoginForm } from "@/hooks/useLoginForm";

const AdminLoginForm = () => {
  const { form, isLoading, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Admin Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    placeholder="admin@cakedelight.com"
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
              <FormLabel className="text-cake-text">Admin Password</FormLabel>
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
          {isLoading ? "Signing in..." : "Admin Sign in"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
