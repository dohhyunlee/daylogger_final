const server = require('./server');



test("server port is 6000", () => {
    expect(server.port).toBe(process.env.PORT || 6000);
})