export interface NewLoadingEntity extends Omit<LoadingEntity, 'id'> {
    id?: string;
}


export interface SimpleLoadingEntity {
    id: string;
    lat: number;
    lon: number;
}

export interface LoadingEntity extends SimpleLoadingEntity {
    name: string;
    description: string;
    freight: number;
    weight: number;
    type_of_trailer: string;
    type_of_cargo: string;
    pickup_address: string;
    delivery_address: string;
}