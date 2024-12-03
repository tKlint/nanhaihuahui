
export interface ICity {
    id: string
    text: string
    children: ICity[]
}
export enum MMCityType {
    Default,
    Provinces,
    Citys,
    Area
}