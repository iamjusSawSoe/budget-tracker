import { usersTable } from "../db/schema.ts";
import handleResponse from "../utils/handleResponse.ts";

export const getUsers = async (req: Request, res: Response) => {
  const users = await db.select().from(usersTable);

  handleResponse(res, 201, "User created successfully", users);
};

// app.get("/", async (_, res) => {
//   const users = await db.select().from(usersTable);
//   console.log("Getting all users from the database: ", users);

//   res.json({ users });
// });

// app.post("/", async (_, res) => {
//   const user: typeof usersTable.$inferInsert = {
//     name: "John",
//     age: 30,
//     email: "john@example.com",
//   };

//   await db.insert(usersTable).values(user);
//   console.log("New user created!");

//   res.json({ user });
// });

// app.delete("/:id", async (req, res) => {
//   const { id } = req.body;

//   await db.delete(usersTable).where(eq(usersTable.id, id));
//   console.log("User deleted!");

//   res.json({ message: "User deleted successfully" });
// });
