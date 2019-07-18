import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace criminalsystem{
   export class Criminals extends Participant {
      Ministry: Category;
      SerialNo: string;
      Cnic: string;
      Name: string;
      crime: string;
      Description: string;
      sentenceStatus: boolean;
      AssetDescription1: criminalAssets;
      AssetDescription2: criminalAssets;
      AssetDescription3: criminalAssets;
      batchId: MinistryPerson;
      timeStamp: string;
      Location: string;
   }
   export class MinistryPerson extends Participant {
      batchId: string;
      MinistryCategory: Category;
   }
   export enum Category {
      PoliceStation,
      Airport,
      PakistanArmedForce,
      PakistanAirForce,
      PakistanNavy,
      PakistanArmy,
      AirportSecurityForces,
      FedralIntelligence,
      IntelligenceBureau,
      PakistanRangers,
      LawAndJustice,
      SupremeCourt,
   }
   export enum criminalAssets {
      None,
      Cash,
      Wallet,
      Gun,
      Vehicle,
      AtmCard,
   }
   export class ChangeCriminalStatus extends Transaction {
      CriminalId: string;
      MinistryPersonId: string;
      MinistryCategory: string;
   }
// }
