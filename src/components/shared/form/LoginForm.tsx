import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type LoginSchemaValue } from "@/schema/loginSchema";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface LoginFormProps {
  form: UseFormReturn<LoginSchemaValue>;
  submitText: string;
  onSubmitForm: (data: LoginSchemaValue) => void;
}

export const LoginForm = ({ form, submitText, onSubmitForm }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type={showPassword ? "text" : "password"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="mb-3 flex">
          <FormControl>
            <Checkbox
              checked={showPassword}
              onCheckedChange={() => setShowPassword(!showPassword)}
            />
          </FormControl>
          <FormLabel>Lihat Password</FormLabel>
        </FormItem>
        <Button type="submit" className="bg-blue-800 my-5">
          {submitText}
        </Button>
      </form>
    </Form>
  );
};
