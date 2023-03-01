import { BASE_URL } from "../constants/api";

const SignInUser = (email, password) => {
  return fetch(`${BASE_URL}/users/signInUser`, {
    method: "POST",
    mode: "cors",
    headers: {
      accept: "*/*",
    },
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      password,
    }),
  }).then((result) => {
    if (result.ok) return result.json();
    else return undefined;
  });
};


const SignUpUser = (email, password) => {
    return fetch(`${BASE_URL}/users/signUpUser`, {
      method: "POST",
      mode: "cors",
      headers: {
        accept: "*/*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((result) => {
      if (result.ok) return result.json();
      else return undefined;
    });
  };

export { SignUpUser,SignInUser };