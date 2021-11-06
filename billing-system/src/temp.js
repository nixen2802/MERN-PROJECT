var randomnumber = Math.floor(Math.random() * (1001));
console.log(randomnumber)
var bills=[{"name": "Temp"},{"name": "Temp2"}]
for(let i=0;i<bills.length;i++)
{
    bills[i].bill_no=randomnumber;
    console.log(bills[i])
}
