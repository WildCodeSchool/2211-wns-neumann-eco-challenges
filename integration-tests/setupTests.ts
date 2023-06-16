import datasource from "../server/src/db";

// const clearDB = async () => {
//   return await Promise.all(
//     datasource.entityMetadatas.map((entity) =>
//       datasource.getRepository(entity.name).delete({})
//     )
//   );
// };

beforeAll(async () => {
  await datasource.initialize();
});

beforeEach(async () => {
  // await clearDB();
});

afterAll(async () => {
  await datasource.destroy();
});
