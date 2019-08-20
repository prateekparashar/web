function Get_Data() 
{  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); 
  var allLinks = sheet.getRange(2, 1, 1357).getValues();
  var subScrape = '<span class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip" title="';
   for(y = 1294; y < 1357; y++)
   {
     var fillCell = y+2;
     var link = allLinks[y];
     var subs = Scrape(link,subScrape);
     var subCheck = numCheck(subs)
     if(subCheck == "False")
      {vidLink(link,fillCell,subScrape,sheet);}
     else
      {chanSub(fillCell,subs,sheet,link);}
    }
}


function Scrape(link,text) {
    var url = link;
    var fromText = text;
    var toText = '"';  
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    Logger.log(scraped);
    return scraped;
}


function chanSub(fillCell,subs,sheet,cl)
{
  if(numCheck(subs) == "True")
    {sheet.getRange(fillCell,2).setValue(subs);}
  else
    {sheet.getRange(fillCell,2).setValue(0);}
  setPageLinks(fillCell,sheet,cl);
}


function vidLink(link,fillCell,subScrape,sheet)
{
  var chanUrl = '<a href="/channel/';
  var chanLink = Scrape(link,chanUrl);
  if (chanLink.substring(1,2) != "C")
    {
      sheet.getRange(fillCell,2).setValue("Video Not Available");      
    }
  else
    {
      var cl = "http://www.youtube.com/channel/"+chanLink;
      var subs = Scrape(cl,subScrape);
      chanSub(fillCell,subs,sheet,cl);
    }
}


function setPageLinks(fillCell,sheet,link)
{
  var fb = "facebook.com/";
  var tw = "twitter.com/";
  var ins = "instagram.com/";
  var pin = "pinterest.com/";
  var lin = "linkedin.com/";
  
  sheet.getRange(fillCell,3).setValue(getPageLinks(fb,link));
  sheet.getRange(fillCell,4).setValue(getPageLinks(tw,link));
  sheet.getRange(fillCell,5).setValue(getPageLinks(ins,link));
  sheet.getRange(fillCell,6).setValue(getPageLinks(pin,link));
  sheet.getRange(fillCell,7).setValue(getPageLinks(lin,link));
}


function getPageLinks(ln,link)
{
  var prefix = "http://www."+ ln;
  var suffix = Scrape(link,ln);
  var full = encodeURI(ln + suffix);
  var res = UrlFetchApp.fetch(full,{muteHttpExceptions: true}).getResponseCode();
  var url = prefix + suffix;
  if((res == 200 || res == 999) && url != "http://www.pinterest.com/E html><html lang=")
    {return url;}
  else
    {return "";}
}


function latestVideo()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); 
  var allLinks = sheet.getRange(2, 1, 1357).getValues();
  var subScrape = '<span class="yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip" title="';
   for(y = 1; y < 10; y++)
   {
     var fillCell = y+2;
     var link = allLinks[y];
     var subs = Scrape(link,subScrape);
     var subCheck = numCheck(subs)
     if(subCheck == "False")
       {sheet.getRange(fillCell, 8)}
      //{vidLatest(link,fillCell,subScrape,sheet);}
     else
      {chanLatest(fillCell,subs,sheet,link);}
    }
}


function chanLatest(fillCell,subs,sheet,link)
{
  var vidLn = link + "/videos";
  var text = "<li>:"
  var text2 = "ago<";
  var ls = Scrape2(vidLn,text,text2);
  
  sheet.getRange(fillCell,8).setValue(ls);
}



function Scrape2(link,text,text2) {
    var url = link;
    var fromText = text;
    var toText = text2;  
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    Logger.log(scraped);
    return scraped;
}


function numCheck(y) 
{
  if(!isNaN(parseFloat(y)))
    {return "True";}
  else
    {return "False";}
}