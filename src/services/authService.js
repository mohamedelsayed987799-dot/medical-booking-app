import api from "./api";

// NOTE: This is a MOCK authentication flow for demo/learning purposes only.
// json-server has no real login endpoint, so we fetch the matching user
// by email and check the password on the client. Never do this in a
// real production app - use a real backend with hashed passwords.
export const login = async (email, password) => {
  const { data } = await api.get("/users", {
    params: { email },
  });

  const user = data[0];

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  // Never keep the password around in app state
  const { password: _pw, ...safeUser } = user;
  return safeUser;
};
