/*
  Author:
  Description: 
  LastUpdate:on 15-12-23 for common entry msg
*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidationerrormessagesService {
  constructor(private router: Router) { }
  public static CheckPassedStringHaveValidSpecialCharactersOrNot(PassedValue: any) {
    const myJSON = JSON.stringify(PassedValue);
    let result1 = myJSON.indexOf("@@");
    let strresult2 = PassedValue.substring(0, 1);
    if (PassedValue.length > 1) {
      let strresult3 = PassedValue.substring(PassedValue.length - 1);
      if (strresult3 == "@") {
        return " should not have '@' as last character.";
      }
    }
    if (result1 != -1) {
      return " does not allowed '@@' characters.";
    }
    else if (strresult2 == "@") {
      return " should not have '@' as first character.";
    }
    return '';
  }
  public static CheckErrorMsgIsFoundOrNotForValidSpecialCharactersOrNot(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf(" does not allowed '@@' characters.");
    let result2 = myJSON.indexOf(" should not have '@' as first character.");
    let result3 = myJSON.indexOf(" should not have '@' as last character.");
    if (result1 != -1 || result2 != -1 || result3 != -1) {
      return response;
    }
    return '';
  }
  //For Connection String
  public static CheckErrorMsgIsFoundOrNotForConnectionString(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please Provide Server Name!");
    let result2 = myJSON.indexOf("Please Provide Database Name!");
    let result3 = myJSON.indexOf("Please Provide Database User Name!");
    let result4 = myJSON.indexOf("Please Provide Database Password!");
    let result5 = myJSON.indexOf("Please Check Connection String!");
    let result6 = myJSON.indexOf("Please check connection server name & database name!");
    let result7 = myJSON.indexOf("Database is not exists!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1) {
      return response;
    }
    return '';
  }

  //For Session
  CheckErrorMsgIsFoundOrNotForSession(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please provide User Name!");
    let result2 = myJSON.indexOf("Please provide User Type!");
    let result3 = myJSON.indexOf("Please provide Session Token!");
    let result4 = myJSON.indexOf("User not found!");
    let result5 = myJSON.indexOf("Token and Use Name are not valid!");
    let result6 = myJSON.indexOf("Token is expired!");
    let result7 = myJSON.indexOf("Error in page!");
    let result8 = myJSON.indexOf("Record not found!");
    let result9 = myJSON.indexOf("Record already exist!");
    let result10 = myJSON.indexOf("Please enter Table Name!");
    let result11 = myJSON.indexOf("Please select Id");
    let result12 = myJSON.indexOf("Records not found!");
    let result13 = myJSON.indexOf("User limit exceeded!");
    let result14 = myJSON.indexOf("Not permited!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1 || result8 != -1 || result9 != -1 || result10 != -1 ||
      result11 != -1 || result12 != -1 || result13 != -1 || result14 != -1) {
        if (result5 !== -1 || result6 !== -1 || result14 !== -1) {
          Swal.fire({
              title: response,
              text: 'Now! System will redirect to the login page!',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok!',
            }).then((result) => {
              if (result.isConfirmed) {
                  this.router.navigate(['/login']);
              }
          });

    const outsideClickHandler = (event: Event) => {
      const popup = Swal.getPopup();
      if (popup && !popup.contains(event.target as Node)) {
          this.router.navigate(['/login']);
          document.body.removeEventListener('click', outsideClickHandler);
      }
    };

    document.body.addEventListener('click', outsideClickHandler);
  } 
      else{
        Swal.fire(response);
        return;
      }
    }
  }

  //For Validation
  public static CheckErrorMsgIsFoundOrNotForValidations(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Limit exceeding for ");
    let result2 = myJSON.indexOf("cors text not allowed!");
    let result3 = myJSON.indexOf("should not be only numeric!");
    let result4 = myJSON.indexOf("should be numeric!");
    let result5 = myJSON.indexOf("Please select ");
    let result6 = myJSON.indexOf(" should be zero or one!");
    let result7 = myJSON.indexOf("Special characters are not allowed in ");
    let result8 = myJSON.indexOf("Value was either too large or too small for");
    let result9 = myJSON.indexOf("mail is not valid!");
    let result10 = myJSON.indexOf("Record already exist!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1 || result8 != -1|| result9 != -1|| result10 != -1) {
      return response;
    }
    return '';
  }

  //For Login
  public static CheckErrorMsgIsFoundOrNotForLogin(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please provide Username!");
    let result2 = myJSON.indexOf("Please provide Password!");
    let result3 = myJSON.indexOf("Please check Username and Password! Username and password should be in proper case!");
    let result4 = myJSON.indexOf("Please provide correct credentials!");
    let result5 = myJSON.indexOf("Username and Password are incorrect!");
    let result6 = myJSON.indexOf("Username is incorrect!");
    let result7 = myJSON.indexOf("Password is incorrect!");
    let result8 = myJSON.indexOf("Error in page!");
    let result9 = myJSON.indexOf("Something went wrong!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1 || result8 != -1 || result9 != -1) {
      return response;
    }
    return '';
  }

  //For UserCredencials
  public static CheckErrorMsgIsFoundOrNotForUserCredencials(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Mobile no should have 10 digit!");
    let result2 = myJSON.indexOf("Password length should be greater than 8 character!");
    let result3 = myJSON.indexOf("At least one upper case character to be included in password!");
    let result4 = myJSON.indexOf("At least one lower case character to be included in password!");
    let result5 = myJSON.indexOf("At least one number to be included in password!");
    let result6 = myJSON.indexOf("At least one special character in password!");
    let result7 = myJSON.indexOf("Please enter Name of Person!");
    let result8 = myJSON.indexOf("Please enter User Name!");
    let result9 = myJSON.indexOf("Please enter Password!");
    let result10 = myJSON.indexOf("Please select User Type!");
    let result11 = myJSON.indexOf("Please enter Mobile No!");
    let result12 = myJSON.indexOf("Please enter Mail Id!");
    let result13 = myJSON.indexOf("Please enter Employee No!");
    let result14 = myJSON.indexOf("Please select User Designation!");
    let result15 = myJSON.indexOf("Please select User Group!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1
      || result8 != -1 || result9 != -1 || result10 != -1 || result11 != -1 || result12 != -1 || result13 != -1 || result14 != -1 || result15 != -1) {
      return response;
    }
    return '';
  }

  //For KPIBoxSetting
  public static CheckErrorMsgIsFoundOrNotForKPIBoxSetting(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please enter Header Font Size!");
    let result2 = myJSON.indexOf("Please enter Header Font Color!");
    let result3 = myJSON.indexOf("Please enter Value Font Size!");
    let result4 = myJSON.indexOf("Please enter Box Icon Height!");
    let result5 = myJSON.indexOf("Please enter Box Icon Width!");
    let result6 = myJSON.indexOf("Please enter Box Height!");
    let result7 = myJSON.indexOf("Please enter Box Width!");
    let result8 = myJSON.indexOf("Please enter Boxes Per Page!");
    let result9 = myJSON.indexOf("Please enter Refresh Rate!");
    let result10 = myJSON.indexOf("Header Font Color should not be only numeric!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1 || result8 != -1 || result9 != -1 || result10 != -1) {
      return response;
    }
    return '';
  }

  //For TrendSetting
  public static CheckErrorMsgIsFoundOrNotForTrendSetting(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please enter Header Font Size!");
    let result2 = myJSON.indexOf("Please enter Header Font Color!");
    let result3 = myJSON.indexOf("Please enter Refresh Rate!");
    let result4 = myJSON.indexOf("Please enter Live Trend Time!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1) {
      return response;
    }
    return '';
  }

  //For CommonSetting
  public static CheckErrorMsgIsFoundOrNotForCommonSetting(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please select Type!");
    let result2 = myJSON.indexOf("Please enter Description!");
    let result3 = myJSON.indexOf("Please select Act!");
    let result4 = myJSON.indexOf("Please enter Abbreviation!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1) {
      return response;
    }
    return '';
  }

    //For CustomReport
    public static CheckErrorMsgIsFoundOrNotForCustomReport(response: any) {
      const myJSON = JSON.stringify(response);
      let result1 = myJSON.indexOf("Please select Report Type!");
      let result2 = myJSON.indexOf("Please select Machine!");
      let result3 = myJSON.indexOf("Please select Interval!");
      let result4 = myJSON.indexOf("Please select From Date!");
      let result5 = myJSON.indexOf("Please select To Date!");
      let result6 = myJSON.indexOf("Please select Pdf Status!");
      let result7 = myJSON.indexOf("Record not Found!");
      if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1|| result6 != -1|| result7 != -1) {
        return response;
      }
      return '';
    }

  //For Losses and StdLosses Entry
  public static CheckErrorMsgIsFoundOrNotForLossesEntry(response: any) {
    const myJSON = JSON.stringify(response);
    let result1 = myJSON.indexOf("Please enter Abbreviation!");
    let result2 = myJSON.indexOf("Please select Losses Type!");
    let result3 = myJSON.indexOf("Please select OEE Parameter!");
    let result4 = myJSON.indexOf("Please enter Std Loss Group!");
    let result5 = myJSON.indexOf("Please select Std Loss Group!");
    let result6 = myJSON.indexOf("Please enter Sub Group!");
    let result7 = myJSON.indexOf("Please select Sub Group!");
    let result8 = myJSON.indexOf("Please enter Reason!");
    //let result9 = myJSON.indexOf("Please select Dropdown Option!");
    if (result1 != -1 || result2 != -1 || result3 != -1 || result4 != -1 || result5 != -1 || result6 != -1 || result7 != -1 || result8 != -1) {//|| result9 != -1) {
      return response;
    }
    return '';
  }

}
