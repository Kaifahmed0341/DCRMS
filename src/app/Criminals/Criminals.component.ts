/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CriminalsService } from './Criminals.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-criminals',
  templateUrl: './Criminals.component.html',
  styleUrls: ['./Criminals.component.css'],
  providers: [CriminalsService]
})
export class CriminalsComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  Ministry = new FormControl('', Validators.required);
  SerialNo = new FormControl('', Validators.required);
  Cnic = new FormControl('', Validators.required);
  Name = new FormControl('', Validators.required);
  crime = new FormControl('', Validators.required);
  Description = new FormControl('', Validators.required);
  sentenceStatus = new FormControl('', Validators.required);
  AssetDescription1 = new FormControl('', Validators.required);
  AssetDescription2 = new FormControl('', Validators.required);
  AssetDescription3 = new FormControl('', Validators.required);
  batchId = new FormControl('', Validators.required);
  timeStamp = new FormControl('', Validators.required);
  Location = new FormControl('', Validators.required);


  constructor(public serviceCriminals: CriminalsService, fb: FormBuilder) {
    this.myForm = fb.group({
      Ministry: this.Ministry,
      SerialNo: this.SerialNo,
      Cnic: this.Cnic,
      Name: this.Name,
      crime: this.crime,
      Description: this.Description,
      sentenceStatus: this.sentenceStatus,
      AssetDescription1: this.AssetDescription1,
      AssetDescription2: this.AssetDescription2,
      AssetDescription3: this.AssetDescription3,
      batchId: this.batchId,
      timeStamp: this.timeStamp,
      Location: this.Location
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCriminals.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'criminalsystem.Criminals',
      'Ministry': this.Ministry.value,
      'SerialNo': this.SerialNo.value,
      'Cnic': this.Cnic.value,
      'Name': this.Name.value,
      'crime': this.crime.value,
      'Description': this.Description.value,
      'sentenceStatus': this.sentenceStatus.value,
      'AssetDescription1': this.AssetDescription1.value,
      'AssetDescription2': this.AssetDescription2.value,
      'AssetDescription3': this.AssetDescription3.value,
      'batchId': this.batchId.value,
      'timeStamp': this.timeStamp.value,
      'Location': this.Location.value
    };

    this.myForm.setValue({
      'Ministry': null,
      'SerialNo': null,
      'Cnic': null,
      'Name': null,
      'crime': null,
      'Description': null,
      'sentenceStatus': null,
      'AssetDescription1': null,
      'AssetDescription2': null,
      'AssetDescription3': null,
      'batchId': null,
      'timeStamp': null,
      'Location': null
    });

    return this.serviceCriminals.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'Ministry': null,
        'SerialNo': null,
        'Cnic': null,
        'Name': null,
        'crime': null,
        'Description': null,
        'sentenceStatus': null,
        'AssetDescription1': null,
        'AssetDescription2': null,
        'AssetDescription3': null,
        'batchId': null,
        'timeStamp': null,
        'Location': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'criminalsystem.Criminals',
      'Ministry': this.Ministry.value,
      'Cnic': this.Cnic.value,
      'Name': this.Name.value,
      'crime': this.crime.value,
      'Description': this.Description.value,
      'sentenceStatus': this.sentenceStatus.value,
      'AssetDescription1': this.AssetDescription1.value,
      'AssetDescription2': this.AssetDescription2.value,
      'AssetDescription3': this.AssetDescription3.value,
      'batchId': this.batchId.value,
      'timeStamp': this.timeStamp.value,
      'Location': this.Location.value
    };

    return this.serviceCriminals.updateParticipant(form.get('SerialNo').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceCriminals.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCriminals.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'Ministry': null,
        'SerialNo': null,
        'Cnic': null,
        'Name': null,
        'crime': null,
        'Description': null,
        'sentenceStatus': null,
        'AssetDescription1': null,
        'AssetDescription2': null,
        'AssetDescription3': null,
        'batchId': null,
        'timeStamp': null,
        'Location': null
      };

      if (result.Ministry) {
        formObject.Ministry = result.Ministry;
      } else {
        formObject.Ministry = null;
      }

      if (result.SerialNo) {
        formObject.SerialNo = result.SerialNo;
      } else {
        formObject.SerialNo = null;
      }

      if (result.Cnic) {
        formObject.Cnic = result.Cnic;
      } else {
        formObject.Cnic = null;
      }

      if (result.Name) {
        formObject.Name = result.Name;
      } else {
        formObject.Name = null;
      }

      if (result.crime) {
        formObject.crime = result.crime;
      } else {
        formObject.crime = null;
      }

      if (result.Description) {
        formObject.Description = result.Description;
      } else {
        formObject.Description = null;
      }

      if (result.sentenceStatus) {
        formObject.sentenceStatus = result.sentenceStatus;
      } else {
        formObject.sentenceStatus = null;
      }

      if (result.AssetDescription1) {
        formObject.AssetDescription1 = result.AssetDescription1;
      } else {
        formObject.AssetDescription1 = null;
      }

      if (result.AssetDescription2) {
        formObject.AssetDescription2 = result.AssetDescription2;
      } else {
        formObject.AssetDescription2 = null;
      }

      if (result.AssetDescription3) {
        formObject.AssetDescription3 = result.AssetDescription3;
      } else {
        formObject.AssetDescription3 = null;
      }

      if (result.batchId) {
        formObject.batchId = result.batchId;
      } else {
        formObject.batchId = null;
      }

      if (result.timeStamp) {
        formObject.timeStamp = result.timeStamp;
      } else {
        formObject.timeStamp = null;
      }

      if (result.Location) {
        formObject.Location = result.Location;
      } else {
        formObject.Location = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'Ministry': null,
      'SerialNo': null,
      'Cnic': null,
      'Name': null,
      'crime': null,
      'Description': null,
      'sentenceStatus': null,
      'AssetDescription1': null,
      'AssetDescription2': null,
      'AssetDescription3': null,
      'batchId': null,
      'timeStamp': null,
      'Location': null
    });
  }
}
