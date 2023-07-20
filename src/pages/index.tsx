import { Amplify, Auth } from "aws-amplify";

import awsConfig from "../aws-exports";
import { FormEventHandler, useCallback, useState } from "react";

Amplify.configure(awsConfig);

export default function App() {
  const [user, setUser] =
    useState<Awaited<ReturnType<(typeof Auth)["signUp"]>>["user"]>();

  const handleSignOut = useCallback(() => {
    Auth.signOut({ global: true });
    setUser(undefined);
  }, []);

  const handleSignUp = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const password = (form.elements.namedItem("password") as HTMLInputElement)
        .value;

      console.log({ email, password });

      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: { email },
        autoSignIn: { enabled: true },
      });

      setUser(user);
    },
    []
  );

  const handleSignIn = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const password = (form.elements.namedItem("password") as HTMLInputElement)
        .value;

      console.log({ email, password });

      const { user } = await Auth.signIn(email, password);

      setUser(user);
    },
    []
  );

  if (user) {
    return (
      <button type="button" onClick={handleSignOut}>
        Sign out ({user.challengeName})
      </button>
    );
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}
