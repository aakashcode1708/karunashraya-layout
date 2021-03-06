import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Volunteer } from 'src/app/model/volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';
import { imageConfig } from 'src/app/utils/config';
import { Validation } from 'src/app/utils/validation';
import { AngularFireStorage } from '@angular/fire/storage';
import { readAndCompressImage } from 'browser-image-resizer';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-volunteering-registration',
  templateUrl: './volunteering-registration.component.html',
  styleUrls: ['./volunteering-registration.component.css'],
})
export class VolunteeringRegistrationComponent implements OnInit {
  vol: Volunteer = new Volunteer();
  uploadPercent: number = null;
  countries: any;
  states: any;
  cities: any;
  city_val: string;
  selectedCountry: any = {
    id: '',
    city_id: '',
    name: '',
  };
  areaList: string[] = [
    'Cotton Ball',
    'Art and Craft',
    'Social Media',
    'Creating Awraness',
    'Fund Raising',
  ];
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(),
    dob: new FormControl(''),
    profile: new FormControl(''),
    mobile: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    address3: new FormControl(''),
    street: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    pincode: new FormControl(''),
    areas: new FormControl(''),
    personVisit: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private volService: VolunteersService,
    private storage: AngularFireStorage,
    private route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        middlename: [''],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        confirmpassword: ['', Validators.required],
        dob: ['', Validators.required],
        profile: ['', Validators.required],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        landline: [''],
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        address3: ['', Validators.required],
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        pincode: ['', Validators.required],
        areas: [null, [Validators.required, Validators.minLength(2)]],
        personVisit: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmpassword')],
      }
    );
    this.showAllCountryData();
    this.onSelectState(this.selectedCountry.id);
    this.onSelectCity(this.selectedCountry.city_id);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      //this.vol.id = '';
      this.vol.firstname = this.form.value.firstname;
      this.vol.middlename = this.form.value.middlename;
      this.vol.lastname = this.form.value.lastname;
      this.vol.email = this.form.value.email;
      this.vol.password = this.form.value.password;
      this.vol.dob = this.form.value.dob;
      //this.vol.profile = this.form.value.profile;
      this.vol.mobile = this.form.value.mobile;
      this.vol.landline = this.form.value.landline;
      this.vol.address1 = this.form.value.address1;
      this.vol.address2 = this.form.value.address2;
      this.vol.address3 = this.form.value.address3;
      this.vol.street = this.form.value.street;
      this.vol.state = this.form.value.state;
      this.vol.city = this.form.value.city;
      this.vol.country = this.form.value.country;
      this.vol.pincode = this.form.value.pincode;
      this.vol.areas = this.form.value.areas;
      this.vol.personVisit = this.form.value.personVisit;
      this.vol.status = false;
      console.log(this.vol);
      this.volService.saveVolunteer(this.vol).then(() => {
        this.volService.signUp(this.vol.email, this.vol.password).then(
          () => {
            this.toastr.success('Volunteer Registration successfull');
            this.route.navigate(['login']);
          },
          (err) => {
            this.toastr.error('Registration Failed');
          }
        );
      });
    }
  }
  async uploadFile(event: any) {
    const uid = uuidv4();
    const file = event.target.files[0];
    let resizedImage = await readAndCompressImage(file, imageConfig);
    const filepath = 'profiles/' + uid + '/' + file.name;
    console.log(filepath);
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, resizedImage);
    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage;
    });
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.vol.profile = url;
          });
        })
      )
      .subscribe();
  }
  showAllCountryData() {
    this.volService.getAllCountryData().subscribe((data: any) => {
      this.countries = data;
      console.log(this.countries);
    });
  }
  onSelectState(country_id: any) {
    this.volService.getAllCountryData().subscribe((res: any) => {
      this.states = res['states'].filter(
        (res: any) => res.country_id === country_id!.value
      );
      console.log(this.states);
    });
  }
  onSelectCity(state_id: any) {
    this.volService.getAllCountryData().subscribe((res: any) => {
      this.cities = res['cities'].filter(
        (res: any) => res.state_id === state_id!.value
      );
      console.log(this.cities);
    });
  }
}
