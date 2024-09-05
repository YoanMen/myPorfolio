import { inputValidation } from '../assets/scripts/inputValidation.js';


describe('inputValidation', () => {
  it('should return null if the name is valid', () => {
    const input = 'yoan';
    const validation = inputValidation.name(input);
    expect(validation).toBe(null);
  });

  it('should return string if the mail is invalid', () => {
    const input = 'testest.com';
    const validation = inputValidation.email(input);
    expect(validation).not.toBe(null);
  });

  it('should return null if the mail is valid', () => {
    const input = 'test@test.com';
    const validation = inputValidation.email(input);
    expect(validation).toBe(null);
  });


  it('should return null if the svg is valid', () => {
    const input = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M8.5 11.5H10v-6H7V7h1.5zm3.5 0h4.5V8h-3V7h3V5.5H12V9h3v1h-3zm-6 7h1.5V14h1v3H10v-3h1v4.5h1.5v-6H6zm7.5 0H15V17h3v-4.5h-4.5zm1.5-3V14h1.5v1.5zM3 21V3h18v18z"/></svg>';
    const validation = inputValidation.checkIsSVG(input);
    expect(validation).toBe(null);
  });

  it('should return string if the svg is invalid', () => {
    const input = '<s xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M8.5 11.5H10v-6H7V7h1.5zm3.5 0h4.5V8h-3V7h3V5.5H12V9h3v1h-3zm-6 7h1.5V14h1v3H10v-3h1v4.5h1.5v-6H6zm7.5 0H15V17h3v-4.5h-4.5zm1.5-3V14h1.5v1.5zM3 21V3h18v18z"/></svg>';
    const validation = inputValidation.checkIsSVG(input);
    expect(validation).not.toBe(null);
  });
});