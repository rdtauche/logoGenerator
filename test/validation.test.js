const LogoDetails = require("../lib/shapes.js");

describe("Shapes Class", () => {
  // TODO: Write a test that checks if isPassword() returns false when the password is less than 8 characters.

  describe("New instance of shape", () => {
    // TODO: Write a test that checks if isPassword() returns false when the password is less than 8 characters.
    it("should generate a new instance of shape", () => {
      const logo = new LogoDetails('RDT', 'black', 'circle', 'blue');

      expect(logo.text).toEqual('RDT');
    });
  });
});


