import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AskGenie';

  searchQuery: string ='';
  searchResult: string = '';

  constructor(private http: HttpClient) {}


  handleKeyUp(e: KeyboardEvent){
    if(e.keyCode === 13){
       console.log('enter pressed'+this.searchQuery);

       this.getResponse(this.searchQuery);
      // this.searchResult = this.searchQuery;
    }
 }

 async getResponse(input: string) {
  const apiKey = '<replace this>';
  const model = 'text-davinci-003';
  const prompt = `${input}`;
  const response = await this.http.post(`https://api.openai.com/v1/completions`, {
    prompt,
    model,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 0,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  }).subscribe(response =>  {

    let data: any = response;
    this.searchResult = data['choices'][0]['text'];
      //console.log('Received the Response'+ JSON.stringify(response));
  });
  
}
}
