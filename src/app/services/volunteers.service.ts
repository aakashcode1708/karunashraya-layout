import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Volunteer } from '../model/volunteer';
@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  url_ = 'assets/countries-list.json';
  profile_url = '';
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient
  ) {}
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  saveVolunteer(volunteer: Volunteer) {
    volunteer.id = this.db.createId();
    return this.db
      .collection('volunteers')
      .add(JSON.parse(JSON.stringify(volunteer)));
    console.log(volunteer);
  }
  getAllCountryData(): any {
    return this.http.get<any>(this.url_);
  }
}
