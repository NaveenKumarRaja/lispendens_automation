const {test,expect} = require('@playwright/test');

test('Case Search', async({page}) => {
  await page.goto('https://core.duvalclerk.com/CoreCms.aspx');
  await page.type("id=c_UsernameTextBox", "sean@ozellrealestate.com");
  await page.type("id=c_PasswordTextBox", "RealEstate45!");
  const buttonClick = await page.click('[value="Login to CORE"]');
  //.type('16-2022-CA-002005-XXXX-MA') re -( 16-2012-CA-013026-XXXX-MA )
  const cli = await page.locator("tr td.caseSearchFieldInput input >> nth=0").type('16-2022-CA-002005-XXXX-MA');
  await page.click('[value="Open Case"]');
  let divTagName = await page.$$('[class="caseDisplayTable caseSummary"]');
  console.log("div tag "+divTagName.length);
  if(divTagName.length == 0){
    const caseStatus = await page.$$("div table tbody tr td:has-text('Case Status')");
    console.log(caseStatus.length);
    // //*[@id="ContentPlaceHolder1_WebTab1"]/div/div[5]/div/div[1]/table/tbody/tr[2]/td[2]
    var openStatus = await page.$$(":is(div[class='caseDisplayTable caseSummary'] table tbody tr td:has-text('RE-OPEN'))");
    console.log(openStatus[0].innerText);
    
  }
  
})
