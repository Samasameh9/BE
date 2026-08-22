import db from "../../DB/connection.db.js";

export const users = async (inputs) => {
  const query = `select u_id, concat(users.u_first_name," ",users.u_middle_name," ",users.u_last_name) as fullname,u_email,u_gender,TIMESTAMPDIFF(YEAR, u_DOB, CURDATE()) AS age from users where u_id=?`;
  const [result] = await db.execute(query,[inputs.params.userId]);
  if (!result?.length) {
    throw new Error("invalid profile id", {
      cause: { status: 404 },
    });
  }
  return result;
};


export const updateUser = async (inputs) => {
  const updatedQuery = `update users set u_gender=?,u_DOB=? where u_id=?`;
  const [result] = await db.execute(updatedQuery,[inputs.body.gender,inputs.body.DOB,inputs.params.userId]);
  if (!result?.affectedRows) {
    throw new Error("invalid user", {
      cause: { status: 404 },
    });
  }
  return result;
};



export const deleteUser = async (inputs) => {
  const deletedQuery = `delete from users  where u_id=?`;
  const [result] = await db.execute(deletedQuery,[inputs.params.userId]);
  if (!result?.affectedRows) {
    throw new Error("invalid user", {
      cause: { status: 404 },
    });
  }
  return result;
};
