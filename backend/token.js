const jwt = await import("jsonwebtoken");

function TokenMaker(a) {
  const Payload = {
    username: a.username,
    role: a.role,
  };
  const token = jwt.default.sign(Payload, process.env.jwtSecret);
  return token;
}

function TokenExtractor(Token) {
  const user = jwt.default.verify(Token, process.env.jwtSecret);
  return user; //Thus user document will give me name for the admin
}

function TokenMakerforUser(a) {
  const Payload = {
    name: a.name,
    email: a.email,
    _id: a.id,
  };
  const token = jwt.default.sign(Payload, process.env.jwtSecret);
  return token;
}





export { TokenMaker, TokenExtractor, TokenMakerforUser};
