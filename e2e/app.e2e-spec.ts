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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for decentralize-criminal-records-managment-system', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be decentralize-criminal-records-managment-system', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('decentralize-criminal-records-managment-system');
    })
  });

  it('network-name should be crm@0.0.2',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('crm@0.0.2.bna');
    });
  });

  it('navbar-brand should be decentralize-criminal-records-managment-system',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('decentralize-criminal-records-managment-system');
    });
  });

  

  
    it('Criminals component should be loadable',() => {
      page.navigateTo('/Criminals');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Criminals');
      });
    });

    it('Criminals table should have 14 columns',() => {
      page.navigateTo('/Criminals');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(14); // Addition of 1 for 'Action' column
      });
    });
  
    it('MinistryPerson component should be loadable',() => {
      page.navigateTo('/MinistryPerson');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MinistryPerson');
      });
    });

    it('MinistryPerson table should have 3 columns',() => {
      page.navigateTo('/MinistryPerson');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ChangeCriminalStatus component should be loadable',() => {
      page.navigateTo('/ChangeCriminalStatus');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ChangeCriminalStatus');
      });
    });
  

});