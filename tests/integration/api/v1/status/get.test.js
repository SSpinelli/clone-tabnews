test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const {
    dependencies: {
      database: { max_connections, open_connections, version },
    },
  } = responseBody;

  // Test Max Connection.
  expect(max_connections).toBeDefined();
  expect(typeof max_connections).toEqual("number");
  expect(max_connections).toEqual(100);

  // Test Current Connection.
  expect(open_connections).toBeDefined();
  expect(typeof open_connections).toEqual("number");
  expect(open_connections).toEqual(1);

  // Test Postgres version.
  expect(version).toBeDefined();
  expect(typeof version).toEqual("string");
  expect(version).toEqual("16.0");
});
