import { Clipboard } from '@capacitor/clipboard';

export async function writeToClipboard(text:string){
    console.log(text)
  await Clipboard.write({
    string: text
  });
}

