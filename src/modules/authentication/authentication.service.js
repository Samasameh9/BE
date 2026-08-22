import db from "../../DB/connection.db.js";

export const signUp = async (inputs) => {
  const { name, email, password, DOB, gender } = inputs;
  const findQuery = `SELECT * FROM users WHERE u_email=?`;
  const [result] = await db.execute(findQuery, [email]);
  if (result?.length > 0) {
    throw new Error("Email exists", { cause: { status: 409 } });
  } else {
    const query = `INSERT INTO users( u_first_name,u_middle_name,u_last_name,u_email,u_password,u_DOB,u_gender)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;
    const [savedResult] = await db.execute(query, [
      ...name.split(" "),
      email,
      password,
      DOB,
      gender,
    ]);
    if (!savedResult?.affectedRows) {
      throw new Error("fail to create this account", {
        cause: { status: 400 },
      });
    }
    return savedResult;
  }
};

export const login = async (inputs) => {
  const { email, password } = inputs;
  const findQuery = `SELECT * FROM users WHERE u_email=? AND u_password=?`;
  const [result] = await db.execute(findQuery, [email, password]);
  if (!result?.length) {
    throw new Error("invalid login", { cause: { status: 404 } });
  }
  return result[0]
};
