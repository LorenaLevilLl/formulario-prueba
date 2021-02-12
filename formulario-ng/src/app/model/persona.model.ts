import {ArchivoModel} from '../model/archivo.model';
export class PersonaModel {
    nombre: string;
    apellidos: String;
    rut: String;
    fechaNacimiento: string;
    region: String;
    comuna: String;
    direccion: String;
    email: String;
    fotoPerfil: ArchivoModel;

    constructor(){

    }

  }