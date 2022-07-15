import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';
import {LoadingEntity, NewLoadingEntity, SimpleLoadingEntity} from "../types";

type LoadingRecordResults = [LoadingEntity[], FieldPacket[]];

export class LoadingRecord implements LoadingEntity {
    public id: string;
    public name: string;
    public description: string;
    public freight: number;
    public lat: number;
    public lon: number;
    public type_of_trailer: string;
    public type_of_cargo: string;
    public weight: number;
    public pickup_address: string;
    public delivery_address: string;

    constructor(obj: NewLoadingEntity) {
        if (!obj.name  || obj.name.length > 100) {
            throw new ValidationError('Nazwa załadunku nie może być pusta, anie przekraczać 100 znaków');
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść załadunku nie może przekraczać 1000 znaków.');
        }

        if (obj.freight < 0 || obj.freight > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować załadunku.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.freight = obj.freight;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.type_of_trailer = obj.type_of_trailer;
        this.type_of_cargo = obj.type_of_cargo;
        this.weight = obj.weight;
        this.pickup_address = obj.pickup_address;
        this.delivery_address = obj.delivery_address;
    }
    static async getOne(id: string): Promise<LoadingRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `loading` WHERE id = :id", {
            id,
        }) as LoadingRecordResults;

        return results.length === 0 ? null : new LoadingRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleLoadingEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `loading` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as LoadingRecordResults;

        return results.map(result => {
           const {
               id, lat, lon,
           } = result;

           return {
               id, lat, lon
           }
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that already exists.');
        }

        await pool.execute("INSERT INTO `loading` (`id`, `name`, `description`, `freight`, `lat`, `lon`, `type_of_trailer`, `type_of_cargo`, `weight`, `pickup_address`, `delivery_address`) VALUES(:id, :name, :description, :freight, :lat, :lon, :type_of_trailer, :type_of_cargo, :weight, :pickup_address, :delivery_address)", this);
    }
}