import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from '@nextui-org/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginUser } from '../store/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth';
import { toast } from 'react-toastify';

type Props = {};

const LoginSchema = z.object({
  email: z.string().email('Invalid email.').trim().toLowerCase(),
  password: z.string().min(6, 'Password should be atleast 6 characters.'),
});

const Login = (props: Props) => {
  const [selected, setSelected] = React.useState<React.Key>('login');

  const dispatch = useDispatch();

  const loginFormState = useForm<{ email: string; password: string }>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const login = async (data: { email: string; password: string }) => {
    //
    const [loginData, err] = await loginApi(data.email, data.password);

    if (err) {
      toast.error(err);
      return;
    }

    dispatch(
      loginUser({
        profilePic: '',
        fullName: loginData?.fullName,
        email: loginData?.email,
        accessToken: loginData?.token,
        userId: loginData?.id,
        isLoggedIn: true,
      })
    );

    navigate('/', {
      replace: true,
    });
  };

  return (
    <div className="grid grid-cols-2 w-screen h-screen">
      <div className="col-span-1">
        <img src="/food.jpg" className="bg-fixed h-full" />
      </div>
      <div className="col-span-1 flex flex-col gap-4 items-center justify-center">
        <h2 className="text-5xl p-4 text-transparent font-bold bg-gradient-to-tr from-blue-600 via-fuchsia-500 to-purple-500 bg-clip-text">
          Food Delivery
        </h2>
        <Card className="w-full max-w-sm">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected as string}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login">
                <form
                  className="flex flex-col gap-4 mt-4 h-[300px]"
                  onSubmit={loginFormState.handleSubmit(login)}
                >
                  <Controller
                    name="email"
                    control={loginFormState.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          value={field.value}
                          isRequired
                          label="Email"
                          labelPlacement="outside"
                          placeholder="Enter your email"
                          type="email"
                          isInvalid={!!fieldState.error?.message}
                          errorMessage={fieldState.error?.message}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="password"
                    control={loginFormState.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        isRequired
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        type="password"
                        isInvalid={!!fieldState.error?.message}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <p className="text-center text-small">
                    Need to create an account?{' '}
                    <Link size="sm" onPress={() => setSelected('sign-up')}>
                      Sign up
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <form className="flex flex-col gap-4 h-[300px] mt-2">
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    labelPlacement="outside"
                    type="password"
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    labelPlacement="outside"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    labelPlacement="outside"
                  />
                  <p className="text-center text-small">
                    Already have an account?{' '}
                    <Link size="sm" onPress={() => setSelected('login')}>
                      Login
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary">
                      Sign up
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Login };
