//Este ficheiro tem como requisito o js.js
//Este script tem as funcionalidades para criação de gráficos de dados, aka Charts
//

/**
 * Objecto que representa o gráfico de dados
 * @author Balhau
 */


BLauLib.BChart=function(id,dimx,dimy,ox,oy){
	this.canvas=$$('canvas');
	this.canvas.id=id;
	this.canvas.width=BLauLib.isUndefined(dimx)?BLauLib.BChart.DIMX:dimx;
	this.canvas.height=BLauLib.isUndefined(dimy)?BLauLib.BChart.DIMY:dimy;
	this.ox=ox;
	this.oy=oy;
	this.ctx=this.canvas.getContext("2d");
	this.data=null;
};

BLauLib.BChart.DIMX=500;
BLauLib.BChart.DIMY=300;

BLauLib.BChart.prototype.setData=function(data){
	this.data=data;
};

/**
 * Método que desenha uma seta
 * @param ctx Contexto do canvas
 * @param xi X inicial
 * @param yi Y inicial
 * @param xf X final
 * @param yf Y final
 */
BLauLib.BChart.drawArrow=function(ctx,xi,yi,xf,yf){
	var vd=new BLauLib.Vector2D(xf-xi,yf-yi);
	var sm=vd.simetrico();
	var mg=vd.magnitude();
	sm.MEscalar(10/mg);
	ctx.moveTo(xi,yi);
	sm.rotate(BLauLib.Math.DegToRad(25));
	ctx.lineTo(xf,yf);
	ctx.lineTo(xf+sm.x,yf+sm.y);
	ctx.moveTo(xf,yf);
	sm.rotate(BLauLib.Math.DegToRad(-50));
	ctx.lineTo(xf+sm.x,yf+sm.y);
};
/**
 * Método que efectua a construção de um gráfico de barras
 * @param data Array com os dados a serem representados no gráfico
 * @param seg Segundos de animação
 * @return void 
 */
BLauLib.BChart.prototype.drawBar=function(data,seg,cor){
	this.clear();
	BLauLib.BChart.drawBars(this.canvas.getContext("2d"),this.ox,this.oy,this.canvas.width,this.canvas.height,data,seg,cor);
};

/**
 * Limpa o canvas
 * @return void
 */
BLauLib.BChart.prototype.clear=function(){
	var ctx=this.canvas.getContext("2d");
	ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
};

/**
 * Procedimento estático que efectua a construção de um gráfico de barras
 * @param ctx context2d
 * @param ox Origem em X
 * @param oy Origem em Y
 * @param wdc Comprimento
 * @param hgc Altura
 * @param dt Dados
 * @param seg Segundos de animação
 * @param cori Propriedades de cor
 * @return void
 */
BLauLib.BChart.drawBars=function(ctx,ox,oy,wdc,hgc,dt,seg,cori){
	var seg=BLauLib.isUndefined(seg)?1:seg;
	var ym=0;
	var wd=3*wdc/5;
	var hg=7*hgc/9;
	ctx.strokeStyle="rgba(200,200,200,1)";
	ctx.strokeRect(0,0,wdc,hgc);
	var data=dt.clone(true);
	for(var i=0;i<data.length;i++){
		if(data[i][1]>ym){
			ym=data[i][1];
		}
	}
	var dy=hgc/data.length;
	var dx=wdc/data.length;
	var facty=hg/ym;
	var spc=2;
	var factx=wd/(data.length*2);
	var ofxl=3.1*wdc/5+dx;
	var ofyl=(3*hgc/5)-data.length*(hgc/25);
	var ofxl2=wdc/6;
	var steps=16*seg;
	var step=0;
	var offxl=wd/7;
	var pass=5;
	var offxLeg=15;
	var gradient;

	//Construção da legenda
	for(var i=0;i<data.length;i++){
	    var r=BLauLib.isUndefined(cori)?(Math.floor(Math.random()*256)):cori[0];
		var g=BLauLib.isUndefined(cori)?(Math.floor(Math.random()*256)):cori[1];
		var b=BLauLib.isUndefined(cori)?(Math.floor(Math.random()*256)):cori[2];
	    var cor="rgba("+r+","+g+","+b+",1)";
	    var vs=5;
	    data[i][3]=[r,g,b];
	    ctx.fillStyle=cor;
	    ctx.fillText(data[i][2],ofxl+wdc/100,ofyl+i*(10+vs));
	    ctx.fillText(String.fromCharCode(65+i),ofxl+ofxl2,ofyl+i*(10+vs));
//	    ctx.fillRect(ofxl+150,ofyl+i*(10+vs)-10,10,10);
	    data[i][2]=String.fromCharCode(65+i);
  	}
	
	var interF=function(){//Função de interpolação
		if(step>steps)
			return;
		ctx.clearRect(ox,oy,wd,hg+oy);
		var perc=step/steps;
		var cor="rgba(100,120,100,"+perc+")";
		var stepy=(seg==0)?facty:facty*(step/steps);
		ctx.lineWidth=2;
		ctx.moveTo(ox,oy);
		ctx.lineTo(ox,hg+oy);
		ctx.moveTo(wd,oy);
		ctx.lineTo(wd,hg+oy);
		for(var i=0;i<=pass;i++){
			ctx.strokeStyle="rgba(100,100,100,0.5)";
			ctx.moveTo(ox,hg+oy-(hg*i/pass));
			ctx.lineTo(wd,hg+oy-(hg*i/pass));
			ctx.stroke();
		}
		ctx.lineWidth=1;
		for(var i=0;i<data.length;i++){
			ctx.beginPath();
			ctx.fillStyle="rgba("+data[i][3][0]+","+data[i][3][1]+","+data[i][3][2]+","+perc+")";
			gradient = ctx.createLinearGradient(0,0,0,hg+oy);
			gradient.addColorStop(0, "rgba(255,255,255,0.75)");//white inside  
			gradient.addColorStop(1, "rgba("+data[i][3][0]+","+data[i][3][1]+","+data[i][3][2]+",0.75)");//fade to transparent black outside;
			ctx.fillStyle=gradient;
			ctx.fillRect(ox+(factx+spc)*1.2*i,hg+oy,factx,-data[i][1]*stepy);
			ctx.fillText(data[i][2],ox+(factx+spc)*1.2*i+factx/2-data[i][2].length*2.5,hg+oy+offxLeg);
		}
		step++;
		setTimeout(interF, 16);
	};
	for(var i=0;i<=pass;i++){
		ctx.fillText(i*ym/pass,ox-offxl,hg+oy-(hg*i/pass));
	};
	setTimeout(interF,16);
};

BLauLib.BChart.prototype.getUI=function(){
	return this.canvas;
};