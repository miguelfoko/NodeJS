var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());



app.post('/charge', function (req, res) {
 
    console.log(req.body.token);
	var token = req.body.token;//.body.token; // Using Expres
	var amount=parseInt(req.body.amount);
	var carNumber=req.body.userCard;
	var userMail=req.body.userMail;
	var secret=req.body.secret;
	var stripe = require("stripe")(secret);
 
	/* stripe.transfers.create({
	  amount: 400,
	  currency: "usd",
	  destination: "acct_1ALrqIFE1A2PIX7H",
	  transfer_group: "ORDER_95"
	}, function(err, transfer) {
	   if(err)
			   console.log('error: ',err)
		   else{
			   console.log('success: ',res);
			   res.send({success:true})
		   }
	});  */
	stripe.charges.create({
	  amount: amount,
	  currency: "eur",
	  source:token.id, // obtained with Stripe.js "tok_1ABxSjI6UHL0Mvw5U3MAfAKZ"
	  description: 'Name of Sender: '+token.card.name+', Last four digit of the Card Number of Sender: '+token.card.last4,
	  receipt_email:userMail, 
	}, function(err, charge) {
		if(err)
			   console.log('error: ',err)
		   else{
			   console.log('success: ',res);
			   res.send({success:true})
		   }
	});  
	//console.log('just spend 20 for noreason 1 ', res);
	//res.send('just spend 20 for noreason 2')
		
}
)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})