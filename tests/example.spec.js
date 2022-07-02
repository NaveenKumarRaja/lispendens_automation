const {test,expect} = require('@playwright/test');

test('Case Search', async({page}) => {
  test.slow();
  await page.goto('https://core.duvalclerk.com/CoreCms.aspx');
  await page.type("id=c_UsernameTextBox", "sean@ozellrealestate.com");
  await page.type("id=c_PasswordTextBox", "RealEstate45!");
  const buttonClick = await page.click('[value="Login to CORE"]');
  //open - ('16-2022-CA-002485-XXXX-MA') re-open -( 16-2012-CA-013026-XXXX-MA ) closed - 16-2019-CA-008735-XXXX-MA
  const cli = await page.locator("tr td.caseSearchFieldInput input >> nth=0").type('16-2022-CA-002485-XXXX-MA');
  await page.click('[value="Open Case"]');
    var closedStatus = page.locator("div[class='caseDisplayTable caseSummary'] >> table >> tbody >> tr >> nth=1 >> td >> nth=1");
    var caseStatus = await closedStatus.textContent();
    if(caseStatus.toString().trim() == "OPEN"){
      console.log("OPEN");
      var summansReturns = await page.locator("div[class='caseDisplayTable'] >> table >> tbody >>tr >> td[class='docketDescription']");
      var countOfDocketDescription = await summansReturns.count();
      var summans = []
      for(var i = 0; i < countOfDocketDescription;i++) {
        const element = await summansReturns.nth(i);
        const innerText = await element.innerText();
        if(innerText.includes("SUMMONS RETURNED INDICATING SERVICE")){
          var summansRemoved = innerText.replace("SUMMONS RETURNED INDICATING SERVICE","").trim();
          var onKeywordRemove = summansRemoved.replace("ON","").trim();
          summans.push(onKeywordRemove);
        }
        
      }
      for( var i = 0; i < summans.length; i++) {
        var splitNameAndDate = summans[i].split(" ");
        var patt1 = /[0-9]/g;
        var patt2 = /[a-zA-Z]/g;
        var defname = [];
        var splitName = "khksj"
        if(splitName == patt2 ){
          console.log(splitName);
        }
        
        var date = summans[i].match(patt1);
        var name = summans[i].match(patt2);
        console.log("name : "+name+" - date :"+date);
      }
      var sorting = summans.sort();
      console.log(sorting);

    }
    
})
