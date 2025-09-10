export const authMiddleware = (req, resp, next) => {
  console.log("this is my custom middleware..");
  console.log(req.headers);
  const { authorization } = req.headers;
  console.log(authorization);

  //logic
  if (authorization == "123456") {
    next();
  } else {
    resp
      .status(403)
      .send("You are not granted permission to access this resource..");
  }
};
