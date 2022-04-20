import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import $ from 'jquery';

function Home(props) {


    function getPhase1FIleName(e) {
        //get the file name
        var fileName = e.target.value;
        //replace the "Choose a file" label
        var current_path = fileName.split("\\").pop();
        $('.custom-file-labelp1').html(current_path);
    }

    function getPhase2FIleName(e) {
        //get the file name
        var fileName = e.target.value;
        //replace the "Choose a file" label
        var current_path = fileName.split("\\").pop();
        $('.custom-file-labelp2').html(current_path);
    }

    function getPhase4FIleName(e) {
        //get the file name
        var fileName = e.target.value;
        //replace the "Choose a file" label
        var current_path = fileName.split("\\").pop();
        $('.custom-file-labelp4').html(current_path);
    }
      
    //   $('#fileUploadp2').on('change',function(){
    //     //get the file name
    //     var fileName = $(this).val();
    //     //replace the "Choose a file" label
    //     var current_path = fileName.split("\\").pop();
    //     $(this).next('.custom-file-labelp2').html(current_path);
    //   })
      
      function CSVToArray(strData, strDelimiter) {
          // Check to see if the delimiter is defined. If not,
          // then default to comma.
          strDelimiter = (strDelimiter || ",");
          // Create a regular expression to parse the CSV values.
          var objPattern = new RegExp((
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
          // Create an array to hold our data. Give the array
          // a default empty first row.
          var arrData = [[]];
          // Create an array to hold our individual pattern
          // matching groups.
          var arrMatches = null;
          // Keep looping over the regular expression matches
          // until we can no longer find a match.
          while (arrMatches = objPattern.exec(strData)) {
              // Get the delimiter that was found.
              var strMatchedDelimiter = arrMatches[1];
              // Check to see if the given delimiter has a length
              // (is not the start of string) and if it matches
              // field delimiter. If id does not, then we know
              // that this delimiter is a row delimiter.
              if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                  // Since we have reached a new row of data,
                  // add an empty row to our data array.
                  arrData.push([]);
              }
              // Now that we have our delimiter out of the way,
              // let's check to see which kind of value we
              // captured (quoted or unquoted).
              if (arrMatches[2]) {
                  // We found a quoted value. When we capture
                  // this value, unescape any double quotes.
                  var strMatchedValue = arrMatches[2].replace(
                  new RegExp("\"\"", "g"), "\"");
              } else {
                  // We found a non-quoted value.
                  var strMatchedValue = arrMatches[3];
              }
              // Now that we have our value string, let's add
              // it to the data array.
              arrData[arrData.length - 1].push(strMatchedValue);
          }
          // Return the parsed data.
          return (arrData);
      }
      
      function CSV2JSON(csv) {
          var array = CSVToArray(csv);
          var objArray = [];
          for (var i = 1; i < array.length; i++) {
              objArray[i - 1] = {};
              for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                  var key = array[0][k];
                  objArray[i - 1][key] = array[i][k]
              }
          }
      
          var json = JSON.stringify(objArray);
          var str = json.replace(/},/g, "},\r\n");
      
          return str;
      }
      
            //   $("#upload").bind("click", function () {
                const getPhase1Data = () => {
                  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
                  if (regex.test($("#fileUpload").val().toLowerCase())) {
                      if (typeof (FileReader) != "undefined") {
                          var reader = new FileReader();
                          reader.onload = function (e) {
                              // console.log(e.target.result);
                              var data = e.target.result;
                              var phrs = "baby";
                              var json =  JSON.parse(CSV2JSON(data));
                              //   console.log(json);
                              var count = 0;
                              var strnt = 0;
                              let words = [];
                              let wphr = "";
      
      
                              $.each(json, function (k, v) {
                                  var phrsarray = v.phrase.split(" ");
                                  for (let i = 0; i < phrsarray.length; i++) {
                                      if(phrsarray[i].length > 1){
                                        //   words.indexOf(phrsarray[i]) == -1 ? words.push(phrsarray[i]) : false;
                                          if(words.indexOf(phrsarray[i]) == -1){
                                            words.push(phrsarray[i])
                                          }
                                      }
                                  }
                              });
      
                              var fin_arr = [];
      
                              $.each(words, function (k, v) {
      
                                  var count = 0;
                                  var strnt = 0;
      
                                  $.each(json, function (k1, v1) {
                                      if((v1.phrase).indexOf(v) !== -1){
                                          // count = v.counts;
                                          strnt += parseInt(v1.volume);
                                          count++;
                                      }
                                  });
                                  var single = {
                                      "Phrase":v,
                                      "Count":count,
                                      "Strength":strnt
                                  };
      
                                  fin_arr.push(single);
                                  // $("#ph1table-data").append(`<tr><td>${v}</td><td>${count}</td><td>${strnt}</td></tr>`);
                              });
      
                              // console.log(fin_arr);
                              JSONToCSVConvertor(fin_arr,"",["Phrase","Count","Strength"]);
                            //   console.log(count,strnt);
                            // alert()
                            window.location.reload();
                          }
                          reader.readAsText($("#fileUpload")[0].files[0]);
                      } else {
                          alert("This browser does not support HTML5.");
                      }
                  } else {
                      alert("Please upload a valid CSV file.");
                  }
              }
      
        //   $(document).on('click','#uploadp2',function(){
            const getPhase2Data = () => {

                  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
                  if (regex.test($("#fileUploadp2").val().toLowerCase())) {
                      if (typeof (FileReader) != "undefined") {
      
                          var reader = new FileReader();
                          reader.onload = function (e) {
      
                              var data = e.target.result;
                              
                              var json =  JSON.parse(CSV2JSON(data));
                              console.log(json[0]);
                              var count = 0;
                              var strnt = 0;
                              // let words = [];
                              let wphr = "";
                              var excld_arr = $("#phrase2-value").val().split("\n");
                              var fin_arr = [];
                              var flds = [];
                              console.log(excld_arr);
      
                              // console.log(json);
      
                              $.each(json, function (k, v) {
      
                                //   flds.indexOf(k) == -1 ? flds.push(k) : false;
                                  if(flds.indexOf(k) == -1){
                                    flds.push(k)
                                  }
      
                                  var incldue_this = true;
      
                                  $.each(excld_arr, function (k1, v1) {
                                      if((v.phrase).indexOf(v1) !== -1){
      
                                          incldue_this = false;
      
                                      }
                                  });
      
                                  if (incldue_this) {
                                      fin_arr.push(v);
                                  }
      
                              });
                              JSONToCSVConvertor(fin_arr,"",flds);
                              window.location.reload();
                          }
                          reader.readAsText($("#fileUploadp2")[0].files[0]);
                      } else {
                          alert("This browser does not support HTML5.");
                      }
                  } else {
                      alert("Please upload a valid CSV file.");
                  }
          }

          const getPhase4Data = () => {

          }
      
          function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
              //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
              var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
              
              var CSV = '';    
              //Set Report title in first row or line
              
              CSV += ReportTitle + '\r\n\n';
      
              //This condition will generate the Label/Header
              if (ShowLabel) {
                  var row = "";
                  
                  //This loop will extract the label from 1st index of on array
                  for (var index in arrData[0]) {
                      
                      //Now convert each value to string and comma-seprated
                      row += index + ',';
                  }
      
                  row = row.slice(0, -1);
                  
                  //append Label row with line break
                  CSV += row + '\r\n';
              }
              
              //1st loop is to extract each row
              for (var i = 0; i < arrData.length; i++) {
                  var row = "";
                  
                  //2nd loop will extract each column and convert it in string comma-seprated
                  for (var index in arrData[i]) {
                      row += '"' + arrData[i][index] + '",';
                  }
      
                  row.slice(0, row.length - 1);
                  
                  //add a line break after each row
                  CSV += row + '\r\n';
              }
      
              if (CSV == '') {        
                  alert("Invalid data");
                  return;
              }   
              
              //Generate a file name
              var fileName = "MyReport_";
              //this will remove the blank-spaces from the title and replace it with an underscore
              fileName += ReportTitle.replace(/ /g,"_");   
              
              //Initialize file format you want csv or xls
              var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
              
              // Now the little tricky part.
              // you can use either>> window.open(uri);
              // but this will not work in some browsers
              // or you will not get the correct file extension    
              
              //this trick will generate a temp <a /> tag
              var link = document.createElement("a");    
              link.href = uri;
              
              //set the visibility hidden so it will not effect on your web-layout
              link.style = "visibility:hidden";
              link.download = fileName + ".csv";
              
              //this part will append the anchor tag and remove it after automatic click
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      

  return(
    <>
            <Navbar />
            <div className="wrapper d-flex align-items-stretch">
                <div className="container phase-ui">
                    <div className="row">
                        <div className="col-lg-12">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="pills-phase1-tab" data-toggle="pill" href="#pills-phase1" role="tab" aria-controls="pills-phase1" aria-selected="true">Phase 1</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="pills-phase2-tab" data-toggle="pill" href="#pills-phase2" role="tab" aria-controls="pills-phase2" aria-selected="false">Phase 2</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="pills-phase3-tab" data-toggle="pill" href="#pills-phase3" role="tab" aria-controls="pills-phase3" aria-selected="false">Phase 4</a>
                            </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-phase1" role="tabpanel" aria-labelledby="pills-phase1-tab">
                                <div className="phase1 border p-4 bg-white shadow">
                                    <h2 className="text-primary">Phase 1</h2>
                                    <div className="input-phase1 mb-4">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Enter CSV Url</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="fileUpload" onChange={getPhase1FIleName}/>
                                                <label className="custom-file-label custom-file-labelp1" htmlFor="fileUpload">Choose file</label>
                                                <button type="button" id="upload" className="btn btn-sm btn-success my-3" onClick={getPhase1Data}>Generate CSV File</button>                            
                                            </div>
                                        </div>                           
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-phase2" role="tabpanel" aria-labelledby="pills-phase2-tab">
                                <div className="phase2 border p-4 bg-white shadow">
                                    <h2 className="text-primary">Phase 2</h2>
                                    <div className="input-phase2 mb-4">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Enter phrase</label>
                                            <textarea type="text" className="form-control" id="phrase2-value" placeholder="enter phrase name"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Enter CSV Url</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="fileUploadp2" onChange={getPhase2FIleName}/>
                                                <label className="custom-file-label custom-file-labelp2" htmlFor="fileUploadp2">Choose file</label>
                                                <button type="button" id="uploadp2" onClick={getPhase2Data} className="btn btn-sm btn-success my-3">Generate CSV File</button>
                                                <div id="dvCSV">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-phase3" role="tabpanel" aria-labelledby="pills-phase3-tab">
                            <div className="phase2 border p-4 mb-5 bg-white shadow">
                                    <h2 className="text-primary">Phase 4</h2>
                                    <div className="input-phase4 mb-4">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                            <label htmlFor="sel_type">Select Type</label>
                                                <select id="sel_type" className="form-control">
                                                    <option selected>Choose type</option>
                                                    <option value="Manual">Manual</option>
                                                    <option value="Automation">Automation</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                            <label htmlFor="sel_Campaigns">Select Campaigns</label>
                                                <select id="sel_Campaigns" className="form-control">
                                                    <option selected>Choose Campaigns</option>
                                                    <option value="Sponsored Products Campaigns">Sponsored Products Campaigns</option>
                                                    <option value="Sponsored Display Campaigns">Sponsored Display Campaigns</option>
                                                    <option value="Sponsored Brands Campaigns">Sponsored Brands Campaigns</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cam_name">Enter Campaign Name</label>
                                            <input type="text" className="form-control" id="cam_name" placeholder="Enter Campaign Name"/>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="daily_budg">Enter Daily Budget</label>
                                                <input type="text" className="form-control" id="daily_budg" placeholder="Enter Daily Budget"/>
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="ad_grp">Enter Ad Group</label>
                                                <input type="text" className="form-control" id="ad_grp" placeholder="Enter Ad Group"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-4">
                                                <label htmlFor="sku">Enter SKU</label>
                                                <input type="text" className="form-control" id="sku" placeholder="Enter SKU"/>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label htmlFor="def_bid">Enter Ad Group Default Bid</label>
                                                <input type="text" className="form-control" id="def_bid" placeholder="Enter Ad Group"/>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label htmlFor="bid">Enter Default Bid</label>
                                                <input type="text" className="form-control" id="bid" placeholder="Enter Default Bid"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-4">
                                                <label htmlFor="mat_type">Select Match Type</label>
                                                <select id="mat_type" className="form-control">
                                                        <option selected>Choose Match Type</option>
                                                        <option value="Broad">Broad</option>
                                                        <option value="Exact">Exact</option>
                                                        <option value="Phrase">Phrase</option>
                                                    </select>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label htmlFor="bid_strg">Select Bidding Strategy</label>
                                                    <select id="bid_strg" className="form-control">
                                                        <option selected>Choose Bidding Strategy</option>
                                                        <option value="Broad">Fixed Bid</option>
                                                        <option value="Exact">Dynamic Bid(downword only)</option>
                                                        <option value="Phrase">Dynamic Bid(Upword only)</option>
                                                    </select>
                                            </div>
                                            <div className="form-group col-lg-4">
                                                <label htmlFor="placement">Select Placement</label>
                                                <select id="placement" className="form-control">
                                                    <option selected>Choose Placement</option>
                                                    <option value="Top Search">Top Search</option>
                                                    <option value="product Search">Product Search</option>
                                                </select>
                                            </div>
                                        </div>
                                      
                                        <div className="form-group">
                                            <label htmlFor="percentage">Enter Percentage</label>
                                            <input type="text" className="form-control" id="percentage" placeholder="Enter Percentage"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Enter CSV Url</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="fileUploadp4" onChange={getPhase4FIleName}/>
                                                <label className="custom-file-label custom-file-labelp4" htmlFor="fileUploadp4">Choose file</label>
                                                <button type="button" id="uploadp4" onClick={getPhase4Data} className="btn btn-sm btn-success my-3">Generate CSV File</button>
                                                <div id="dvCSV">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
       
        </>
  );

}

export default Home;
