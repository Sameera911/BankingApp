import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  accno="";
  uname="";
  pwd="";

    registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    accno:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    });
  constructor(private dataservice:DataService, private router:Router,private fb:FormBuilder ) { }

  ngOnInit(): void {
  }

  register()
  {
  //  if(this.registerForm.get('uname')?.errors)
  //   {
  //     alert("Invalid username");
  //   }
    
    if(this.registerForm.valid){
    
    this.dataservice.userregister(this.registerForm.value.accno,this.registerForm.value.uname,this.registerForm.value.pwd)
    .subscribe(data=>{
      if(data){
        alert("registration successful, Please log in");//or data.message
        this.router.navigateByUrl('');
      }
    },(data)=>{
      alert(data.error.message);
     })
            
    }
    else{
            alert("Invalid Forms");
          }

    //console.log(this.registerForm.value);
    
   
  }

}
