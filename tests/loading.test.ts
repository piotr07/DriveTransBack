import {LoadingRecord} from "../records/loading.record";
import {pool} from "../utils/db";
import {LoadingEntity} from "../types";

const defaultObj = {
   name: 'Test Loading',
   description: 'bla bla bla',
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

test('LoadingRecord.getOne returns null from database for unexisting entry.', async () => {
   const loading = await LoadingRecord.getOne('---');

   expect(loading).toBeNull();

});

test('LoadingRecord.findAll returns array of found entries.', async () => {
   const loadings = await LoadingRecord.findAll('');

   expect(loadings).not.toEqual([]);
   expect(loadings[0].id).toBeDefined();
});

test('LoadingRecord.findAll returns array of found entries for "a".', async () => {
   const loadings = await LoadingRecord.findAll('a');

   expect(loadings).not.toEqual([]);
   expect(loadings[0].id).toBeDefined();
});


test('LoadingRecord.findAll returns empty array when searching for something that not exists.', async () => {
   const loadings = await LoadingRecord.findAll('--------------------------------------------');

   expect(loadings).toEqual([]);
});

test('LoadingRecord.findAll returns smaller amount of data.', async () => {
   const loadings = await LoadingRecord.findAll('');

   expect((loadings[0] as LoadingEntity).freight).toBeUndefined();
   expect((loadings[0] as LoadingEntity).description).toBeUndefined();
});

test('LoadingRecord.insert returns new UUID.', async () => {
   const loading = new LoadingRecord(defaultObj);
   await loading.insert();

   expect(loading.id).toBeDefined();
   expect(typeof loading.id).toBe('string');
});

test('LoadingRecord.insert inserts data to database', async () => {
   const loading = new LoadingRecord(defaultObj);
   await loading.insert();

   const foundLoading = await LoadingRecord.getOne(loading.id);

   expect(foundLoading).toBeDefined();
   expect(foundLoading).not.toBeNull();
   expect(foundLoading.id).toBe(loading.id);
});