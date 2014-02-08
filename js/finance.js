/**
 * Ficheiro javascript com um conjunto de rotinas financeiras
 */

var Finance={};
Finance.House=function(tan,valini,mesval){
	this.tan=tan/100;
	this.valini=valini;
	this.mesval=mesval;
};

Finance.House.prototype.printMonths=function(){
	var resto=this.valini;
	var desc;
	var juro;
	var men;
	var tot=0;
	var totjuro=0;
	var nmeses=0;
	while(resto>0){
		juro=(resto*this.tan)/12;
		if(this.mesval<(resto+juro)){
			desc=this.mesval-juro;
			men=this.mesval;
			resto-=desc;
		}
		else{
			desc=resto-juro;
			men=resto+juro;
			resto=0;
		}
		tot+=men;
		totjuro+=juro;
		nmeses++;
		console.log("Mensalidade: "+men+"€");
		console.log("Juro: "+juro+"€");
		console.log("Desconto: "+desc+"€");
		console.log("Resto: "+resto+"€");
		console.log("_______________________________________________________");
		
	}
	console.log("Total Pago: "+tot+"€");
	console.log("Total Juro: "+totjuro+"€");
	console.log("Numero de meses: "+nmeses);
}