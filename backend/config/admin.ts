module.exports = (middleware) => {
  return (req, res, next) => {
    if (req.user.admin === "true") {
      middleware(req, res, next);
    } else {
      res.status(401).send("The user is not a Admin");
    }
  };
};
