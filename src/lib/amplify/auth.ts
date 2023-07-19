import { Auth } from "aws-amplify";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export async function signUp({
  username,
  password,
  email,
  phoneNumber,
}: SignUpParameters) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phoneNumber, // optional - E.164 number convention
        // other custom attributes
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}
