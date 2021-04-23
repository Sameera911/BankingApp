import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
//to share autherisation and cookies with server
const options={
  withCredentials:true
}

@Injectable({
  providedIn: 'root'
})
export class DataService
{
  accountDetails:any =
  {
      1000: { acno: 1000, name: "userone", balance: 5000, password: "user1" },
      1001: { acno: 1001, name: "usertwo", balance: 3500, password: "user2" },
      1002: { acno: 1002, name: "userthree", balance: 6000, password: "user3" },
      1003: { acno: 1003, name: "userfour", balance: 7000, password: "user4" },
      1004: { acno: 1004, name: "userfive", balance: 5200, password: "user5" },
  }

  currentuser:any;

  constructor(private http:HttpClient) 
  {
    this.getDetails();
   }

  saveDetails()
  {
    localStorage.setItem("accountDetails",JSON.stringify(this.accountDetails));
    if(this.currentuser)
    {
     localStorage.setItem("currentuser",JSON.stringify(this.currentuser));
    }
  }

  getDetails()
  {
    if(localStorage.getItem("accountDetails"))
    {
    this.accountDetails=JSON.parse(localStorage.getItem("accountDetails")||'');
     }
     if(localStorage.getItem("currentuser"))
     {
      this.currentuser=JSON.parse(localStorage.getItem("currentuser")||'');
     }
   
  }

  userregister(acno:any,name:any,password:any)
  {
    const data={
      acno,
      name,
      balance:0,
      password
    }

    return this.http.post(environment.apiUrl+"/register",data);
    // if(acno in this.accountDetails)
    // {
    //   alert("User already exist. Please Login..");
    //   return false;
    // }
    // else{
    //   this.accountDetails[acno]={acno,name,balance:0,password}
    //   this.saveDetails();
    //   console.log(this.accountDetails);
    //   alert("Registration Successful");
    //   return true;
    // }
  }

  login(acno:any,password:any)
  {
    const data={
      acno,
      password
    }
    //alert(acno);
    return this.http.post(environment.apiUrl+"/login",data,options)

    // let dataset=this.accountDetails;
    // if(acno in dataset)
    // {
    //     var pass=dataset[acno].password;
    //     if(password==pass)
    //       {
    //         this.currentuser=dataset[acno].name;
    //         this.saveDetails();
    //         alert("login Successful");
    //         return true;
    //      }
    //     else
    //     {
    //       alert("Invalid password");
    //       return false;
    //     }
    // }
    // else{
    //   alert("User does not exist with provided account number");
    //   return false;
    // }
  }

  // authenticate(acno:any,pass:any)
  // {
  //   var data=this.accountDetails;
  //   if (acno in data)
  //   {
  //       if (pass == data[acno].password)
  //           {
  //               return 0; //valid credential
  //           }
  //       else

  //           {return 1;} //invalid pwd
  //   }
  //   else {
  //      return -1; //invalid accnumber
  //   }
  // }

 
  withdraw(accno:any,pass:any,amount:any)
  {
    const data={
      accno,
      pass,
      amount
    }
    return this.http.post(environment.apiUrl+"/withdraw",data,options)
    
  }

  deposit(accno:any,pass:any,amount:any)
  {
    const data={
      accno,
      pass,
      amount,
    }
    return this.http.post(environment.apiUrl+"/deposit",data,options);
    
  }

deleteAccDetails(acno:any){
  return this.http.delete(environment.apiUrl+"/deleteAccDetails/"+acno,options);
}
  
}
