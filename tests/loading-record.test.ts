import {LoadingRecord} from "../records/loading.record";
import {pool} from "../utils/db";

const defaultObj = {
    name: 'Test Loading',
    description: 'test opis',
    freight: 0,
    lat: 9,
    lon: 10,
    weight: 356.67,
    type_of_trailer: 'Chłodnia',
    type_of_cargo: 'Paleta',
    pickup_address: 'Warszawa, Aleje Jerozolimskie 50',
    delivery_address: 'Gdańsk, Kościuszki 67',
};

afterAll(async () => {
    await pool.end();
})

test('Can build AdRecord', () => {
    const loading = new LoadingRecord(defaultObj);

    expect(loading.name).toBe('Test Loading');
    expect(loading.description).toBe('test opis');
});

test('Validates invalid price', () => {
    expect(() => new LoadingRecord({
        ...defaultObj,
        freight: -3,
    })).toThrow('Fracht nie może być mniejszy niż 0 lub większy niż 9 999 999.');
})