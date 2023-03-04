import { BASE_URL } from "../constants/api";

const insertToGSheet = (uid,jobProfile) => {
    return fetch(`${BASE_URL}/jobs/insertToSheet`, {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      body: JSON.stringify({
        uid,jobProfile
      }),
    }).then((result) => {
      if (result.ok) return result.json();
      else return undefined;
    });
  };


  export { insertToGSheet};