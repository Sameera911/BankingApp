import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

name:any;
acno:any;
  constructor(private router:Router,public dataService:DataService,private fb:FormBuilder) {
    this.name=localStorage.getItem("name");
   }

 accno="";
 password="";
 amt="";
 accDelete:any;
llogin:Date=new Date();
//id="1234";

 depositform=this.fb.group(
   {
    accno:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
   }
 );
 withdrawform=this.fb.group(
  {
   accno:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern('[0-9]*')]],
   password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
   amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  }
);
  ngOnInit(): void {
  }

withdraw()
{
  if(this.withdrawform.valid)
  {
    var acno=this.withdrawform.value.accno;
    var pass=this.withdrawform.value.password;
    var amnt=this.withdrawform.value.amt;
    this.dataService.withdraw(acno,pass,amnt)
    .subscribe((data:any)=>{
      if(data)
      {
        alert(data.message+data.balance);
      }
      },(data)=>{

      alert(data.error.message);
      
    })
  }

  else{
      alert("Invalid Forms");
    }
        
}


deposit()
{
  if(this.depositform.valid)
  {
      var acno=this.depositform.value.accno;
      var pass=this.depositform.value.password;
      var amnt=this.depositform.value.amt;
      this.dataService.deposit(acno,pass,amnt)
      .subscribe((data:any)=>{
        if(data)
        {
          alert(data.message+data.balance);//
        }
        },(data)=>{

        alert(data.error.message);
        
      })
  }

      else{
          alert("Invalid Forms");
        }
              
}
    

onDelete($event:any)
{
  //alert("This is an alert from parent"+$event);
  this.accDelete=$event;
  alert("This is an alert from paremt "+$event);
  this.dataService.deleteAccDetails($event)
  .subscribe((data:any)=>{
   if(data) {
     alert(data.message);
      this.acno=null;
      this.router.navigateByUrl('');
   }
  })
  
}

onCancel()
{
  //alert("This is an alert from parent");
  
  this.acno=null;
}

deleteAcc()
{
  this.acno=localStorage.getItem("acno");
  //alert(this.acno);
}

}
