import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router,Routes} from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  constructor(private router:Router,private dataService:DataService, private fb:FormBuilder) { }

  accno=" ";
  upw="";
 
  loginForm=this.fb.group(
    {
    accno:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern('[0-9]*')]],
    upw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    }
  );

  ngOnInit(): void {
  }
  // getuname(event:any)
  // {
    // html...........(change)="getuname($event)"
    //this.accno=event.target.value;
    //console.log(this.name);
    
 // }
  // getpwd(event:any)
  // {
    
    //.............(change)="getpwd($event)"
    // this.upw=event.target.value;
    // //console.log(this.pw);
    
  //}
  login()
  {
   //alert("hii");
    
      if(this.loginForm.valid)
      {
            
          var acno = this.loginForm.value.accno;
          var upwd = this.loginForm.value.upw;
          this.dataService.login(acno,upwd)
          .subscribe((data:any)=>{
            if(data){
              alert(data.message);
              localStorage.setItem("name",data.name);
              localStorage.setItem("acno",data.acno);
              this.router.navigateByUrl('dashboard');
            }
          },(data)=>{
            alert(data.error.message);
          })
          // var acno = a.value;
          // var upwd = p.value;
        //  if(result)
        //  {
        //    this.router.navigateByUrl("dashboard");
        //  }
        }
        else
        {
          alert("Invalid Forms");
        }
  }

}
