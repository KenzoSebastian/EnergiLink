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
import { type RegisterSchemaValue } from "@/schema/registerSchema";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface RegisterFormProps {
  form: UseFormReturn<RegisterSchemaValue>;
  submitText: string;
  onSubmitForm: (data: RegisterSchemaValue) => void;
}

export const RegisterForm = ({ form, submitText, onSubmitForm }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nomorKwh"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Nomor KWH</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
