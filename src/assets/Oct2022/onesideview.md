## 0.Locate api key/ secret
# api key and secret can be obtained from this site

```typescript
    https://kite.trade/ 
```
## 1.check validity
# Pay 2000 rs for zerodha 30 day charges and activate the app. 

```typescript
    Validity is for 30 days and for fyers it is free once the account is created.
```
## 2.Get request_token
# login to the zerodha app from the mobile and create the code evry day. Load the api key and get the request token.

```typescript
    https://kite.zerodha.com/connect/login?v=3&api_key=909lcbtyglf6ks4o
```

## 3.Get access_token
# Save the api_key/ secret / request_token and run the program to get the access_token.

```typescript
    save access_token and it is valid for the day
```

## 4.Select the nifty / Banknifty symbols
# This needs to be updated every month.

```typescript
    myinstruments = ["NSE:NIFTY 50", "NFO:BANKNIFTY22OCTFUT"];// change B NIFTY also monthly
```

## 5.Get weekly NIFTY/ BANK Symbols
# Instrument Labels for Nifty and BankNifty need to be updated weekly.

```typescript
    var InstrumentlabelNifty = 'NFO:NIFTY22O20';// FRIDAY BE CAREFUL
    var InstrumentlabelBNifty = 'NFO:BANKNIFTY22O20';// FRIDAY BE CAREFUL
```

## 6.Prepare Array of adjacent symbols
# firstTradeSymbol containes CE and PE for Nifty and BankNifty. Also symbols in short also stored.

```typescript
    firstTradeSymbol.push((InstrumentlabelNifty + (niftyMod + 50).toString() + 'CE'));//0
    ...
    firstTradeSymbol.push((InstrumentlabelNifty + (niftyMod + 550).toString() + 'CE'));//10

    firstTradeSymbol.push((InstrumentlabelNifty + (niftyMod - 50).toString()) + 'PE');//11
    ...
    firstTradeSymbol.push((InstrumentlabelNifty + (niftyMod - 550).toString() + 'PE')); //21

    firstTradeSymbol.push((InstrumentlabelBNifty + (BniftyMod + 100).toString() + 'CE')); //22
    ...
    firstTradeSymbol.push((InstrumentlabelBNifty + (BniftyMod + 1500).toString() + 'CE'));//36

    firstTradeSymbol.push((InstrumentlabelBNifty + (BniftyMod - 100).toString() + 'PE')); //37
    ...
    firstTradeSymbol.push((InstrumentlabelBNifty + (BniftyMod - 1500).toString() + 'PE')); //51

    //TradeSymbol
    TradeSymbol.push(((niftyMod + 50).toString() + 'CE'));//0
    ...
    TradeSymbol.push(((niftyMod + 550).toString() + 'CE'));//10

    TradeSymbol.push(((niftyMod - 50).toString()) + 'PE');//11
    ...
    TradeSymbol.push(((niftyMod - 550).toString() + 'PE')); //21

    TradeSymbol.push(((BniftyMod + 100).toString() + 'CE')); //22
    ...
    TradeSymbol.push(((BniftyMod + 1500).toString() + 'CE'));//36

    TradeSymbol.push(((BniftyMod - 100).toString() + 'PE')); //37
    ...
    TradeSymbol.push(((BniftyMod - 1500).toString() + 'PE')); //51
```

## 7.Load the low and hgh points
# First load valid values in NiftyLow and BNiftyLow in a single cycle.

```typescript
    case 'load B-and-Nifty low':
        kc.getLTP(firstTradeSymbol).then(function (response) {
            //load low
            while (i < 22) {
                NiftyLow[i] = response[firstTradeSymbol[i]].last_price;
                i++;
            }
            while (i < 52) {
                BNiftyLow[x] = response[firstTradeSymbol[i]].last_price;
                i++;
                x++;
            }
            i = 0;
            x = 0;
            timetocontinnue = 'load B-and-Nifty Per';
        }).catch((error) => {
        });
    break;
```
# Next load valid values in NiftyPer and BNiftyPer, check Math.round(Math.max(...NiftyPer)) and only in case of valid values move to next state.

