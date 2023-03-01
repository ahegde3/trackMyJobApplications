import { BASE_URL } from "../constants/api";

const signInUser = (email, password) => {
  return fetch(`${BASE_URL}/users/signInUser`, {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
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


const signUpUser = (email,firstName,lastName, password) => {
    return fetch(`${BASE_URL}/users/signUpUser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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


  const signInWithGoogle = (email, password) => {
    return fetch(`${BASE_URL}/users/signInWithGoogle`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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

export { signUpUser,signInUser,signInWithGoogle };