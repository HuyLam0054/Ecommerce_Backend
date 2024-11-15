import db_connect from "../database/db_conn";

interface User {
  id: number;
  name: string;
  email: string;
}

// Hàm lấy tất cả người dùng
export const getUsers = async (): Promise<User[]> => {
  const [rows]: any = await db_connect.execute("SELECT * FROM users");
  return rows as User[];
};

// Hàm thêm người dùng mới
export const createUser = async (
  name: string,
  email: string
): Promise<void> => {
  await db_connect.execute("INSERT INTO users (name, email) VALUES (?, ?)", [
    name,
    email,
  ]);
};