```typescript
    case 'load B-and-Nifty Per':
        kc.getLTP(firstTradeSymbol).then(function (response) {
            while (i < 22) {
                if (response[firstTradeSymbol[i]].last_price < NiftyLow[i]) {
                    NiftyLow[i] = response[firstTradeSymbol[i]].last_price;
                }
                NiftyPer[i] = ((response[firstTradeSymbol[i]].last_price - NiftyLow[i]) / NiftyLow[i] * 100);
                i++;
            }

            while (i < 52) {
                if (response[firstTradeSymbol[i]].last_price < BNiftyLow[x]) {
                    BNiftyLow[x] = response[firstTradeSymbol[i]].last_price;
                }
                BNiftyPer[x] = ((response[firstTradeSymbol[i]].last_price - BNiftyLow[x]) / BNiftyLow[x] * 100);
                i++;
                x++;
            }
            i = 0;
            x = 0;
            if ( Math.round(Math.max(...NiftyPer)) != 0){
                currentsymbol =  TradeSymbol[NiftyPer.indexOf(Math.max(...NiftyPer))].slice(-2);
                Bcurrentsymbol =  TradeSymbol[BNiftyPer.indexOf(Math.max(...BNiftyPer))].slice(-2);
                timetocontinnue = 'After Load';  
            }       
        }).catch((error) => {
        });
    break;
```

# change the symbol - currentsymbol and create correct entry points

```typescript
    case 'After Load':
        kc.getLTP(firstTradeSymbol).then(function (response) {
            //change the symbol - currentsymbol
            if (currentsymbol !== TradeSymbol[NiftyPer.indexOf(Math.max(...NiftyPer))].slice(-2)) {
                if (currentsymbol == 'CE') {
                currentsymbol = 'PE';
                } else {
                currentsymbol = 'CE';
                }
                //if there is a change then clear the NiftyPer because the low is same as response
                while (i < 22) {
                    NiftyLow[i] = response[firstTradeSymbol[i]].last_price;
                    NiftyPer[i] = ((response[firstTradeSymbol[i]].last_price - NiftyLow[i]) / NiftyLow[i] * 100);
                    i++;
                }
                i = 0;
                x = 0;
            }
            console.log('\n', 'NIFTY to ', TradeSymbol[NiftyPer.indexOf(Math.max(...NiftyPer))], Math.round(Math.max(...NiftyPer)),'\n');
            } else {
                //No change in the symbol - currentsymbol, because the profit is increasing in one side.
                while (i < 22) {//0-21
                    //update the NftyLow dring fall
                    if (response[firstTradeSymbol[i]].last_price < NiftyLow[i]) {
                    NiftyLow[i] = response[firstTradeSymbol[i]].last_price;
                    }
                    //update the start value in NiftyHigh during fall
                    if (response[firstTradeSymbol[i]].last_price > NiftyHigh[i]) {
                    NiftyHigh[i] = response[firstTradeSymbol[i]].last_price;
                    }     
                    //upadate the latest percentages         
                    NiftyPer[i] = ((response[firstTradeSymbol[i]].last_price - NiftyLow[i]) / NiftyLow[i] * 100);
                    NiftyHPer[i] = ( NiftyHigh[i] - (response[firstTradeSymbol[i]].last_price ) / NiftyHPer[i] * 100);
                    i++;
                }
            }
            i = 0;
            x = 0;

            //Repeat for BankNifty
            //change the symbol - currentsymbol
            if (Bcurrentsymbol !== TradeSymbol[BNiftyPer.indexOf(Math.max(...BNiftyPer)) + 22].slice(-2)) {
                if (Bcurrentsymbol == 'CE') {
                    Bcurrentsymbol = 'PE';              
                } else {
                    Bcurrentsymbol = 'CE';             
                }
                i = 22;
                x = 0;
                //if there is a change then clear the BNiftyPer because the low is same as response
                while (i < 52) {
                    BNiftyLow[x] = response[firstTradeSymbol[i]].last_price;
                    BNiftyPer[x] = ((response[firstTradeSymbol[i]].last_price - BNiftyLow[x]) / BNiftyLow[x] * 100);
                    i++;
                    x++;
                }
                i = 0;
                x = 0;
                console.log('\n', 'BANKN to ', TradeSymbol[BNiftyPer.indexOf(Math.max(...BNiftyPer)) + 22], Math.round(Math.max(...BNiftyPer)),  '\n');
            } else {
                //No change in the symbol - currentsymbol, because the profit is increasing in one side.
                while (i < 30) {
                     //update the NftyLow dring fall
                    if (response[firstTradeSymbol[i + 22]].last_price < BNiftyLow[x]) {
                        BNiftyLow[x] = response[firstTradeSymbol[i + 22]].last_price;
                    }
                    //update the start value in NiftyHigh during fall
                    if (response[firstTradeSymbol[i + 22]].last_price > BNiftyHigh[i]) {
                        BNiftyHigh[i] = response[firstTradeSymbol[i + 22]].last_price;
                    }
                     //upadate the latest percentages 
                    BNiftyPer[x] = ((response[firstTradeSymbol[i + 22]].last_price - BNiftyLow[x]) / BNiftyLow[x] * 100);
                    BNiftyHPer[i] = ( BNiftyHigh[i] - (response[firstTradeSymbol[i]].last_price ) / BNiftyHPer[i] * 100);
                    i++;
                    x++;
                }
            }
            i = 0;
            x = 0;

            if (Math.round(Math.max(...NiftyPer)) > maxprofitreached ){
                //upadte the maxprofit
                maxprofitreached = Math.round(Math.max(...NiftyPer));
                if (maxprofitreached > 50){
                    //volatality at highest
                    NiftyHighPt = Math.max(...NiftyPer);
                    NiftyLowPt = Math.max(...NiftyHigh) ;
                    //Entry point -1 
                    NiftyHighLow = NiftyPer.indexOf( Math.max(...NiftyPer));
                    //Entry point -2 
                    NiftyLowHigh = NiftyHPer.indexOf( Math.max(...NiftyHigh));
                    //clear myinstruments and update with entry point symbols
                    myinstruments.splice(0,myinstruments.length);
                    myinstruments.push(firstTradeSymbol[NiftyHighLow]); 
                    myinstruments.push(firstTradeSymbol[NiftyLowHigh]); 
                    // go to next state since the targest are defined
                    timetocontinnue = 'NIFTY-enter target';
                }
            }

            if (Math.round(Math.max(...BNiftyPer)) > Bmaxprofitreached ){
                //upadte the maxprofit
                Bmaxprofitreached = Math.round(Math.max(...BNiftyPer));
                //volatality at highest
                if (Bmaxprofitreached > 50){
                    BNiftyHighPt = Math.max(...BNiftyPer);
                    BNiftyLowPt = Math.max(...BNiftyHigh);
                    //Entry point -1 
                    BNiftyHighLow = BNiftyPer.indexOf( Math.max(...BNiftyPer));
                    //Entry point -2
                    BNiftyLowHigh = BNiftyHPer.indexOf( Math.max(...BNiftyHigh));
                    //clear myinstruments and update with entry point symbols
                    myinstruments.splice(0,myinstruments.length);
                    myinstruments.push(firstTradeSymbol[NiftyHighLow] + 21); 
                    myinstruments.push(firstTradeSymbol[BNiftyLowHigh] + 21); 
                    // go to next state since the targest are defined
                    timetocontinnue = 'BNIFTY-enter target';
                }
            }
        process.stdout.write('N:'+ TradeSymbol[NiftyPer.indexOf(Math.max(...NiftyPer))].toString().padEnd(4)  + Math.round(Math.max(...NiftyPer)).toString().padEnd(4) +  maxprofitreached.toString().padEnd(4) +  'B: '+ TradeSymbol[BNiftyPer.indexOf(Math.max(...BNiftyPer)) + 22].toString().padEnd(4) + Math.round(Math.max(...BNiftyPer)).toString().padEnd(4) + Bmaxprofitreached.toString().padEnd(4) +  '\r'); 
    }).catch((error) => {
        
    });
    break;
```

