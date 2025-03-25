export const parseJwt = (token: string) => {
  try {
    // atob: decodes base64 strings
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const getIsTokenValid = (token: string | undefined) => {
  if (!token) {
    return false;
  }

  //In JavaScript, a time stamp is the number of milliseconds that have passed since January 1, 1970.

  const jwtExpireTimestamp = parseJwt(token).exp;
  //In this case, since the exp value is in seconds format, we need to convert it to milliseconds format in the next step.

  const jwtExpireDateTime = new Date(jwtExpireTimestamp * 1000);
  //Now we have expiration date of the token

  if (jwtExpireDateTime < new Date()) {
    return false;
  }

  return true;
};
