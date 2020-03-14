const addAccessToken = (isAuthenticated, user) => {
  if (isAuthenticated && user) {
    const body = {
      uid: user.sub
    };
    fetch("http://localhost:3001/setAccessToken", {
      method: "POST",
      headers: {
        Accept: "text/html",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
};

export default addAccessToken;
