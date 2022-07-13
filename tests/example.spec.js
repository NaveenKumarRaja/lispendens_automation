const {test,expect} = require('@playwright/test');

test('Case Search', async({page}) => {
  // var defendentName =[];
  // var summansReturnedDate = [];
  var case_Number = '16-2022-CA-002485-XXXX-MA';
  var list_Of_DefendentName_And_Summans_returnedDate = [];
  await page.goto('https://core.duvalclerk.com/CoreCms.aspx');
  await page.type("id=c_UsernameTextBox", "sean@ozellrealestate.com");
  await page.type("id=c_PasswordTextBox", "RealEstate45!");
  const buttonClick = await page.click('[value="Login to CORE"]');
  //open - ('16-2022-CA-002485-XXXX-MA') re-open -( 16-2012-CA-013026-XXXX-MA ) closed - 16-2019-CA-008735-XXXX-MA
  const cli = await page.locator("tr td.caseSearchFieldInput input >> nth=0").type(case_Number);
  await page.click('[value="Open Case"]');
    var findCaseStatus = page.locator("div[class='caseDisplayTable caseSummary'] >> table >> tbody >> tr >> nth=1 >> td >> nth=1");
    var caseStatus = await findCaseStatus.textContent();
    if(caseStatus.toString().trim() == "OPEN"){
      var findSummansReturns = await page.locator("div[class='caseDisplayTable'] >> table >> tbody >>tr >> td[class='docketDescription']");
      var countOfDocketDescription = await findSummansReturns.count();
      var summans = []
      for(var i = 0; i < countOfDocketDescription;i++) {
        const element = await findSummansReturns.nth(i);
        const innerText = await element.innerText();
        if(innerText.includes("SUMMONS RETURNED INDICATING SERVICE")){
          var summansRemoved = innerText.replace("SUMMONS RETURNED INDICATING SERVICE","").trim();
          var onKeywordRemove = summansRemoved.replaceAll(" ON","").trim();
          if(onKeywordRemove.startsWith("ON")){
            var onKeywordRemove = onKeywordRemove.slice(2).trim();
          }
          summans.push(onKeywordRemove);
        } 
      }
      var open_Case_details = {};
      open_Case_details.case_Number = case_Number;
      for( var i = 0; i < summans.length; i++) {  
        var defendentName_And_Summans_returnedDate = {};
        var splitdate = summans[i].split(/(\d+)/);
        //defendentName.push(splitdate[0].trim());
        defendentName_And_Summans_returnedDate.defName = splitdate[0].trim();
        var removeName = splitdate.shift();
        var getDate = splitdate.toString().replaceAll(",","").replace(" @","").replaceAll("-","/");
        if(getDate.endsWith("PM")){
          var getDate = getDate.replace("PM","").trim();
          var getDate = getDate.concat(" PM");
        }
        else{
          var getDate = getDate.replace("AM","").trim();
          var getDate = getDate.concat(" AM");
        }
        var splitDateAndTime = getDate.split(" ");
        var timeArray = splitDateAndTime[1].split("");
        var time = "";
        if(splitDateAndTime[1].length == 3){
          time = timeArray[0]+":"+timeArray[1]+timeArray[2];
        }
        else if(splitDateAndTime[1].length == 4 && timeArray.includes(":") != true){
          time = timeArray[0]+timeArray[1]+":"+timeArray[2]+timeArray[3];
        }
        else{
          time = splitDateAndTime[1];
        }
        splitDateAndTime[1] = time;
        var dateAndTime = splitDateAndTime[0]+" "+splitDateAndTime[1]+" "+splitDateAndTime[2];
        //summansReturnedDate.push(dateAndTime);
        defendentName_And_Summans_returnedDate.summansReturnedDate = dateAndTime;
        list_Of_DefendentName_And_Summans_returnedDate.push(defendentName_And_Summans_returnedDate);
      }
      open_Case_details.list_Of_DefendentName_And_Summans_returnedDate = list_Of_DefendentName_And_Summans_returnedDate;

    } 
    //console.log(summans)
    //console.log(defendentName);
    //console.log(summansReturnedDate);
    console.log(open_Case_details);
})