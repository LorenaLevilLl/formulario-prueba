import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from './services/persona.service';
import {PersonaModel} from '../model/persona.model';
import {RegionModel} from '../model/region.model';
import {ComunaModel} from '../model/comuna.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  regionesList :RegionModel[];
  comunasList :ComunaModel[] =[];
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  form = new FormGroup({

    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rut: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fechaNacimiento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    region: new FormControl('', [Validators.required, Validators.minLength(3)]),
    comuna: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fotoPerfil: new FormControl('', Validators.required)

  });
  constructor(private personaService: PersonaService) {


   }

  ngOnInit(): void {

    this.personaService.getRegiones().then(response => {
      console.log("RESPONSE REGIONES :: ", response);
      this.regionesList = response;
    });
   
     this.personaService.getPrueba().then(response => {
      console.log("RESPUESTA :: "+response.menssage);
     });

     this.form.controls['region'].valueChanges.subscribe(value => {
      console.log('Region seleccionado :: ',value);
      this.regionesList.forEach(element => {
        if(value === element.region){
          this.comunasList = element.comunas;
        }
      });
    });
  }



   

  get f(){
      return this.form.controls;
  }

   

  submit(){
      console.log('Antes de enviar el formulario');
      if(this.form.status === 'VALID'){
        let persona : PersonaModel = new PersonaModel();
        persona.nombre = this.form.value.nombre;
        persona.apellidos = this.form.value.apellidos;
        persona.rut = this.form.value.rut;
        persona.fechaNacimiento = this.form.value.fechaNacimiento;
        persona.region = this.form.value.region;
        persona.comuna = this.form.value.comuna;
        persona.direccion = this.form.value.direccion;
        persona.email = this.form.value.email;
        persona.fotoPerfil = this.form.value.fotoPerfil;
        console.log(this.form.value);

        console.log("PERSOAN ",persona);
        this.personaService.addUsuario(persona).then(response =>{
          console.log('RESPONSEEE ::', response);
        });
      }
  }


  /*this.form.controls['region'].valueChanges.subscribe(value => {
    console.log(value);
  });*/

  

  setValue(){      
    this.form.setValue({name: 'Hardik Savani', email: 'itsolutionstuff@gmail.com', body: 'This is testing from itsolutionstuff.com'});
  }

  

  resetValue(){
      this.form.reset({name: '', email: '', body: ''});
  }

  
}
