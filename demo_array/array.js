// Declaration
var Myarray = [];
myString="";


Array.prototype.eltidxOf = function arrayObjectIndexOf(property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
}


// --- Init a simple Array and Read It ---
console.log('-01- Init Array and Read It');
var testdata=['value01','value02','value03'];
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


// --- Init a complex Array and Read It ---
console.log('-02- Init Named Array and Read It');  
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s  Description : %s', testdata[i].value,testdata[i].description)
}


//--- Add elements into existing Simple Array (push) ---
console.log('-03- Add elements into existing Simple Array');
testdata=['value01','value02','value03'];
testdata.push('value04','value05');
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


// --- Add elements into existing complex Array (push) ---
console.log('-04- Add elements into existing Named Array');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
testdata.push({value:'val04',description:'desc04'},{value:'val05',description:'desc05'});
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s  Description : %s', testdata[i].value,testdata[i].description)
}


//--- Remove Last elements from an existing Simple Array (pop)  ---
console.log('-05- Remove Last elements from existing Simple Array');
testdata=['value01','value02','value03'];
testdata.pop();
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


//--- Remove Last elements from an existing complex Array (pop)  ---
console.log('-06- Remove Last elements from existing Named Array');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
testdata.pop();
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s  Description : %s', testdata[i].value,testdata[i].description)
}


//--- Remove First elements from an existing Simple Array (shift)  ---
console.log('-07- Remove First elements from existing Simple Array');
testdata=['value01','value02','value03'];
testdata.shift();
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


//--- Remove First elements from an existing complex Array (shift)  ---
console.log('-08- Remove First elements from existing Named Array');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
testdata.shift();
for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s  Description : %s', testdata[i].value,testdata[i].description)
}


//--- Concat Simple Array (concact)  ---
console.log('-09- Merge two Simple Arrays (concact)');
testdata=['value01','value02','value03'];
testdata2=['value04','value05'];

testdata = testdata.concat(testdata2);

for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


//--- Concat Complexe Array (concact)  ---
console.log('-10- Merge two Named Arrays (concact)');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
testdata2=[{value:'val04',description:'desc04'},{value:'val05',description:'desc05'}];

var mergedArray = testdata.concat(testdata2);

for (i = 0; i < mergedArray.length; i++) {
	console.log('Value : %s  Description : %s', mergedArray[i].value,mergedArray[i].description)
}


//--- Search for an element into a simple Array (indexOf())  ---
console.log('-11- Search for an element into a Simple Array (indexof())');
testdata=['value01','value02','value03'];

var myPosition = testdata.indexOf('value02');
console.log('Position of value02 : %s', myPosition)


//--- Search for an element into a named Array (indexOf()) (see array.prototype)  ---
console.log('-12- Search for an element into a Named Array (array.prototype.eltidxOf())');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];

var myPosition = testdata.eltidxOf('description','desc03');
console.log('Position of value = desc03 : %s', myPosition)

//--- Position Returned when not found (indexOf())  ---
console.log('-13- Position Returned when not found (indexOf()');
testdata=['value01','value02','value03'];

var myPosition = testdata.indexOf('toto');
console.log('Position of toto : %s', myPosition)


//--- Insert an element between two element into a simple Array splice()  ---
console.log('-14- Insert an element between two element into a Simple Array splice()');
// array.splice(index,howmany,item1,.....,itemX)
testdata=['value01','value02','value03'];
testdata.splice(1, 0, "valu01.5");

for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


//--- Insert an element between two element into a Complexe Array splice()  ---
console.log('-15- Insert an element between two element into a Named Array splice()');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
testdata.splice(1,0,"value:'val02.33',description:'desc02.33'");

for (i = 0; i < mergedArray.length; i++) {
	console.log('Value : %s  Description : %s', mergedArray[i].value,mergedArray[i].description)
}


//--- Remove an element from a simple Array splice()  ---
console.log('-16- Remove an element from a Simple Array splice()');
// array.splice(index,how many,item1,.....,itemX)
testdata=['value01','value02','value03'];
testdata.splice(1,1);

for (i = 0; i < testdata.length; i++) {
	console.log('Value : %s', testdata[i])
}


//--- Remove an element from a Named Array splice()  ---
console.log('-17- Remove an element from a Named Array splice()');
testdata=[{value:'val01',description:'desc01'},{value:'val02',description:'desc02'},{value:'val03',description:'desc03'}];
testdata.splice(1, 2);

for (i = 0; i < mergedArray.length; i++) {
	console.log('Value : %s  Description : %s', mergedArray[i].value,mergedArray[i].description)
}


// --- Convert to String ---
console.log('-16- Convert to String');
testdata=['value01','value02','value03'];
myString = testdata.toString();
console.log('MyString : %s',myString);