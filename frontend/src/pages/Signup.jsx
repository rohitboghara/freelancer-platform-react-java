import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Group, Radio, Loader } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import AuthImagePattern from '../components/AuthImagePattern.jsx';
import axios from "axios";


const SignUpPage = () => {

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Add loading state
  const [isLoading, setIsLoading] = useState(false);
  // Update handleSubmit function
  const handalSubmit = async (e) => {
    e.preventDefault();
    const errors = validation(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const payload = {
          username: formValues.username,
          password: formValues.password,
          profile: {
            email: formValues.email,
          },
          role: formValues.role,
        };

        await axios.post(`${import.meta.env.VITE_API_URL}/register`, payload);
        setIsSubmit(true);
        setFormValues(initialValues);

        notifications.show({
          title: 'Success',
          message: 'Account created successfully! Please login.',
          color: 'green',
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } catch (error) {
        console.error("Signup error:", error);
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || 'Something went wrong. Please try again.',
          color: 'red',
          autoClose: 5000,
        });
      }
      finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // Form is valid, you can proceed with submission
      // console.log("Form data to send:", {
      //   username: formValues.username,
      //   email: formValues.email,
      //   password: formValues.password,
      //   role: formValues.role
      // });

    }
  }, [formErrors, isSubmit, formValues]);
  const validation = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 3) {
      errors.username = "Username must be at least 3 characters!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be at least 8 characters with letters and numbers!";
    }
    if (!values.role) {
      errors.role = "Please select a role!";
    }
    return errors;
  };
  const handalChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRoleChange = (value) => {
    setFormValues({ ...formValues, role: value });
    if (formErrors.role) {
      setFormErrors({ ...formErrors, role: "" });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handalSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative border rounded-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="username"
                  className={`input h-10 w-full pl-10`}
                  placeholder="Johndoe"
                  value={formValues.username}
                  onChange={handalChange}
                />
              </div>
            </div>
            {formErrors.username && (
              <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative border rounded-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  className={`input h-10 w-full pl-10`}
                  placeholder="you@example.com"
                  value={formValues.email}
                  onChange={handalChange}
                />
              </div>
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}


            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative border rounded-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`input h-10 w-full pl-10`}
                  placeholder="••••••••"
                  value={formValues.password}
                  onChange={handalChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}

            <Radio.Group
              name="role"
              label="Select Role"
              withAsterisk
              value={formValues.role}
              onChange={handleRoleChange}
            >
              <Group mt="xs">
                <Radio value="CLIENT" label="Client" />
                <Radio value="FREELANCER" label="Freelancer" />
              </Group>
            </Radio.Group>
            {formErrors.role && (
              <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>
            )}


            <Button
              color="#2e6f40"
              type="submit"
              variant="filled"
              disabled={isLoading}
              leftSection={isLoading ? <Loader size="sm" color="white" /> : null}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary text-[#2e6f40]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Join us today! Create an account and unlock a seamless, secure, and powerful experience tailored just for you."
      />

    </div>
  );
};

export default SignUpPage;