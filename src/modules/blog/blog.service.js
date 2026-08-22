import db from "../../DB/connection.db.js";

export const createBlog = async (inputs) => {
  const { blog_title, blog_content, author_id } = inputs;
  const checkExist = `select u_id from users where u_id=?`;
  const [result] = await db.execute(checkExist, [author_id]);
  if (!result?.length) {
    throw new Error("author id not found", {
      cause: { status: 404 },
    });
  }
  const query = `INSERT INTO blogs (b_title,b_content,b_author_id) VALUES (?, ?, ?)`;
  const [finalResult] = await db.execute(query, [
    blog_title,
    blog_content,
    author_id,
  ]);
  if (!finalResult?.affectedRows) {
    throw new Error("fail to create this blog", {
      cause: { status: 400 },
    });
  }
  return finalResult;
};

export const allBlogs = async (inputs) => {
  const query = `select blogs.*,concat(users.u_first_name," ",users.u_middle_name," ",users.u_last_name) as fullname from blogs inner join users on blogs.b_author_id=users.u_id ORDER BY blogs.b_createdAt DESC`;
  const [result] = await db.execute(query);
  if (!result?.length) {
    throw new Error("No blogs found", {
      cause: { status: 404 },
    });
  }
  return result;
};

export const userBlog = async (inputs) => {
  const query = `select blogs.*,concat(users.u_first_name," ",users.u_middle_name," ",users.u_last_name) as fullname from blogs inner join users on blogs.b_author_id=users.u_id where blogs.b_author_id=? `;
  const [result] = await db.execute(query, [inputs.params.id]);
  if (!result?.length) {
    throw new Error("No blogs found", {
      cause: { status: 404 },
    });
  }
  return result;
};

export const deleteuserBlog = async (inputs) => {
  const query = `delete from blogs where b_id=? `;
  const [result] = await db.execute(query, [inputs]);
  if (!result?.affectedRows) {
    throw new Error("failed to delete blog", {
      cause: { status: 404 },
    });
  }
  return result;
};

export const updateuserBlog = async (inputs) => {
  const { title, content } = inputs.body;
  const query = `update blogs set b_title=?,b_content=? where b_id=?`;
  const [result] = await db.execute(query, [title, content, inputs.params.id]);
  if (!result?.affectedRows) {
    throw new Error("failed to update blog", {
      cause: { status: 404 },
    });
  }
  return result;
};
