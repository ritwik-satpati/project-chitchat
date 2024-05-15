const cookieOptions = {
  httpOnly: true,
  secure: process.env.HTTPS === "TRUE" ? true : false,
};

export default cookieOptions;
