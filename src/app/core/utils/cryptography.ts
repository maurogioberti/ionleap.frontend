import { environment } from 'src/environments/environment';

export class Cryptography {
  private salt: string;
  
  constructor() {
    this.salt = environment.cryptography;
  }

  private textToChars = text => text.split('').map(c => c.charCodeAt(0));
  private byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  private applySaltToChar = code => this.textToChars(this.salt).reduce((a,b) => a ^ b, code);

  public encrypt(text: string): string {
    return text.split('')
    .map(this.textToChars)
    .map(this.applySaltToChar)
    .map(this.byteHex)
    .join('');
  }

  public decrypt(encoded: string): string {
    return encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(this.applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
  }
}