var myApp=angular.module('myApp',[]); 

myApp.controller('groupWiseController',['$scope','$http','$window','$q',
function($scope,$http,$window,$q){
  //for radio default//GrossWt //NettWt
   $scope.color = {
        Wt:'NettWt'  
      };
 //default date //bit1.date2
 $scope.bit2 = {
      date2: new Date(),
      date1: new Date()
    }; 
 // $scope.bit1 = {
 //      date1: new Date()
 //    };
   
    // for header
    $http.get('/groupWiseHeaders').success(function(response) {
      console.log(response);
      $scope.header = response;
      $scope.header2 = $scope.header;
    }); 
    
    // for no.of transactions
    $http.get('/groupWisePurchaseTransactions').success(function(response) {
      console.log(response);
      $scope.TransactionPurchase = response;
      // $scope.header2 = $scope.header;
    });

    // for no.of transactions
    $http.get('/groupWiseSalesTransactions').success(function(response) {
      console.log(response);
      $scope.TransactionSales = response;
      // $scope.header2 = $scope.header;
    });

      $scope.GroupWisePreview = function () {
        $scope.purchase = true;
        var fromdate  = new Date(((new Date($scope.bit2.date1).toISOString().slice(0, 23))+"-05:30")).toISOString();
            var  todate= new Date(((new Date($scope.bit2.date2).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
              todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             //alert($scope.color.Wt)
             var  lengthFor = 0;
             var array = [];
              var array1 = [];
      if (Date.parse($scope.bit2.date1) > Date.parse($scope.bit2.date2)) {
         alert("Invalid Date Range!\nFrom Date cannot be after To Date!")

      }else{

              for (let j =0 ,len =  $scope.TransactionSales.length-1 ; j <= len; j++) {
                  console.log($scope.TransactionSales[j].TransactionType)
                  // console.log($scope.Transaction[j].TransactionClass)

                    if($scope.TransactionSales[j].TransactionType == "Valuation"){
                      continue;
                    }
             $http.get('/getGroupWisePreview', {params:{"todate":todate,"fromdate":fromdate,"Wt":$scope.color.Wt,"Transaction":$scope.TransactionSales[j].TransactionType}}).success(function(response){
                    console.log(response);
                for (let n =0 ,len4 = response[0].sort.length-1 ; n <= len4; n++) {
                    if (n==0) {
                      array1.push({
                   'Transaction':response[0].Transaction,
                   'class':response[0].Class,
                   'sort':[{"InvGroupName":response[0].sort[0].InvGroupName,"opgwt":response[0].sort[0].opgwt,"sortOrder":response[0].sort[0].sortOrder} ]
                 })
                    }else{
                      array1[lengthFor].sort.push(  {"InvGroupName":response[0].sort[n].InvGroupName,"opgwt":response[0].sort[n].opgwt,"sortOrder":response[0].sort[n].sortOrder})
                    }
                  }//for n
                  lengthFor ++;
                 
                console.log(array1);
               // $scope.header1 = array1;
                if (lengthFor == len) {
                  $scope.arrayLength = array1.length;
                   array1.push({
                   'Transaction':"SubTotal",
                   'class':"ind",
                   'sort':[]
                 })
      //var loopIteration = 0;
    for (let d =0 ,len6 = array1[0].sort.length-1 ; d <= len6; d++) {
    var total = 0;

     for (let c =0 ,len5 = $scope.arrayLength-1 ; c <= len5; c++) {
            //loopIteration ++;
           // alert("c "+c)
            console.log(array1[c]);
             total   += array1[c].sort[d].opgwt ;
             // a += 10;
            // console.log(a);
            //console.log(array1[c].sort[d].InvGroupName)
          //  console.log(total)
            if(c== len5 ){
                array1[len5+1].sort.push(  {"InvGroupName":array1[c].sort[d].InvGroupName,"opgwt":total,"sortOrder":array1[c].sort[d].sortOrder})
                 
            }//if c
            console.log(array1);
             $scope.header1 = array1;
             if(c == len5 && d == len6 ){
              
             // if ($scope.purchase == true) {
              //  alert("rfghyjkl");
                 // alert(" subtotal 1 "+ array1.length)
                  purchaseData(array1.length)
                   $scope.arrayLength2 = array1.length; 
              //}
             }
                 }//for c
               }//for d
                 // subTotalCal(0,array1.length);
                   //      const timeoutSendResponse = setTimeout(() => {
                   //   // res.json(report1);
                   //    // outwardCal()
                   // //   purchaseData();
     
                   //  }, 100);// timeoutSendResponse
                  
                }
               // array[0].sort.push({"InvGroupName":doc[i]._id.InvGroupName,"opgwt":doc[i].opgwt,"sortOrder":doc[i]._id.sortOrder});
                   
               console.log("resxfghj for "+lengthFor); 
               console.log(response);
          

        })//getGroupWisePreview
  }// for j

  function purchaseData(start) {
   // alert("purchase data");
     lengthFor = start;
  //  var lengthFor1 = 0;
     for (let j =0 ,len =  $scope.TransactionPurchase.length-1 ; j <= len; j++) {
                  // console.log($scope.Transaction[j].TransactionType)
                  // console.log($scope.Transaction[j].TransactionClass)

             $http.get('/getGroupWisePreview', {params:{"todate":todate,"fromdate":fromdate,"Wt":$scope.color.Wt,"Transaction":$scope.TransactionPurchase[j].TransactionType}}).success(function(response){
            
                for (let n =0 ,len4 = response[0].sort.length-1 ; n <= len4; n++) {
                    if (n==0) {
                      array1.push({
                   'Transaction':response[0].Transaction,
                   'class':response[0].Class,
                   'sort':[{"InvGroupName":response[0].sort[0].InvGroupName,"opgwt":response[0].sort[0].opgwt,"sortOrder":response[0].sort[0].sortOrder} ]
                 })
                    }else{
                      array1[lengthFor].sort.push(  {"InvGroupName":response[0].sort[n].InvGroupName,"opgwt":response[0].sort[n].opgwt,"sortOrder":response[0].sort[n].sortOrder})
                    }
                  }//for n
                  lengthFor ++;
                 
                console.log(array1);
                $scope.header1 = array1;
                if (lengthFor == (len+start+1)) {
                 // alert("cvhjklgvhjkl")
                   // $scope.arrayLength
                   // $scope.purchase = false;
                 // subTotalCal(start+1,array1.length);
                   $scope.arrayLength3 = array1.length;
                   array1.push({
                   'Transaction':"SubTotal",
                   'class':"ind",
                   'sort':[]
                 })
      //var loopIteration = 0;
    for (let d =0 ,len6 = array1[0].sort.length-1 ; d <= len6; d++) {
    var total = 0;
// $scope.arrayLength2 
     for (let c =$scope.arrayLength2 ,len5 = $scope.arrayLength3-1 ; c <= len5; c++) {
            //loopIteration ++;
           // alert("c "+c+" d $scope.arrayLength3"+ $scope.arrayLength3)
            console.log(array1[c]);
             total   += array1[c].sort[d].opgwt ;
             // a += 10;
            // console.log(a);
            //console.log(array1[c].sort[d].InvGroupName)
          //  console.log(total)
            if(c== len5 ){
                array1[4].sort.push(  {"InvGroupName":array1[c].sort[d].InvGroupName,"opgwt":total,"sortOrder":array1[c].sort[d].sortOrder})
               // $scope.arrayLength2 = array1.length;   
            }//if c
            console.log(array1);
             $scope.header1 = array1;
             if(c == len5 && d == len6 ){
              
             // if ($scope.purchase == true) {
               // alert("rfghyjkl");
              //   alert(" subtotal 2 "+ array1.length+" 1 "+start);
                 subTotalCal(start,array1.length);
                //  purchaseData(array1.length)
              //}
             }
                 }//for c
               }//for d
  
    

                }
               // array[0].sort.push({"InvGroupName":doc[i]._id.InvGroupName,"opgwt":doc[i].opgwt,"sortOrder":doc[i]._id.sortOrder});
                   
               console.log("resxfghj for "+lengthFor); 
               console.log(response);
          

        })//getGroupWisePreview
  }// for j
    // body...
  }//purchase
           
           function subTotalCal(start,end) {
        // alert("start "+start+" end "+end);
    
   // var array12 = [];
      array1.push({
                   'Transaction':"Closing Stock",
                   'class':"ind",
                   'sort':[]
                 })
      //var loopIteration = 0;
    for (let d =0 ,len6 = array1[0].sort.length-1 ; d <= len6; d++) {
    var total = 0;

     for (let c = 0 ,len5 = end-1 ; c <= len5; c++) {
     //  for (let c = end-1,len5 = end-1 ; c>=0; c--) {
            //loopIteration ++;
            if (c == (start -1)|| c == (end -1)) {
            console.log(array1[c]);
            
            // if (c == (start -1)){
             if (c == (end -1)){
               total   =array1[c].sort[d].opgwt - total ;
             }else{
              total   = array1[c].sort[d].opgwt ;
             }
             //    for (let c = 0 ,len5 = end-1 ; len5>=0; c--) {}
             // for (var i = Things.length - 1; i >= 0; i--) {
             //   Things[i]
             // }
             // a += 10;
            // console.log(a);
            //console.log(array1[c].sort[d].InvGroupName)
          //  console.log(total)
            if(c== len5 ){
              // if(c== len5 ){
                array1[end].sort.push(  {"InvGroupName":array1[c].sort[d].InvGroupName,"opgwt":total,"sortOrder":array1[c].sort[d].sortOrder})
                  
            }//if c
            console.log(array1);
            
             if(c == len5 && d == len6 ){
               $scope.header1 = array1;
              // if ($scope.purchase == true) {
               //  alert("rfghyjkl");
              //     purchaseData(array1.length)
              // }
             }
           }//if c
                 }//for c
               }//for d

           }//subtotalcal
         }//else date condition

    } //GroupWisePreview

}])