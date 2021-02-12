import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from './services/persona.service';
import {PersonaModel} from '../model/persona.model';
import {RegionModel} from '../model/region.model';
import {ComunaModel} from '../model/comuna.model';
import {ArchivoModel} from '../model/archivo.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  regionesList :RegionModel[];
  comunasList :ComunaModel[] =[];
  archivo : ArchivoModel = null;
  persona : PersonaModel = new PersonaModel();
  archivoAux = null;
  rutIsValid = false;
  existeRut = false;
  proceso = false;
  public filesToUpload: Array<File>;
  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rut: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fechaNacimiento: new FormControl(''),
    region: new FormControl('', [Validators.required, Validators.minLength(3)]),
    comuna: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    //fotoPerfil: new FormControl('')

  });
  constructor(private personaService: PersonaService) {
   }

  ngOnInit(): void {
    this.personaService.getRegiones().then(response => {
      console.log("RESPONSE REGIONES :: ", response);
      this.regionesList = response;
      this.comunasList = this.regionesList[0].comunas;
    });
   
     this.personaService.getPrueba().then(response => {
      console.log("RESPUESTA :: "+response.menssage);
     });

    this.form.controls['rut'].valueChanges.subscribe(value => {
         console.log("Rus es valido :: "+ this.rutEsValido(value));
         if(this.rutEsValido(value)){
          this.rutIsValid = true;
          this.personaService.validaRut(value).then(response =>{
             if(response.status == false){
               this.existeRut = true;
             }
          });
         }else{
          this.rutIsValid = false;
         }
    });

     this.form.controls['region'].valueChanges.subscribe(value => {
      console.log('Region seleccionado :: ',value);
      this.regionesList.forEach(element => {
        if(value === element.region){
          this.comunasList = element.comunas;
        }
      });
    });

    this.form.controls['fotoPerfil'].valueChanges.subscribe(value => {
      console.log('foto ingresada :: ',value);
      var files = value;


    });
  }

  pocessImg(evt){
    console.log('Inicio procesando imagen');
    this.filesToUpload=<Array<File>> evt.target.files;
    this.archivo = new ArchivoModel(this.filesToUpload[0],this.filesToUpload[0].type);
    console.log('Fin procesando imagen',this.archivo);
   // if(null != this.archivo){
      this.persona.fotoPerfil = {data:this.filesToUpload[0], contentType:this.filesToUpload[0].type};
  //  }
  this.proceso = true;

    
 }


  get f(){
      return this.form.controls;
  }

   

  submit(){
      console.log('Antes de enviar el formulario', this.form.status);
      if(this.form.status === 'VALID'){
        this.persona.nombre = this.form.value.nombre;
        this.persona.apellidos = this.form.value.apellidos;
        this.persona.rut = this.form.value.rut;
        this.persona.fechaNacimiento = this.form.value.fechaNacimiento;
        this.persona.region = this.form.value.region;
        this.persona.comuna = this.form.value.comuna;
        this.persona.direccion = this.form.value.direccion;
        this.persona.email = this.form.value.email;
        this.persona.fotoPerfil = this.archivo;
       // console.log('archivooo :: ', this.archivoAux)
        console.log('nuevvoooo :: ', this.archivo)
        
        console.log("request persona ", this.personaService);
        this.personaService.addUsuario(this.persona).then(response =>{
          console.log('RESPONSEEE ::', response);
        });
      
      }else{
        this.revisarValores();
      }
  }

  revisarValores(){
    console.log ('nombre'+this.form.controls['nombre'].status);
    console.log ('apellidos'+this.form.controls['apellidos'].status);
    console.log ('fechaNacimiento'+this.form.controls['fechaNacimiento'].status);
    console.log ('rut'+this.form.controls['rut'].status);
   console.log ('region'+this.form.controls['region'].status);
   console.log ('comuna'+this.form.controls['comuna'].status);
   console.log ('fotoPerfil'+this.form.controls['fotoPerfil'].status);
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log('Inicio procesando imagen');
      this.filesToUpload=<Array<File>> event.target.files;

      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });

        this.archivoAux = reader.result;
        this.archivo = new ArchivoModel(this.archivoAux ,this.filesToUpload[0].type);
        //this.archivo = new ArchivoModel(reader.result,);
        
        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }


  clearVariables(){
    this.existeRut = false;
    this.rutIsValid = false;
  }


  rutEsValido(rut) {
    let response = false;
    if (!rut || rut.trim().length < 3) return false;
    const rutLimpio = rut.replace(/[^0-9kK-]/g, "");
    if (rutLimpio.length < 3) return false;
    const split = rutLimpio.split("-");
    if (split.length !== 2) return false;
    const num = parseInt(split[0], 10);
    const dgv = split[1];
    const dvCalc = this.calculateDV(num);
    if(dvCalc === dgv){
      console.log('son iguales'+dvCalc+ ' - '+dgv);
      response = true;
    }else{
      console.log('No son iguales'+dvCalc+ ' - '+dgv);
    }
    return response ;
  }
  
   calculateDV(rut) {
     console.log(' calculateDV rut :',rut);
    const cuerpo = rut;
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
  
    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      const index = multiplo * cuerpo.charAt(cuerpo.length - i);
      // Sumar al Contador General
      suma += index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo += 1;
      } else {
        multiplo = 2;
      }
    }
  
    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 10) return "k";
    if (dvEsperado === 11) return "0";
    return dvEsperado;
  }
}
