import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {PersonaModel} from '../../model/persona.model';
import {RegionModel} from '../../model/region.model';
//import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    //this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    //this.headers = this.headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
  }

addUsuario(request:PersonaModel){   
    return this.http.post('http://localhost:3000/api/add',request, {
        headers: this.headers,
      }).toPromise();
}

getPrueba():Promise<any>{
  return this.http.get('http://localhost:3000/api/pruebas', {
    headers: this.headers,
  }).toPromise();
}

getRegiones():Promise<RegionModel[]>{
  return this.http.get<RegionModel[]>('https://e0a248af-6cfd-44d6-bec2-6c97ee008709.mock.pstmn.io/regiones-y-comunas', {
    headers: this.headers,
  }).toPromise();
}

/*getRegiones():Promise<RegionModel[]>{
  return this.http.get<RegionModel[]>('https://e0a248af-6cfd-44d6-bec2-6c97ee008709.mock.pstmn.io/regiones-y-comunas', {
    headers: this.headers,
  }).toPromise();
}*/

}
