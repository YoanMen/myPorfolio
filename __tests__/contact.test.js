import { inputValidation } from '../assets/scripts/inputValidation.js';

describe('mail check', () => {

  it("check mail input with no value", () => {
    const value = "";
    const error = inputValidation.email(value);

    expect(error).toBe("L'adresse e-mail ne doit pas être vide");
  })

  it("check mail input with correct value", () => {
    const value = "email@test.com";
    const error = inputValidation.email(value);

    expect(error).toBe(null);
  })

  it("check mail input with incorrect value", () => {
    const value = "emailtest.com";
    const error = inputValidation.email(value);

    expect(error).toBe("L'adresse e-mail est n'est pas valide");
  })

  it("check mail input with long value", () => {
    let value = "test@.com";

    for (let i = 0; i < 320; i++) {
      value += 'a';
    }
    value += '@mail.com';

    const error = inputValidation.email(value);
    expect(error).toBe("L'adresse e-mail est trop longue 320 caractères maximum");
  })
})


describe("name check", () => {
  it("check name input with no value", () => {
    const value = "";
    const error = inputValidation.name(value);

    expect(error).toBe("Le nom ne doit pas être vide");
  })

  it("check name input with correct value", () => {
    const value = "Math";
    const error = inputValidation.name(value);

    expect(error).toBe(null);
  })

  it("check name input with long value", () => {
    let value = "";

    for (let i = 0; i < 70; i++) {
      value += 'a';
    }

    const error = inputValidation.name(value);

    expect(error).toBe("Le nom est trop long 60 caractères maximum");
  })


  describe("message check", () => {
    it("check message input with no value", () => {
      const value = "";
      const error = inputValidation.message(value);

      expect(error).toBe("Le message ne doit pas être vide");
    })

    it("check message input with correct value", () => {
      let value = "";

      for (let i = 0; i < 40; i++) {
        value += 'a';
      }

      const error = inputValidation.message(value);

      expect(error).toBe(null);
    });

    it("check message input with long value", () => {
      let value = "";

      for (let i = 0; i < 1200; i++) {
        value += 'a';
      }

      const error = inputValidation.message(value);

      expect(error).toBe("Le message est trop long 1000 caractères maximum");
    });
  })
})