import datasource from "./db";
import User, { hashPassword } from "./user/Users";

async function reset(): Promise<void> {
  await datasource.initialize();
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(User).save([
    {
      email: "user@app.com",
      hashedPassword: await hashPassword("test@123"),
    },
  ]);
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);