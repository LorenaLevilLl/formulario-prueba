const userService = require('../services/userService');

describe('obtiene dv de un rut valido', () => {
  test('obtiene dv de un rut valido', () => {
    const request = { body: { rut: '17261087' } };
    const respuesta = 0;
    expect(userService.getDigitoV(request)).toBe(respuesta);
  });
});

describe('obtiene dv de un rut terminado en k', () => {
    test('obtiene dv de un rut terminado en k', () => {
      const request = { body: { rut: '16314137' } };
      const respuesta = 'k';
      expect(userService.getDigitoV(request)).toBe(respuesta);
    });
  });

describe('obtiene dv de un rut invalido', () => {
    test('obtiene dv de un rut invalido', () => {
    const request = { body: { rut: '00000001' } };
      const respuesta = 9;
      expect(userService.getDigitoV(request)).toBe(respuesta);
    });
});
