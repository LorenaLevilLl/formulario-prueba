import {ComunaModel} from './comuna.model';
export class RegionModel {
    region: string;
    region_number: string;
    region_iso_3166_2: string;
    provincias: string[];
    comunas:ComunaModel[];


  }