import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from './services/persona.service';
import { PersonaModel } from '../model/persona.model';
import { RegionModel } from '../model/region.model';
import { ComunaModel } from '../model/comuna.model';
import { ArchivoModel } from '../model/archivo.model';
import { ConstantPool } from '@angular/compiler';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  regionesList: RegionModel[];
  comunasList: ComunaModel[] = [];
  archivo: ArchivoModel = null;
  persona: PersonaModel = new PersonaModel();
  archivoAux = null;
  rutIsValid = false;
  existeRut = false;
  proceso = false;
  exitoCrear = false;
  message = 'Error';
  errorCrear = false;
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
      this.regionesList = response;
      this.comunasList = this.regionesList[0].comunas;
    });

    this.form.controls['rut'].valueChanges.subscribe(value => {
      this.procesaRut(value).then(rep => {
        console.log("Rus es valido :: " + rep);
        if (rep) {
          this.rutIsValid = true;
          this.personaService.validaRut(value).then(response => {
            if (response.status == false) {
              this.existeRut = true;
            }
          });
        } else {
          this.rutIsValid = false;
        }
      });

    });

    this.form.controls['region'].valueChanges.subscribe(value => {
      console.log('Region seleccionado :: ', value);
      this.regionesList.forEach(element => {
        if (value === element.region) {
          this.comunasList = element.comunas;
        }
      });
    });

   /* this.form.controls['fotoPerfil'].valueChanges.subscribe(value => {
      console.log('foto ingresada :: ', value);
      var files = value;
    });*/
  }

  pocessImg(evt) {
    this.filesToUpload = <Array<File>>evt.target.files;
    this.archivo = new ArchivoModel(this.filesToUpload[0], this.filesToUpload[0].type);
    this.persona.fotoPerfil = { data: this.filesToUpload[0], contentType: this.filesToUpload[0].type };
    this.proceso = true;
  }


  get f() {
    return this.form.controls;
  }

  submit() {
    console.log('Antes de enviar el formulario', this.form.status);
    if (this.form.status === 'VALID') {
      this.persona.nombre = this.form.value.nombre;
      this.persona.apellidos = this.form.value.apellidos;
      this.persona.rut = this.form.value.rut;
      this.persona.fechaNacimiento = this.form.value.fechaNacimiento;
      this.persona.region = this.form.value.region;
      this.persona.comuna = this.form.value.comuna;
      this.persona.direccion = this.form.value.direccion;
      this.persona.email = this.form.value.email;
      this.persona.fotoPerfil = this.archivo;
      this.personaService.addUsuario(this.persona).then(response => {
        console.log('RESPONSEEE ::', response);
        if(response.status == true){
          this.exitoCrear = true;
        }else {
          this.errorCrear = true;
        }
      });
    } else {
      this.revisarValores();
    }
  }

  revisarValores() {
    console.log('nombre' + this.form.controls['nombre'].status);
    console.log('apellidos' + this.form.controls['apellidos'].status);
    console.log('fechaNacimiento' + this.form.controls['fechaNacimiento'].status);
    console.log('rut' + this.form.controls['rut'].status);
    console.log('region' + this.form.controls['region'].status);
    console.log('comuna' + this.form.controls['comuna'].status);
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log('Inicio procesando imagen');
      this.filesToUpload = <Array<File>>event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });

        this.archivoAux = reader.result;
        this.archivo = new ArchivoModel(this.archivoAux, this.filesToUpload[0].type);
        //this.archivo = new ArchivoModel(reader.result,);

        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }


  clearVariables() {
    this.existeRut = false;
    this.rutIsValid = false;
  }

  procesaRut(rut): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let response = false;
      if (!rut || rut.trim().length < 3) response = false;
      const rutLimpio = rut.replace(/[^0-9kK-]/g, "");
      if (rutLimpio.length < 3) response = false;
      const split = rutLimpio.split("-");
      if (split.length !== 2) response = false;
      const num = parseInt(split[0], 10);
      const dgv = split[1];
      if (response = false)
        resolve(response);
      this.personaService.validaDv(num.toString()).then(res => {
        console.log('esperado', dgv);
        console.log('lo que llego', res.message);
        if (dgv.toLowerCase() === res.message) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    return promise;

  }

  cerraModal(){
    this.exitoCrear = false;
    this.errorCrear = false;
  }



}