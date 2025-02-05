import { HttpClient } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Mail } from 'src/app/interfaces';

interface response {
  code: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  emails: Mail[] = [];
  constructor(private http: HttpClient ) { }

  sendMail = () => {  }

  sendEmail = async (email: Mail) => {
    let formData = new FormData();
    formData.append("to", JSON.stringify(email.to.map( user => user.email)));
    formData.append("subject", email.subject);
    formData.append("body", email.body);
    email.attachments.forEach( doc => {
      formData.append("attachments", doc, doc.name)
    })

    this.emails.push(email);
    return await this.http.post<response>("http://localhost:3000/mail/send", formData)
      .toPromise();
  }
}
