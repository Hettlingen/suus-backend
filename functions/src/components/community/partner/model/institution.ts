import {Partner} from './partner';
/**
 * Created by martinbraun on 06.09.16.
 */

export class Institution extends Partner {
  private _name : string;

  constructor(uuid: string, name: string) {
    super(uuid);
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
