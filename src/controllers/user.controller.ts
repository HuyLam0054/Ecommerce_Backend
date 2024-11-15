import { Request, Response } from "express";
import { getUsers, createUser } from "../models/user.model";

// Lấy danh sách người dùng
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy người dùng" });
  }
};

// Tạo người dùng mới
export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    await createUser(name, email);
    res.status(201).json({ message: "Người dùng đã được tạo" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm người dùng" });
  }
};