## 8.Wait for 50% volatality
# From the start in a day check nifty and BNifty levels for max volatality and once 50% high from lows is achieved get the entry points

```typescript

    //Entry point -1 
    NiftyHighLow = NiftyPer.indexOf( Math.max(...NiftyPer));
    //Entry point -2 
    NiftyLowHigh = NiftyHPer.indexOf( Math.max(...NiftyHigh));

    //Entry point -1 
    BNiftyHighLow = BNiftyPer.indexOf( Math.max(...BNiftyPer));
    //Entry point -2
    BNiftyLowHigh = BNiftyHPer.indexOf( Math.max(...BNiftyHigh));

```

## 9.Save the high and low point on either sides
# These points are the trigger points and initiate the trade once this value are breached

```typescript

    case 'NIFTY-enter target':
        kc.getLTP(myinstruments).then(function(response) {	
            if (response[myinstruments[0]].last_price > NiftyHighPt ) {
                //Init trade
                console.log('Enter Trade :', myinstruments[0], ' : ',  response[myinstruments[0]].last_price);
                TradeSide = myinstruments[0].slice(-2);
                Tradesymbol = myinstruments[0];
                TradedPrice = response[myinstruments[0]].last_price;
                timetocontinnue = 'BCheck Profit';    
            }else{
            if (response[myinstruments[1]].last_price > NiftyLowPt ) {
                //Init trade
                console.log('Enter opp Trade :', myinstruments[1], ' : ',  response[myinstruments[1]].last_price);
                TradeSide = myinstruments[1].slice(-2);
                Tradesymbol = myinstruments[1];
                TradedPrice = response[myinstruments[1]].last_price;
                timetocontinnue = 'Check Profit';  
            }
            console.log('I am Waiting');
            }            
        }).catch((error) => {
            //console.error(error);
        });
    break;

    case 'BNIFTY-enter target':
        kc.getLTP(myinstruments).then(function(response) {	
          if (response[myinstruments[0]].last_price > BNiftyHighPt ) {
            //Init trade
            console.log('Enter Trade :', myinstruments[0], ' : ',  response[myinstruments[0]].last_price);            
            BTradeSide = myinstruments[0].slice(-2);
            BTradesymbol = myinstruments[0];
            BTradedPrice = response[myinstruments[0]].last_price;
            timetocontinnue = 'BCheck Profit';    
          }else{
            if (response[myinstruments[1]].last_price > BNiftyLowPt ) {
                //Init trade
              console.log('Enter opp Trade :', myinstruments[1], ' : ',  response[myinstruments[1]].last_price);
              BTradeSide = myinstruments[1].slice(-2);
              BTradesymbol = myinstruments[1];
              BTradedPrice = response[myinstruments[1]].last_price;
              timetocontinnue = 'BCheck Profit';    
            }
            console.log('I am Waiting');
          }    
    
        }).catch((error) => {
          //console.error(error);
        });
    break;

```

