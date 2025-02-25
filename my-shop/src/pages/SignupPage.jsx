import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import api from "../api/axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignupPage() {
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "3", // Default to Customer role
    },
  });

  const selectedRole = watch("role_id");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    // Exclude passwordConfirmation from the data
    const { passwordConfirmation, ...submitData } = data;

    try {
      await api.post("/signup", submitData);
      history.goBack();
      alert(
        "You need to click the link in your email to activate your account!"
      );
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-75vw md:max-w-sm mx-auto mt-8 text-left">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]).*$/,
                message:
                  "Password must include numbers, lowercase, uppercase, and special characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            {...register("passwordConfirmation", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="role_id">Role</Label>
          <Controller
            name="role_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {selectedRole === "2" && ( // '2' is the ID for the Store role
          <>
            <div>
              <Label htmlFor="store.name">Store Name</Label>
              <Input
                id="store.name"
                {...register("store.name", {
                  required: "Store name is required",
                  minLength: {
                    value: 3,
                    message: "Store name must be at least 3 characters",
                  },
                })}
              />
              {errors.store?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.store.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="store.phone">Store Phone</Label>
              <Input
                id="store.phone"
                {...register("store.phone", {
                  required: "Store phone is required",
                  pattern: {
                    value: /^(\+90|0)?[0-9]{10}$/,
                    message: "Invalid Turkish phone number",
                  },
                })}
              />
              {errors.store?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.store.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="store.tax_no">Store Tax ID</Label>
              <Input
                id="store.tax_no"
                {...register("store.tax_no", {
                  required: "Store Tax ID is required",
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: "Invalid Tax ID format (TXXXXVXXXXXX)",
                  },
                })}
              />
              {errors.store?.tax_no && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.store.tax_no.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="store.bank_account">
                Store Bank Account (IBAN)
              </Label>
              <Input
                id="store.bank_account"
                {...register("store.bank_account", {
                  required: "Store Bank Account is required",
                  pattern: {
                    value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                    message: "Invalid IBAN format",
                  },
                })}
              />
              {errors.store?.bank_account && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.store.bank_account.message}
                </p>
              )}
            </div>
          </>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="underline text-primary-color">
          Login
        </Link>
      </p>
    </div>
  );
}