## 10.Initiate profit trade of 13% when triggered
# Wait for 2 min and then check if the required profit is reached and exit else exit when loss

```typescript

    case 'Check Profit':
        if (twomintracker > 59 ){//59 for 2 sec interval
            kc.getLTP(myinstruments).then(function(response) {	                
                if (response[myinstruments[Tradesymbol]].last_price > TradedPrice ) {
                    console.log('In Profit', Math.round(((response[myinstruments[Tradesymbol]].last_price - TradedPrice) / TradedPrice) * 100));
                    if (Math.round(((response[myinstruments[Tradesymbol]].last_price - TradedPrice) / TradedPrice) * 100) - lossper > 13 ){
                        console.log('Exit Trade');
                        //exit at 10% profit
                    }
                }else{
                    //If Loss add the losses
                    console.log('In Loss, Close Trade', Math.round(((TradedPrice - response[myinstruments[Tradesymbol]].last_price) / TradedPrice) * 100)  );
                    //add the losses
                    lossper = lossper + Math.round( ( (TradedPrice - response[myinstruments[Tradesymbol]].last_price) / TradedPrice) * 100)  + 2.5;
                    twomintracker = 0;
                    timetocontinnue = 'NIFTY-enter target';
                }                    
            }).catch((error) => {
            });
        }else{
            //wait for 2 min
          twomintracker++;
        }   
    break;

    case 'BCheck Profit':
        if (twomintracker > 59) {//59 for 2 sec interval
            kc.getLTP(myinstruments).then(function (response) {
            if (response[myinstruments[BTradesymbol]].last_price > BTradedPrice) {
                console.log('In Profit', Math.round(((response[myinstruments[Tradesymbol]].last_price - TradedPrice) / TradedPrice) * 100));
                if (Math.round(((response[myinstruments[Tradesymbol]].last_price - TradedPrice) / TradedPrice) * 100) - lossper > 13) {
                    console.log('Exit Trade');
                    //exit at 10% profit
                }
            } else {
                //If Loss add the losses
                console.log('In Loss, Close Trade', Math.round(((TradedPrice - response[myinstruments[Tradesymbol]].last_price) / TradedPrice) * 100));
                //add the losses
                lossper = lossper + Math.round( ( (TradedPrice - response[myinstruments[Tradesymbol]].last_price) / TradedPrice) * 100) + 2.5;
                twomintracker = 0;
                timetocontinnue = 'BNIFTY-enter target';
            }
            }).catch((error) => {
           
            });
        } else {
          twomintracker++;
        }
    break;

```


### Check the power of compounding
## 10% consistent profit a year makes it 8cr times profit a day
