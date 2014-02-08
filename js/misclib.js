/**
 * Extensões a objectos de javascript
 * Rotinas de encriptação
 * Funções matemáticas
 * @author Vítor Hugo Fernandes (a.k.a Balhau)
 * @copyright Este documento está licenciado sob os direitos do MIT license
 */

/**
 * Objecto que representa propriedades comuns aos algoritmos
 */
var ALG={};
/**
 * Número de iteracções feitas pelo algoritmo
 */
ALG.ITER=0;
/**
 * Variável que representa a chave secreta gerada pelo algoritmo de Vigénere. Isto ocorre sempre
 * que a chave não é especificada à entrada da função
 */
ALG.VIGSECRETKEY="";

/**
 * Método que troca dois elementos num array
 * @param {int} i Indice da posicao
 * @param {int} j Indice da posicao
 */
Array.prototype.troca=function(i,j){
	if((i<this.length && i>=0) && (j<this.length && j>=0)){
		var aux=this[i];
		this[i]=this[j];
		this[j]=aux;	
	}
};

Array.prototype.classpos=function(el){
	var p;
	for(var i=0;i<this.length;i++){
		p=this[i].pos(el);
		if(p!=-1)
			return i;
	}
	return -1;
}
/**
 * Método que agrupa um array de elementos bidimensionais em classes
 * @return {Array} Array de classes
 */
Array.prototype.groupclasses=function(){
	var grupos=[];
	var volta;
	var exist;
	var dif;
	var par;
	var xu=this.clona();
	while (xu.length > 0) {
		par = xu[0];
		if (par[0] != par[1]) 
			grupos[grupos.length] = par;
		else 
			grupos[grupos.length] = [par[0]];
		xu.remove(0);
		volta=true;
		while (volta) {
			volta=false;
			for (var i = 0; i < xu.length; i++) {
				dif = xu[i].less(grupos[grupos.length - 1]);
				if (dif.length == 1) {
					grupos[grupos.length-1]=grupos[grupos.length - 1].concat(dif);
					xu.remove(i);
					i--;
					volta=true;
				}else if(dif.length==0){
					xu.remove(i);
					i--;
				}
			}
		}
	}
	return grupos;
};

/**
 * Método que devolve um array com os elementos de arrA x arrB (produto de conjuntos)
 * @param {Array} arrA Array de elementos 
 * @param {Array} arrB Array de elementos
 * @return {Array} Array de elementos (a,b) onde a em arrA e b em arrB 
 */
Array.produto=function(arrA,arrB){
	var out=[];
	for(var i=0;i<arrA.length;i++){
		for(var j=0;j<arrB.length;j++){
			out[out.length]=[arrA[i],arrB[j]];
		}
	}
	return out;
}
/**
 * Método que verifica se o array parâmetro é igual ao objecto considerado
 * @param {Array} arrX Array para o qual se pretende testar a igualdade 
 * @return {Boolean} true se arrX é igual ao objecto que invoca o método, false cc
 */
Array.prototype.equal=function(arrX){
	if(this.length!=arrX.length)
		return false;
	for(var i=0;i<this.length;i++){
		if(this[i]!==arrX[i])
			return false;
	}
	return true;
}
/**
 * Verifica se o array fornecido como parâmetro é igual ao objecto que invoca o método
 * independentemente da ordem pela qual aparecem os elementos
 * @param {Array} arrX Array de comparação
 * @return {Boolean} true se arrX tem os mesmos elementos que o objecto que invoca o método,
 * false cc
 */
Array.prototype.nordequal=function(arrX){
	var arx=[];
	var arx=arrX.clona();
	if(this.length!=arrX.length)
		return false;
	for(var i=0;i<this.length;i++){
		if(!arx.has(this[i]))
			return false;
		arx.remove(arx.pos(this[i]));
	}
	return true;
}
/**
 * Devolve uma string com a descrição do conteudo no array
 * @return {String} conteúdo do array
 */
Array.prototype.toString=function(){
	var out="[";
	for(var i=0;i<this.length;i++){
		if(i!=0)
			out+=",";
		out+=this[i].toString();
	}
	out+="]";
	return out; 
};

/**
 * Devolve a diferença de elementos (diferença operação de conjuntos)
 *  entre o array considerado e o que é fornecido.
 * @param {Array} arr Array a subtrair.
 * @return {Array} Array diferença
 */
Array.prototype.less=function(arr){
	var out=[];
	var add;
	for(var i=0;i<this.length;i++){
		add=true;
		for(var j=0;j<arr.length;j++){
			if(this[i]===arr[j])
				add=false;
		}
		if(add)
			out[out.length]=this[i];
	}
	return out;
}

/**
 * Método que efectua a operação and sobre dois arrays. Devolve um array com os elementos
 * que coincidentes para cada posição
 * @param {Array} arrA Array
 * @param {Array} arrB Array
 * @return {Array} Array com os elementos que coincidem
 */
Array.and=function(arrA,arrB){
	var min=Object.min(arrA,arrB);
	var max=Object.max(arrA,arrB);
	var out=[];
	for(var i=0;i<min.length;i++){
		if(min[i]===max[i])
			out[out.length]=min[i];
	}
	return out;
};

/**
 * Verifica se um dado elemento pertence ao array
 * @param {Object} val Elemento que se pretende verificar se pertence ao array
 * @return{Boolean} bol Devolve verdadeiro caso o valor esteja no array, falso caso
 * contrário. 
 */
Array.prototype.has = function(val){
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) 
			return true;
	}
	return false;
};

/**
 * Função que devolve a intersecção entre dois arrays sem levar em conta a posição 
 * dos elementos
 * @param {Array} arrA Array A
 * @param {Array} arrB Array B
 * @return {Array} arrC Array que representa a intersecção de A com B
 */
Array.sAnd=function(arrA,arrB){
	var max=Object.max(arrA,arrB);
	var min=Object.min(arrA,arrB);
	var out=[];
	for(var i=0;i<max.length;i++){
		if( i<min.length){
			if(min.has(max[i]) && !out.has(max[i]))
				out[out.length]=max[i];
			if(max.has(min[i]) && !out.has(min[i]))
				out[out.length]=min[i];
		}
		else{
			if(min.has(max[i]) && !out.has(max[i]))
				out[out.length]=max[i];
		}
	}
	return out;
};



/**
 * Método que remove um elemento do array redimensionando-o
 * @param {int} i Indice do array que pretendemos eliminar
 * @return {Array} arr Devolve o array para efeitos de chaining
 */
Array.prototype.remove=function(i){
	if (i < 0 || i >= this.length) {
		return this;
	}
    this[i]=undefined;
    for(var j=i;j<this.length-1;j++){
    	this[j]=this[j+1];
    }
    this.length=this.length-1;
    return this;
}

Array.prototype.pos=function(el){
	var ip;
	for(var i=0;i<this.length;i++){
		if(this[i]===el)
			return i;
	}
	return -1;
}

/**
 * Extrai um subarray do array cujos valores se compreendem entre os índices indI e indF
 * @param {int} indI Indice inicial
 * @param {int} indF Indice final
 */
Array.prototype.subArray=function(indI,indF){
	var out=[];
	for(var i=indI;i<indF;i++)
		out[i]=this[i];
	return out;
};

/**
 * Método que parte o array em vários sub arrays tendo como base o valor dado
 * como entrada na função
 * @param {Object} val Valor de separação
 * @return {Array} Um array que contém os sub arrays do array original após
 * a divisão pelo elemento fornecido como parâmetro de entrada
 */
Array.prototype.divideBy=function(valor){
	var arrA=[];
	var k=0;
	var j=0;
	var arrAx=[];
	for(var i=0;i<this.length;i++){
		if (this[i] === valor) {
			arrA[k] = arrAx;
			arrAx = [];
			j = 0;
			k++;
		}
		else {
			arrAx[j] = this[i];
			j++;
		}
	}
	return arrA;
};

/**
 * Método para concatenação de arrays
 * @param {Array} arr Array que se pretende concatenar
 * @param {Int} indini indice inicial
 * @param {Int} indfin indice final
 * @return {Array} A concatenação entre os dois arrays
 */
Array.prototype.junta=function(arr,indini,indfin){
	if(typeof(indini)=='undefined')
		indini=0;
	if(typeof(indfin)=='undefined')
		indfin=arr.length;
	var comp=this.length;
	for(var i=comp;i<comp+(indfin-indini);i++)
		this[i]=arr[indini+i-comp];
	return this;
};

var maxit=20;

/**
 * Método estático para implementação do algoritmo de quicksort
 * @param {Array} arr Array que se pretende ordenar
 * @return {Array} arrOrd Array ordenado
 */
Array.qsort = function(arr){
	if(arr.length<=1)
		return arr;
	var part = Math.floor((Math.random()*arr.length));
	var esq=[];
	var dir=[];
	ALG.ITER=0;
	for(var i=0;i<arr.length;i++){
		if(i!=part)
		{
			if(arr[i]<=arr[part])
				esq[esq.length]=arr[i];
			else
				dir[dir.length]=arr[i];
		}
		ALG.ITER++;
	}
	return Array.qsort(esq).junta([arr[part]]).junta(Array.qsort(dir));
};

/**
 * Algoritmo radix sort
 * @param {Array} arr Array para ordenação
 * @return {Object} Array ordenado a partir do algoritmo de radix sort
 */
Array.rsort=function(arr){
	
};


/**
 * Método de ordenação pelo algoritmo de quicksort wrapper do Método estático
 * @return{array} Devolve o array ordenado a partir do algoritmo de quicksort
 */
Array.prototype.qsort=function(){
	ALG.ITER=0;
	return Array.qsort(this);
};

/**
 * Método de ordenação a partir do algoritmo de bublesort
 * @return{Array} Devolve o array ordenado a partir do algoritmo de bublesort
 */
Array.prototype.bsort=function(){
	ALG.ITER=0;
	for(var i=0;i<this.length-1;i++){
		for(var j=0;j<this.length-1-i;j++){
			if(this[j]>this[j+1])
				this.troca(j,j+1);
			ALG.ITER++;
		}
	}
	return this;
};
/**
 * Método que cria um array com valores aleatórios
 * @param {int} dim Dimensão do array
 * @param {int} low Valor minimo
 * @param {int} sup Valor máximo
 * @param {bool} intarray Valor booleano indicando se o array é composto por valores inteiros ou valores decimais
 * @return {int} Array aleatório com dim elementos compreendidos entre low e sup
 */
Array.random=function(dim,low,sup,intarray){
	var arr=[];
	if(typeof(low)=='undefined')
		low=0;
	if(typeof(sup)=='undefined')
		sup=100;
	if(typeof(intarray)=='undefined')
		intarray=true;
	for(var i=0;i<dim;i++){
		if(intarray)
			arr[i]=Math.floor(Math.random()*(sup-low+1)+low);
		else
			arr[i]=Math.random()*(sup-low)+low;
	}
	return arr;
};

/**
 * Método que mistura os elementos de um array
 * @return {Array} arrayRand Devolve o array baralhado
 */
Array.prototype.randomize=function(){
	var fin=0;
	var comp=this.length;
	for(var i=0;i<comp;i++){
		fin=Math.floor(Math.random()*comp);
		this.troca(i,fin);
	}
	return this;
};

/**
 * Método que devolve um array contendo todos os codigos dos caracteres presentes na string
 * @return {Array} arr Array com os codigos dos caracteres
 */
String.prototype.toCodArray=function(){
	var arrC=[];
	for(var i=0;i<this.length;i++){
		arrC[i]=this.charCodeAt(i);
	}
	return arrC;
}

/**
 * Método que converte um nome ocidental para a sua representação japonesa..
 */
String.prototype.toJapName=function(){
	var arr={"a":"ka","b":"tu","c":"mi","d":"te","e":"ku","f":"lu","g":"ji","h":"ri","i":"ki",
			 "j":"zu","k":"me","l":"ta","m":"rin","n":"to","o":"mo","p":"no","q":"ke","r":"shi",
			 "s":"ari","t":"chi","u":"do","v":"ru","w":"mei","x":"na","y":"fu","z":"zi"," ":" "};
	var str="";
	var isto=this.toLowerCase();
		for(var i=0;i<isto.length;i++){
			str+=arr[isto.charAt(i)];
		}
		return str;
}

/**
 * Método que substitui um caracter numa string
 * @param {Number} index Posição do caracter
 * @param {String} chr Caracter de substituição
 */
String.prototype.setCharAt=function(index,chr) {
	if(index > this.length-1) return this;
	return this.substr(0,index) + chr + this.substr(index+1);
}
/**
 * Método que baralha a string de modo a que esta continue legível para o ser humano
 * @param {String} String para conversão 
 */
String.shuffleText=function(str){
	var arr=str.split(" ");
	var tmp="";
	var posA=0;
	var posB=0;
	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr[i].length;j++){
			if(j==0||j==arr[i].length-1)
				;
			else{
				posA=1+Math.floor(Math.random()*(arr[i].length-2));
				posB=1+Math.floor(Math.random()*(arr[i].length-2));
				tmpChar=arr[i][posA];
				arr[i]=arr[i].setCharAt(posA,arr[i][posB]);
				arr[i]=arr[i].setCharAt(posB,tmpChar);
			}
				
		}
	}
	return arr.join(" ");
}


/**
 * Método que cria uma string aleatória com caracteres alfabéticos
 * @param {Int} num Número de caracteres da string
 * @return {String} str String formada por caracteres alfabéticos aleatória
 */
String.prototype.getAlphaRandom=function(num){
	var shift=0;
	var strOut="";
	for(var i=0;i<num;i++){
		shift=Math.floor(Math.random()*26);
		strOut+=String.fromCharCode(65+shift);
	}
	return strOut;
}

/**
 * Método que devolve uma string representando o valor binário do número
 * @return {String} str String representando o número sob a numeração binária
 */
Number.prototype.toByteString=function(){
    if(parseInt(this)==0)
        return "0";
    var aux=parseInt(this);
    var strout="";
    var expaux;
    var getexp=function(val){
        var ii=0;
        while(Math.pow(2,ii)<=val){ii++;}
        if(--ii < 0)
            return 0;
        return ii;
    }
    var expmax=getexp(this);
    var expaux=expmax;
    while(aux>0)
    {
        expmax=getexp(aux);
        aux-=Math.pow(2,expmax);
        expaux=getexp(aux);
        strout+="1";
        if(aux==0 && expmax>=1){
            expmax++;    
        }
        while(--expmax>expaux){
            strout+="0";
        }
    }
return strout;
}

/**
 * Método que devolve um array contendo o código binário da string
 * @return {Array} arr Array contendo strings com a representação binária de cada um dos caractéres da string
 */
String.prototype.toByteArray=function(){
	var arr=[];
	for(var i=0;i<this.length;i++){
		arr[i]=this.charCodeAt(i).toByteString();
	}
	return arr;
}

/**
 * Método que converte uma string para uma outra string que consiste na sequência binária dos caracteres
 * @return {String} str String que contem os caracteres representados em binário concatenados.
 */
String.prototype.toByteString=function(){
	var strout="";
	for(var i=0;i<this.length;i++){
		strout+=this.charCodeAt(i).toByteString();
	}
	return strout;
}

/**
 * Método que verifica se um determinado caracter pertence ao alfabeto
 * @param {String} str String de comprimento 1 representando um caracter
 * @return {Boolean} bol Verdadeiro caso o caracter pertença ao alfabeto
 */
String.isAlphaChar=function(str){
	var m=str.toMaiuscula();
	if(m.length==str.length)
		return true;
	return false;
}

/**
 * Método que passa todas as minusculas a maiusculas
 * @return {String} O método devolve o próprio objecto
 */
String.prototype.toMaiuscula=function(){
	var pos=0;
	var posA=0;
	var str="";
	for(var i=0;i<this.length;i++){
		pos=this.charCodeAt(i);
		if(pos>=97 && pos<=122){
			posA=this.charCodeAt(i)-97;
			str+=String.fromCharCode(65+posA);
		}
		else if(pos>=65 && pos<=122){
			str+=this[i];
		}
		//se for o espaço
		else if(pos==32){
			str+=" ";
		}
	}
	return str;
}

/**
 * Método que verifica se o caracter com determinada posição na string é uma letra maiuscula
 * do alfabeto
 * @param {Int} ind Posição na string
 * @return {Bool} val Verdadeiro se o caracter for uma letra maiuscula, falso caso contrário
 */
String.prototype.maiuscula=function(ind){
	if(this.charCodeAt(ind)>=65 && this.charCodeAt(ind)<=90)
		return true;
	return false;
}

/**
 * Método que verifica se o caracter com determinada posição na string é uma letra minuscula
 * do alfabeto
 * @param {Int} ind Posição na string
 * @return {Bool} val Verdadeiro se o caracter for uma letra minuscula, falso caso contrário
 */
String.prototype.minuscula=function(ind){
	if(this.charCodeAt(ind)>=65 && this.charCodeAt(ind)<=90)
		return true;
	return false;
};

/**
 * @constructor Construtor da class
 */
var MathL=function(){};

/**
 * @constructor Construtor do objecto CMarkov que representa uma cadeia de Markov
 * @param {Array} lstats Lista com os labels dos estados associados à cadeia de markov
 * @param {Array} pobj Representa a matriz de probabilidades da cadeia de markov
 * @param {Array} inip Representa o vector de probabilidades inicial para a cadeia de markov
 */
MathL.CMarkov=function(lstats,pobj,inip){
	if(lstats.length*lstats.length!=pobj.length || lstats.length!=inip.length){
		throw "As dimensões do número de estados não corresponde à dimensão da matriz de probabilidades ou à dimensão do vector de probabilidades iniciais";
	}
	this.lbels=lstats;
	this.mp=MathL.Matriz.ArrayToMatriz(lstats.length,lstats.length,pobj);
	this.auxmit=MathL.Matriz.ArrayToMatriz(1,lstats.length,inip);
	this.initm=MathL.Matriz.ArrayToMatriz(1,lstats.length,inip);
};

MathL.CMarkov.prototype.iterate=function(){
	this.auxmit=MathL.Matriz.multMatriz(this.auxmit,this.mp);
};

MathL.CMarkov.prototype.restart=function(){
	this.auxmit=this.initm;
};

MathL.CMarkov.prototype.printIteration=function(){
	var std="[";
	for(var i=0;i<this.lbels.length;i++){
		if(i!=0)
			std+=",";
		std+=this.lbels[i]+":"+this.auxmit.getValor(0,i);
	}
	std+="]";
	return std;
};
/**
 * Devolve uma string com o valor de n iteracções da cadeia de markov
 * @param {Number} n Número de iteracções a efectuar
 * @return {String} String com as iteracções até n
 */
MathL.CMarkov.prototype.printit=function(n){
	var itres="";
	for(var i=0;i<n;i++){
		this.iterate();
		itres+=this.printIteration()+"\n";
	}
	return itres;
}
/**
 * Método que calcula a raiz de um valor para um dado expoente com uma determinada precisão
 * @param {Object} val Valor do valor na base
 * @param {Object} exp Valor do expoente
 * @param {Object} err Numere de casas de precisão
 */
MathL.sqrtF=function(val,exp,prec){
	if(typeof(prec)=='undefined'){
		prec=3;
	}
	var xi=val/2;
	var xa=val;
	var err=1/Math.pow(10,prec);
	ALG.ITER=0;
	while(Math.abs(xi-xa)>err){
		xa=xi;
		xi=xi-(Math.pow(xi,exp)-val)/(exp*xi);
		ALG.ITER++;
	}
	return xi;
};

/**
 * Método de Simpson para cálculo de integrais
 * @param {Function} f Função que se pretende integrar
 * @param {Number} min Minimo do intervalo de integração
 * @param {Number} max Maximo do intervalo de integração
 * @param {Number} n Número de intervalos
 * @return {Number} Integral de Simpson
 */
MathL.SimpsonInt=function(f,min,max,n){
	n=n*2;
	var sint=f(min);
	var passo=(max-min)/n;
	var fact=0;
	var xi;
	for(var i=1;i<=n;i++){
		//determina o factor para cada iteracção
		fact=(i==n)?1:(i%2==0)?2:4;
		xi=min+passo*i;
		sint+=fact*f(xi);
	}
	return sint*(passo/3);
}
/**
 * Determinação do integral da função f a partir do método do trapézio
 * @param {Function} f Função a integrar
 * @param {Number} min Intervalo minimo de integração
 * @param {Number} max Intervalo máximo de integração
 * @param {Number} n Número de intervalos para integração
 * @return {Number} Integral de f entre min e max
 */
MathL.TrapzInt=function(f,min,max,n){
	var passo=(max-min)/n;
	var strap=f(min);
	var fact;
	var xi;
	for(var i=1;i<=n;i++){
		fact=(i==n)?1:2;
		xi=min+passo*i;
		strap+=fact*f(xi);
	}
	return strap*(passo/2);
}
/**
 * Determina o integral de um intervalo de valores e respectivas imagens a partir do 
 * algoritmo do trapézio
 * @param {Array} arrx array de coordenadas
 * @param {Array} arry array das imagens das coordenadas
 */
MathL.TrapzCInt=function(arrx,arry){
	if(arrx.length!=arry.length)
		return Number.NaN;
	var soma=0;
	for(var i=1;i<arrx.length;i++){
		soma+=(arrx[i]-arrx[i-1])*(arry[i]+arry[i-1]);
	}
	return soma/2;
}
/**
 * Aplica o array a uma função. O resultado consiste nas imagens obtidas a partir da aplicação
 * da função aos elementos do array
 * @param {Function} f Função que mapeia o array
 * @return {Array} Array mapeado pela função f.
 */
Array.prototype.MapF=function(f){
	var arro=[];
	for(var i=0;i<this.length;i++){
		arro[i]=f(this[i]);
	}
	return arro;
}
/***
 * Método que cria um array com os valores entre min e máx
 * @param {Number} min Valor mínimo do intervalo
 * @param {Number} max Valor máximo do intervalo
 * @param {Number} passo Passo entre os sucessivos valores
 * @return {Array}  Array com os valores compreendidos entre min e max.
 */
Array.map=function(min,max,passo){
	var ps;
	if(passo)
		ps=passo;
	else
		ps=1;
	var out=[];
	for(var i=0;i<max;i+=ps){
		out[out.length]=min+i;
	}
	return out;
}

/**
 * Método que determina a distância de Hamming para duas Strings 
 * @param {String} str1 String A
 * @param {String} str2 String B
 * @return {Number} dist Distância entre A e B
 */
MathL.hammingDistance=function(str1,str2){
	var diff=Math.abs(str1.length-str2.length);
	var cmin=Math.min(str1.length,str2.length);
	var hdist=diff;
	for(var i=0;i<cmin;i++){
		if(str1.charAt(i)!=str2.charAt(i))
			hdist++;
	}
	return hdist;
}

/**
 * Objecto matriz disponibiliza um conjunto de métodos para manipular matrizes
 * @param {int} m Numero de linhas
 * @param {int} n Numero de colunas
 * @param {int} val Valor por defeito nos campos da matriz
 * @classDescription Classe que pretende representar uma matriz
 */
MathL.Matriz=function(m,n,val){
	var nlinhas=3;
	var ncolunas=3;
	var valdef=0;
	if(typeof(m)!='undefined')
		nlinhas=m;
	if(typeof(m)!='undefined')
		ncolunas=n;
	if(typeof(val)!='undefined')
		valdef=val;
	this._initVal(nlinhas,ncolunas,valdef);
};

/**
 * Método que devolve a matriz transposta
 * @return {MathL.Matriz} mat Matriz transposta
 */
MathL.Matriz.prototype.transposta=function(){
	var nlinhas=this._matriz.length;
	var ncolunas=this._matriz[0].length;
	var mt=new MathL.Matriz(ncolunas,nlinhas);
	for(var i=0;i<nlinhas;i++){
		for(j=0;j<ncolunas;j++){
			mt.setValor(j,i,this.getValor(i,j));
		}
	}
	return mt;
}

/**
 * Método que devolve a submatriz excluindo a linha i e a coluna j
 * @param {Int} i Índice da linha que se pretende excluir
 * @param {Int} j Índice da coluna que se pretende excluir
 * @return {MathL.Matriz} mt Matriz
 */
MathL.Matriz.prototype.subMatriz=function(i,j){
	var ii=0;
	var jj=0;
	var ik=0;
	var jk=0;
	var m=new MathL.Matriz(this._matriz.length-1,this._matriz[0].length-1);
	for(ii=0;ii<this._matriz.length;ii++){
		jk=0;
		if (ii != i) {
			for (jj = 0; jj < this._matriz[0].length; jj++) {
				if(jj!=j){
					m.setValor(ik,jk,this._matriz[ii][jj]);
					jk++;
				}
			}
			ik++;
		}
	}
	return m;
}

/**
 * Verifica se uma dada matriz é simétrica
 * @return {Boolean} bol Valor booleano indicando se a matriz é simétrica ou não
 */
MathL.Matriz.prototype.simetrica=function(){
	if(this._matriz.length!=this._matriz[0].length){
		return false;
	}
	for(var i=0;i<this._matriz.length;i++){
		for(var j=i;j<this._matriz.length;j++){
			if(this._matriz[j][i]!=this._matriz[i][j]){
				return false;
			}
		}
	}
	return true;
}
/**
 * Determina a matriz das covariâncias
 * @param {Array} Um conjunto de um ou mais arrays com os valores das amostras
 * @return {MathL.Matriz} Matriz das covariâncias
 */
MathL.Matriz.MCov=function(){
	if(arguments.length==0)
		return new MathL.Matriz(1,1,0);
	var nargs=arguments.length;
	var m=new MathL.Matriz(nargs,nargs,0);
	for(var i=0;i<nargs;i++){
		for(var j=0;j<nargs;j++){
			m.setValor(i,j,Array.cov(arguments[i],arguments[j]));
		}
	}
	return m;
}

/**
 * * Método que inicializa a matriz com os campos assinados a um determinado valor
 * @param {Number} valor Valor por defeito na matriz
 * @param {Int} nlinhas Numero de linhas da matriz
 * @param {Int} ncolunas Numero de colunas da matriz
 */
MathL.Matriz.prototype._initVal=function(nlinhas,ncolunas,valor){
	this._matriz=[];
	for(var i=0;i<nlinhas;i++){
		this._matriz[i]=[];
		for(var j=0;j<ncolunas;j++){
			this._matriz[i][j]=valor;
		}
	}
};

/**
 * Devolve uma string com a descrição da matriz
 * @return {String} String representando a matriz
 */
MathL.Matriz.prototype.toString=function(){
	var strO="";
	for(var i=0;i<this._matriz.length;i++){
		strO+="\n|";
		for(var j=0;j<this._matriz[i].length;j++){
			strO+=this._matriz[i][j];
			if(j!=this._matriz[i].length-1)
				strO+=",";
		}
		strO+="|";
	}
	return strO;
};

/**
 * Método que efectua o parsing de um array bidimensional para a estrutura de Matriz
 * @param {array} array Array bidimensional contendo os valores da matriz
 * @return {MathL.Matriz} matriz Objecto do tipo matriz com os valores existentes no array
 */
MathL.Matriz.fromArray=function(array){
	var m=new MathL.Matriz(array.length,array[0].length);
	for(var i=0;i<array.length;i++){
		for(var j=0;j<array[0].length;j++){
			m.setValor(i,j,array[i][j]);
		}
	}
	return m;
};
/**
 * Método que cria um objecto matriz a partir de um array
 * @param {Number} dimx Número de linhas
 * @param {Number} dimy Número de colunas
 * @param {Array} arr Com os valores da matriz sob a forma de array
 * @return {MathL.Matriz} Matriz 
 */
MathL.Matriz.ArrayToMatriz=function(dimx,dimy,arr){
	var mout=new MathL.Matriz(dimx,dimy,0);
	for(var i=0;i<dimx;i++){
		for(var j=0;j<dimy;j++){
			mout.setValor(i,j,arr[i*dimy+j]);
		}
	}
	return mout;
}

/**
 * Método que especifica o valor da matriz na posição (i,j)
 * @param {int} i Indice de linha
 * @param {int} j Indice de coluna
 * @param {Number} val Valor da celula
 */
MathL.Matriz.prototype.setValor=function(i,j,val){
	this._matriz[i][j]=val;
};

/**
 * Método que devolve o valor da matriz na posicao (i,j)
 * @param {int} i Indice de linha
 * @param {int} j Indice de coluna
 * @return {Number} Valor da matriz na celula especificada
 */
MathL.Matriz.prototype.getValor=function(i,j){
	return this._matriz[i][j];
};

/**
 * Método que devolve uma linha da matriz sob a forma de array
 * @param {int} indice Indice da linha
 * @return {array} Array contendo os valores de uma determinada linha
 */
MathL.Matriz.prototype.getLinha=function(indice){
	var arrL=[];
	for(var i=0;i<this._matriz[indice].length;i++){
		arrL[i]=this.getValor(indice,i);
	}
	return arrL;
};

/**
 * Método que efectua a troca entre duas linhas da matriz
 * @param {int} i Índice de linha
 * @param {int} j Índice de linha
 * @return{MathL.Matriz} mat Devolve a matriz para permitir chaining
 */
MathL.Matriz.prototype.trocaLinhas=function(i,j){
	var ii=0;
	var aux;
	var comp=this._matriz[0].length;
	for(ii=0;ii<comp;ii++)
	{
		aux=this._matriz[i][ii];
		this._matriz[i][ii]=this._matriz[j][ii];
		this._matriz[j][ii]=aux;
	}
	return this;
}

/**
 * Método que efectua a troca entre duas colunas da matriz
 * @param {int} i Índice de coluna
 * @param {int} j Índice de coluna
 * @return{MathL.Matriz} mat Devolve a matriz para permitir chaining
 */
MathL.Matriz.prototype.trocaColunas=function(i,j){
	var ii=0;
	var aux;
	var comp=this._matriz.length;
	for(ii=0;ii<comp;ii++)
	{
		aux=this._matriz[ii][i];
		this._matriz[ii][i]=this._matriz[ii][j];
		this._matriz[ii][j]=aux;
	}
	return this;
}

/**
 * Método que adiciona uma coluna à matriz
 * @param  {Array} arr Array com os valores da coluna que se pretende adicionar
 * @return {MathL.Matriz} Devolve o próprio objecto para efeitos de chaining
 */
MathL.Matriz.prototype.adColuna=function(arr){
	if(arr.length!=this._matriz.length){
		return this;
	}
	var coln=this._matriz[0].length;
	for(var i=0;i<this._matriz.length;i++){
		this._matriz[i][coln]=arr[i];
	}
}

/**
 * Método que adiciona linhas à Matriz
 * @param {Array} arr Array com os valores da linha que se pretende adicionar à matriz
 * @return {MathL.Matriz} obj Devolve o próprio objecto para efeitos de chaining
 */
MathL.Matriz.prototype.adLinha=function(arr){
	if(arr.length!=this._matriz[0].length){
		return this;
	}
	var linc=this._matriz.length;
	this._matriz[linc]=[];
	for(var i=0;i<linc;i++){
		this._matriz[linc][i]=arr[i];
	}
}

/**
 * Método que remove uma linha da matriz
 * @param {int} ind indice da linha da matriz que pretendemos ver removido
 * @return {MathL.Matriz} mat O proprio objecto matriz, para chaining
 */
MathL.Matriz.prototype.rmLinha=function(ind){
	if(ind<0 || ind >=this._matriz.length){
		return this;
	}
	this._matriz.remove(ind);
	return this;
};

/**
 * Método que remove uma coluna da matriz
 * @param {Int} ind Índice da matriz que pretendemos remover
 * @return {MathL.Matriz} mat O próprio objecto matriz, para chaining
 */ 
MathL.Matriz.prototype.rmColuna=function(ind){
	if(ind<0 || ind >=this._matriz[0].length){
		return this;
	}
	for(var i=0;i<this._matriz[0].length;i++){
		this._matriz[i].remove(ind);
	}
	return this;
}

/**
 * Método que devolve uma coluna da matriz sob a forma de array
 * @param {int} indice Índice da coluna
 * @return {array} Array contendo os valores de uma determinada coluna
 */
MathL.Matriz.prototype.getColuna=function(indice){
	var arrC=[]
	for(var i=0;i<this._matriz.length;i++){
		arrC[i]=this._matriz[i][indice];
	}
	return arrC;
};

/**
 * Método que cria uma matriz quadrada identidade de dimensões (nxn)
 * @param {int} n Número de linhas
 * @param {int} m Número de colunas
 * @return {MathL.Matriz} Matriz identidade
 */
MathL.Matriz.identidade=function(n,m){
	if(typeof(m)=='undefined')
		m=n;
	var m=new MathL.Matriz(n,m,0);
	for(var i=0;i<n;i++){
		m.setValor(i,i,1);
	}
	return m;
};

/**
 * Método que multiplica uma linha por um determinado valor
 * @param {Int} ind Índice da linha
 * @param {Number} val Valor pelo qual se pretende multiplicar uma linha da matriz
 * @return {MathL.Matriz} mat Objecto para efeitos chaining
 */
MathL.Matriz.prototype.MLinha=function(ind,val){
	if(ind<0 || ind>this._matriz.length){
		return null;
	}
	var ncol=this._matriz[0].length;
	for(var i=0;i<ncol;i++){
		this._matriz[ind][i]*=val;
	}
	return this;
}

MathL.Matriz.prototype.MColuna=function(ind,val){
	if(i<0 || i>this._matriz[0].length){
		return this;
	}
	var nlin=this._matriz.length;
	for(var i=0;i<nlin;i++){
		this._matriz[i][ind]*=val;
	}
	return this;
}

/**
 * Método que adiciona valores a uma linha da matriz
 * @param {Int} ind Índice da linha
 * @param {Array} arrV Array contendo os valores que se pretendem adicionar à matriz
 * @return {MathL.Matriz} mat O próprio objecto para efeitos de chaining
 */
MathL.Matriz.prototype.AddToLinha=function(ind,arrV){
	var ncol=this._matriz[0].length;
	if(arrV.length!=ncol){
		return this;
	}
	for(var i=0;i<ncol;i++){
		this._matriz[ind][i]+=arrV[i];
	}
	return this;
}

/**
 * Método que adiciona valores a uma coluna da matriz
 * @param {Int} ind Índice da coluna
 * @param {Array} arrV Array com os valores a adicionar à coluna
 * @return {MathL.Matriz} mat O próprio objecto para efeitos de chaining
 */
MathL.Matriz.prototype.AddToColuna=function(ind,arrV){
	var nlin=this._matriz.length;
	if(arrV.length!=nlin){
		return this;
	}
	for(var i=0;i<ncol;i++){
		this._matriz[i][ind]+=arrV[i];
	}
	return this;
}


/**
 * Método que efectua a multiplicação de duas matrizes A, B
 * @param {MathL.Matriz} mat1 Matriz A
 * @param {MathL.Matriz} mat2 Matriz B
 * @return {MathL.Matriz} mat3 O resultado da multiplicação das matrizes A,B
 */
MathL.Matriz.multMatriz=function(mat1,mat2){
	if(mat1._matriz[0].length!=mat2._matriz.length)
		return null;
	var ma=new MathL.Matriz(mat1._matriz.length,mat2._matriz[0].length,0);
	var valcel=0;
	for(var i=0;i<mat2._matriz[0].length;i++){
		for(var j=0;j<mat1._matriz.length;j++){
			valcel=0;
			for(var k=0;k<mat1._matriz[0].length;k++){
				valcel+=mat1._matriz[j][k]*mat2._matriz[k][i];
			}
			ma.setValor(j,i,valcel);
		}
	}
	return ma;
};

/**
 * Método que efectua a redução da matriz a triangular inferior
 * @return {MathL.Matriz} mat Devolve a matriz triangular inferior a partir do processo de Gauss Jordan
 */
MathL.Matriz.prototype.RTriangular=function(){
	var k=0;
	var i=0;
	var j=0;
	var laux;
	var colmax=0;
	var nlinhas=this._matriz.length;
	var ncolunas=this._matriz[0].length;
	var inv=MathL.Matriz.identidade(nlinhas,ncolunas);
	var mac=this.clone();
	var auxP;
	//Iteracção sobre as colunas
	for(i=0;i<ncolunas;i++){
		if (i < nlinhas) {
			//Procura a linha com o valor maximo para a dada coluna
			linmax = i;
			for (k = i; k < nlinhas; k++) {
				if (mac._matriz[linmax][i] < mac._matriz[k][i]) {
					linmax = k;
				}
			}
			mac.trocaLinhas(i,linmax);
			//Actualiza as linhas
			for(j=0;j<mac._matriz.length;j++){
				if (j != i) {
					auxP=mac._matriz[j][i];
					//actualiza os valores da linha
					for(k=i;k<mac._matriz[0].length;k++){
						mac._matriz[j][k]+=-mac._matriz[i][k]*(auxP/mac._matriz[i][i]);
					}
				}
			}
		}
	}
	return mac;
}

/**
 * Método que resolve um sistema de equações lineares a partir do algoritmo de eliminação de Gauss
 * @param {MathL.Matriz} mat Matriz de coeficientes
 * @return {MathL.Matriz} matsol Matriz solução do sistema
 */
MathL.Matriz.ResolveSistema=function(mat){
	var ms=mat.RTriangular();
	var j;
	var k;
	var aux;
	var i;
	for(i=ms._matriz.length-1;i>=0;i--){
		if(ms._matriz[i][i]!=0){
			ms.MLinha(i,1/ms._matriz[i][i]);
			for(j=i-1;j>=0;j--){
				aux=ms._matriz[j][i];
				for(k=i;k<ms._matriz[0].length;k++){
					ms._matriz[j][k]+=-ms._matriz[j][k]*(aux/ms._matriz[i][i]);
				}
			}
		}
	}
	var so="{";
	var nlinhas=ms._matriz.length;
	var ncolunas=ms._matriz[0].length;
	var sol;
	for(var i=0;i<ms._matriz.length;i++){
		if (ms._matriz[i][i] != 0) {
			sol = ms._matriz[i][ncolunas - 1] / ms._matriz[i][i];
		}
		else{
			sol=0;
		}
		if(i==0){
			so+='"x'+i+'":'+sol;
		}
		else{
			so+=',"x'+i+'":'+sol;
		}
		
	}
	so+="}";
	return eval('('+so+')');
}

/**
 * Método que devolve a factorização LU da matriz
 * @return {Object} obj Objecto composto por duas matrizes L e U representando
 * a factorização da matriz contida no objecto que efectua a chamada da função.
 */
MathL.Matriz.prototype.FactLU=function(){
	var k=0;
	var i=0;
	var j=0;
	var laux;
	var colmax=0;
	var nlinhas=this._matriz.length;
	var ncolunas=this._matriz[0].length;
	var inv=MathL.Matriz.identidade(nlinhas,ncolunas);
	var U=this.clone();
	var L=MathL.Matriz.identidade(nlinhas,ncolunas);
	var auxP;
	//Iteracção sobre as colunas
	for(i=0;i<ncolunas;i++){
		if (i < nlinhas) {
			//Actualiza as linhas
			for(j=0;j<U._matriz.length;j++){
				if (j != i) {
					auxP=U._matriz[j][i];
					//actualiza os valores da linha
					for(k=i;k<U._matriz[0].length;k++){
						U._matriz[j][k]+=-U._matriz[i][k]*(auxP/U._matriz[i][i]);
						L._matriz[j][k]+=-U._matriz[i][k]*(auxP/U._matriz[i][i]);
					}
				}
			}
		}
	}
	var obj={"L":L,"U":U};
	return obj;
}

/**
 * Método que multiplica a matriz por um determinado valor escalar
 * @param {Number} val Escalar
 * @return {MathL.Matriz} Matriz Devolve a propria matriz para possibilitar o chaining na invocacao
 * dos Métodos
 */
MathL.Matriz.prototype.multEscalar=function(val){
	for(var i=0;i<this._matriz.length;i++)
		for(var j=0;j<this._matriz[0].length;j++)
			this._matriz[i][j]*=val;
	return this;
};

/**
 * Método que efectua o clone do objecto matriz
 * @return {MathL.Matriz} A cópia do objecto matriz
 */
MathL.Matriz.prototype.clone=function(){
	return MathL.Matriz.fromArray(this._matriz);
};

/**
 * Construtor do objecto Vector2D.
 * @param {double} vx
 * @param {double} vy
 * @classDescription Este objecto implementa um objecto que representa vectores de duas dimensões,
 * utilizado para computar operações gráficas no plano
 */
MathL.Vector2D=function(vx,vy){
	this.x=vx;
	this.y=vy;
};

/**
 * Método que faz uma copia do objecto
 * @return {MathL.Vector2D} Objecto do tipo Vectord2D
 */
MathL.Vector2D.prototype.clone=function(){
	return new MathL.Vector2D(this.x,this.y);
};

MathL.Vector2D.prototype.toString=function(){
	return "["+this.x+","+this.y+"]";
}

/**
 * Método que multiplica o vector por um escalar
 * @param {Double} esc Número escalar
 * @return {Vector2D} vec Devolve o próprio vector para permitir chaining
 */
MathL.Vector2D.prototype.multEscalar=function(esc){
	this.x*=esc;
	this.y*=esc;
	return this;
};

/**
 * Método que soma dois vectores
 * @param {MathL.Vector2D} vecA Primeiro Vector2D 
 * @param {MathL.Vector2d} vecB Segundo Vector2D
 * @return {MathL.Vector2D} vecR Vector2D soma resultante
 */
MathL.Vector2D.somaVec=function(vecA,vecB){
	return new MathL.Vector2D(vecA.x+vecB.x,vecA.y+vecB.y);
};
/**
 * Método que efectua o produto interno entre dois vectores 
 * @param {MathL.Vector2D} vecA Primeiro Vector2D
 * @param {MathL.Vector2D} vecB Segundo Vector2D
 * @return {Double} prodint Número representando o produto interno entre dois vectores
 */
MathL.Vector2D.prodInt=function(vecA,vecB){
	return vecA.x*vecB.x+vecA.y*vecB.y;
};

/**
 * Método que devolve a norma de um Vector2D
 * @return {double} num Norma do vector
 */
MathL.Vector2D.prototype.norma=function(){
	return Math.sqrt(this.x*this.x+this.y*this.y);
};
/**
 * Devolve informação sobre o vector sob a forma de string
 * @return {string} str String contendo a descrição do vector
 */
MathL.Vector2D.prototype.toString=function(){
	return "["+this.x+","+this.y+"]";
};



/**
 * Método que devolve o objecto Matriz equivalente ao Vector2D
 * @return {MathL.Matriz}
 */
MathL.Vector2D.prototype.toMatriz=function(){
var vm=new MathL.Matriz(1,2);
vm.setValor(0,0,this.x);
vm.setValor(0,1,this.y);
return vm;	
};

/**
 * Máximo divisor comum a partir do algoritmo de euclides
 * @param {int} a Valor inteiro A
 * @param {int} b Valor inteiro B
 * @return {int} O máximo divisor entre A e B
 */
MathL.mdc=function(a,b){
	ALG.ITER=0;
	if(a==0)
		return b;
	if(b==0)
		return a;
	var ax=Math.max(a,b);
	var bx=Math.min(a,b);
	var m=0;
	if((ax%bx)==0)
		return bx;
	//algoritmo de euclides...
	while(bx!=0){
		ALG.ITER++;
		m=ax%bx;
		ax=bx;
		bx=m;
	}
	return ax;
};

/**
 * Função para o factorial de um numero
 * @param {int} a Numero inteiro
 * @return {int} Factorial de um número
 */
MathL.factorial=function(a){
	var b=Math.abs(a);
	var fact=1;
	for(var i=1;i<=b;i++)
		fact*=i;
	return fact;
};

/**
 * Método que devolve os primos existentes menor que um dado numero n
 * @param {int} n Número máximo dos valores primos
 * @return {Array} Array contendo os valores primos
 */
MathL.PrimosAte=function(n){
	var primos=[1,2];
	var primo;
	for(i=3;i<=n;i++){
		primo=true;
		for(j=1;j<primos.length;j++){
			if(primos[j]>Math.sqrt(i))
				break;
			if((i%primos[j])==0)
				primo=false;
		}
		if(primo)
			primos[primos.length]=i;
	}
	return primos;
};

/**
 * Determina a média dos valores contidos no array, aqui assume-se que o array 
 * é preenchido com valores numéricos
 */
Array.prototype.media=function(){
	var cmp=this.length;
	var m=0;
	for(var i=0;i<cmp;i++)
		m+=this[i];
	return m/cmp;
}

/**
 * Determina a variância dos valores contidos no array
 * @return {Number}
 */
Array.prototype.variancia=function(){
	if(this.length<2)
		return 0;	
	var cmp=this.length;
	var dp=0;
	var md=this.media();
	for(var i=0;i<cmp;i++){
		dp+=(this[i]-md)*(this[i]-md);
	}
	return dp/(cmp-1);
}
/**
 * Determina o desvio padrão dos dados contidos no array
 * @return {Number}
 */
Array.prototype.desPad=function(){
	return Math.sqrt(this.variancia());
}

/**
 * Determina a covariância entre duas amostras representadas sob a forma de 
 * arrays. As duas amostras devem ter a mesma dimensão
 * @param {Array} X Array de valores numéricos
 * @param {Array} Y Array de valores numéricos
 * @return {Number} Valor da covariância entre a amostra X e a amostra Y
 */
Array.cov=function(X,Y){
	if(X.length!=Y.length)
		return 0;
	if(X.length<2)
		return 0;
	var cmp=X.length;
	var xM=X.media();
	var yM=Y.media();
	var c=0;
	for(var i=0;i<cmp;i++){
		c+=(X[i]-xM)*(Y[i]-yM);
	}
	return c/(X.length-1);
}

Array.prototype.soma=function(){
	var s=0;
	var cmp=this.length;
	for(var i=0;i<cmp;i++){
		s+=this[i];
	}
	return s;
}

Array.sub=function(arrA,arrB){
	var mx=Object.max(arrA,arrB);
	var mi=Object.max(arrA,arrB);
	var out=[];
	for(var i=0;i<mx.length;i++){
		if(i<mi.length)
			out[out.length]=arrA[i]-arrB[i];
		else{
			if(arrA[i])
				out[out.length]=arrA[i];
			else
				out[out.length]=-arrB[i];
		}
	}
	return out;
}

Array.prototype.clona=function(){
	var cmp=this.length;
	var out=[];
	for(var i=0;i<cmp;i++)
		out[out.length]=this[i];
	return out;
}

Array.prototype.subE=function(esc){
	var cmp=this.length;
	for(var i=0;i<cmp;i++){
		this[i]=this[i]-esc;
	}
	return this;
}

Array.prototype.somaE=function(esc){
	var cmp=this.length;
	for(var i=0;i<cmp;i++){
		this[i]=this[i]-esc;
	}
	return this;
}

Array.soma=function(arrA,arrB){
	var mx=Object.max(arrA,arrB);
	var mi=Object.max(arrA,arrB);
	var out=[];
	for(var i=0;i<mx.length;i++){
		if(i<mi.length)
			out[out.length]=arrA[i]+arrB[i];
		else{
			if(arrA[i])
				out[out.length]=arrA[i];
			else
				out[out.length]=arrB[i];
		}
	}
	return out;
}



/**
 * Método que devolve os primeiros n primos
 * @param {int} n Numero de primos que pretendemos ver devolvidos
 * @return {Array} arrayPrimos Array com os numeros primos
 */
MathL.PPrimos = function(n){
	if (typeof(n) == 'undefined') 
		n = 20;
	var primos = [1, 2];
	var primo;
	var i=3;
	ALG.ITER=0;
	while (primos.length < n) {
		primo = true;
		for (j = 1; j < primos.length; j++) {
			if (primos[j] > Math.sqrt(i)) 
				break;
			if ((i % primos[j]) == 0) 
				primo = false;
			ALG.ITER++;
		}
		if (primo) 
			primos[primos.length] = i;
		i++;
	}
	return primos;
};

/**
 * Método que devolve o valor de combinações (n,k)
 * @param {int} n Inteiro (n k) --> n
 * @param {int} k Inteiro (n k) --> k
 * @return {int} com Inteiro número de combinações 
 */
MathL.comb=function(n,k){
	var res=1;
	for(var i=1;i<=k;i++){
		res*=(n+1-i)/i;
	}
	return res;
};



var COOkie={};

COOkie.setCookie=function(cookieName,cookieValue,minutos) {
 var today = new Date();
 var expire = new Date();
 if (minutos==null || minutos==0) minutos=1;
 expire.setTime(today.getTime() + 60000*minutos);
 document.cookie = cookieName+"="+escape(cookieValue)
                 + ";expires="+expire.toGMTString();
};


var Crypto=function(){
};
/**
 * Função que implementa a criptografia de Ceaser
 * @param {string} str string a criptografar
 * @param {int} shift Número de deslocamentos
 * @return {string} strC String criptografada
 */
Crypto.cesar=function(str,shift){
	var i;
	var strO="";
	var chcod;
	for(i=0;i<str.length;i++){
		if (str.charAt(i) != " ") {
			chcod = str.charCodeAt(i);
			strO += String.fromCharCode(chcod + shift);
		}
		else
			strO+=" ";
	}
	return strO;
};

/**
 * Método que gera uma chave aleatória de vigénere
 * @param {Int} comp Comprimento da chave
 * @return {String} str A string que representa a chave para o algoritmo de vigénere
 */
Crypto.vigenereRandomKey=function(comp){
	var str="";
	if(typeof(comp)=='undefined'){
		comp=10;
	}
	for(var i=0;i<comp;i++){
		str+=String.fromCharCode(Math.floor(Math.random()*26 + 65));
	}
	return str;
}

/**
 * Criptanalise à cifra de cesar a partir de força bruta
 * @param {String} str string a ser decriptada
 * @param {int} maxiter Maximo de iterações
 * @return {String} strO String contendo as várias tentativas de decriptação a partir de força bruta
 */
Crypto.cesarBruteForceAttack=function(str,maxiter){
	var i;
	var iter=0;
	var strO="";
	while (iter < maxiter) {
		strO+="\n";
		for (i = 0; i < str.length; i++) {
			strO+=String.fromCharCode(str.charCodeAt(i)-iter);
		}
		iter++;
	}
	return strO;
};

/**
 * Ataque por frequências
 * @param {string} str String que se pretende inspeccionar
 * @return {String} strO string contendo a informação sobre as frequências dos vários caracteress
 */
Crypto.frequenceAttack=function(str){
	var tbfreq=[];
	var pos;
	var i;
	var strO="";
	var existeCar=function(car){
		var existe=-1;
		for(var i=0;i<tbfreq.length;i++){
			if(car==tbfreq[i][0])
				existe=i;
		}
		return existe;
	};
	//calcula as frequencias
	for(i=0;i<str.length;i++){
		pos=existeCar(str.charAt(i));
		if(pos==-1){
			tbfreq[tbfreq.length]=[str.charAt(i),1];
		}
		else{
			tbfreq[pos][1]++;
		}
	}
	//devolve os resultados
	var freq=0;
	for(i=0;i<tbfreq.length;i++){
		freq=(tbfreq[i][1]*100)/str.length;
		strO+="\n";
		strO+="Car:|"+tbfreq[i][0]+"|--> "+freq+"%";
	}
	return strO;
};

/**
 * Método que encripta uma string a partir da chave de Vigénere. Este método encripta somente
 * strings que contenham caracteres do alfabeto
 * @param {String} str String a encriptar 
 * @param {String} chave Chave encriptadora
 * @return {String} enc Chave encriptada a partir do algoritmo de vigénere
 * 
 */
Crypto.VEncripta=function(str,chave){
	if(typeof(chave)=='undefined'){
		chave=Crypto.vigenereRandomKey();
		ALG.VIGSECRETKEY=chave;
	}
	else{
		chave=chave.toMaiuscula();
		ALG.VIGSECRETKEY=chave;
	}
	//Se a string a codificar não for válida sai com valor nulo
	if(!String.isAlphaChar(str)){
		return null;
	}
	var chcomp=chave.length;
	var chcod=0;
	var deslocamentochave=0;
	var strOut="";
	var offset=0;
	var k=0;
	str=str.toMaiuscula();
	for(var i=0;i<str.length;i++){
		if (str.charCodeAt(i) == 32) {
			strOut+=" ";
		}
		else {
			deslocamentochave = k % chcomp;
			chchave = chave.charCodeAt(deslocamentochave) - 65;
			chcod = str.charCodeAt(i) - 65;
			offset = (chcod + chchave) % 26;
			strOut += String.fromCharCode(65 + offset);
			k++;
		}
	}
	return strOut;
}

/**
 * Método que efectua a desencriptação de uma string codificada a partir do algoritmo de Vigénere
 * @param {String} stre String codificada
 * @param {String} chave Chave de encriptação
 * @return {String} strd String descodificada
 */
Crypto.VDecripta=function(str,chave){
	if(typeof(chave)=='undefined'){
		chave=ALG.VIGSECRETKEY;
	}
	else{
		chave=chave.toMaiuscula();
	}
	var chcomp=chave.length;
	var chcod=0;
	var deslocamentochave=0;
	var strOut="";
	var offset=0;
	var k=0;
	str=str.toMaiuscula();
	for(var i=0;i<str.length;i++){
		if (str.charCodeAt(i) == 32) {
			strOut+=" ";
		}
		else {
			deslocamentochave = k % chcomp;
			chchave = chave.charCodeAt(deslocamentochave) - 65;
			chcod = str.charCodeAt(i) - 65;
			offset =(chcod - chchave) % 26;
			if(offset<0)
				offset=26+offset;
			strOut += String.fromCharCode(65 + offset);
			k++;
		}
	}
	return strOut;
}

/**
 * @constructor Namspace que representa os algoritmos de compressão de dados
 */
var Compressao=function(){};

Compressao.HuffmanEncodingTree=function(str){
	//Transforma o objecto de frequências em num array dicionario
	var strO=Utils.charFreq(str);
	var arrO=strO.toDicArray();
	var arrA=[];
	var indA1;
	var indA2;
	var noAux1;
	var noAux2;
	var noRaiz;
	//Função que detecta o elemento com valor mínimo e devolve o seu índice do array de árvores
	var getIndMinFreqObj=function(arrA){
		if(arrA.length==0){
				return null;
			}
		var k=0;
		for(var ii=0;ii<arrA.length;ii++){
			if(arrA[k].key>arrA[ii]){
				k=ii;
			}
		}
		return k;
	};
	
	//Criar os nós para cada um dos valores
	for(var i=0;i<arrO.length;i++){
		if (typeof(arrO[i][1]) == 'number') {
			arrA[i] = new noarvore(arrO[i][1], arrO[i][0]);
		}
	}
	if(arrA.length==1){
		noRaiz=new noarvore(1,null);
		noRaiz.esq=arrA[0];
		return noRaiz;
	}
	//Fundir as árvores até só sobrar uma no array de árvores
	while(arrA.length>1){
		indA1=getIndMinFreqObj(arrA);
		noAux1=arrA[indA1];
		arrA.remove(indA1);
		indA2=getIndMinFreqObj(arrA);
		noAux2=arrA[indA2];
		arrA.remove(indA2);
		noRaiz=new noarvore(noAux1.key+noAux2.key,null);
		noRaiz.esq=noAux1;
		noRaiz.dir=noAux2;
		arrA[arrA.length]=noRaiz;
	}
	return noRaiz;
};

/**
 * Método que devolve os códigos dos caracteres a partir da árvore de códigos
 * @param {noarvore} arvore Árvore contendo a codificação dos caracteres a partir do algoritmo de Huffman
 * @param {Object} obj Objecto do tipo dicionário que irá conter os códigos de cada um dos caracteres presentes na
 * arvore de Huffman
 * @param {Object} str String que será sempre inicializada a vazio, necessária para recorrencia
 */
Compressao.getTreeCodes = function(arvore,obj,str){
	if (arvore != null) {
		Compressao.getTreeCodes(arvore.esq,obj,str+"1");
		Compressao.getTreeCodes(arvore.dir,obj,str+"0");
		if (arvore.val != null) {
			obj[arvore.val] = str;
		}
	}
	return obj;
}

/**
 * Algoritmo de Huffman para compressão de dados
 * @param {Object} Obj Objecto representando a árvore de huffman necessária para a compressão e descompressão dos dados
 */
Compressao.HuffmanEncoding=function(str){
	var arv=Compressao.HuffmanEncodingTree(str);
	var objC=Compressao.getTreeCodes(arv,new Object(),"");
	var strO="";
	var cod="";
	for(var i=0;i<str.length;i++){
		strO+=objC[str[i]];
	}
	return strO;
};

/**
 * @constructor Class que contém um conjunto de funções utilitárias
 */
var Utils=function(){};

Utils.prototype.ghost=function(){};

/**
 * Método que cria um objecto do tipo dicionário contendo os caracteres da string dada como entrada
 * @param {String} str 
 * @return {Object} obj Objecto do tipo dicionário contendo os caracteres presentes na string e a correspondente
 * frequência associada.
 */
Utils.charFreq=function(str){
	var objfr=new Object();
	var comp=str.length;
	for(var i=0;i<comp;i++){
		if (typeof(objfr[str.charAt(i)]) == "undefined") {
			objfr[str[i]] = 1 / comp;
		}
		else {
			objfr[str[i]]+=1/comp;
		}
	}
	return objfr;
};

/**
 * @constructor Construtor do objecto autómato
 * @param {Number} nest Número de estados 
 * @param {Array} alf Array de letras que representam o alfabeto do autómato 
 */
var Automato=function(nest,alf){
	this.estados=Array.map(1,nest);
	this.transicoes=[];
	this.finais=[];
	this.iniciais=[];
	this.alfabeto=alf;
};
/**
 * Método que adiciona uma transição no autómato
 * @param {Number} esta Numero do estado
 * @param {Number} estb Numero do estado
 * @param {Object} letra
 */
Automato.prototype.atrans=function(esta,estb,letra){
	this.transicoes[this.transicoes.length]=[esta,estb,letra];
};

/**
 * Método que devolve o automato minimo a partir de um conjunto de classes de equivalencia
 * @private
 * @param {Array} gclass Array de classes de estados
 */
Automato.prototype._gmin=function(gclass){
	var amin=new Automato(gclass.length,this.alfabeto.clona());
	var ef;
	for(var i=0;i<gclass.length;i++){
		for(var j=0;j<this.alfabeto.length;j++){
			ef=this.trans(gclass[i][0],this.alfabeto[j]);
			console.log(ef);
			if(ef!=-1)
				amin.atrans(i+1,gclass.classpos(ef)+1,this.alfabeto[j]);
		}
	}
	amin.iniciais=this._iniciais(gclass);
	amin.finais=this._finais(gclass);
	return amin;
};

/**
 * Devolve a classe de equivalencia inicial
 * @param {Array} gclass Classes de estados
 */
Automato.prototype._iniciais=function(gclass){
	var out=[];
	for(var i=0;i<gclass.length;i++){
		if(gclass[i].less(this.iniciais).length!=gclass[i].length)
			out[out.length]=i+1;
	}
	return out;
}

/**
 * Devolve as classes de estados finais
 * @param {Array} gclass Classes de estados
 */
Automato.prototype._finais=function(gclass){
	var out=[];
	for(var i=0;i<gclass.length;i++){
		if(gclass[i].less(this.finais).length!=gclass[i].length)
			out[out.length]=i+1;
	}
	return out;
}

/**
 * Calcula o automato mínimo. Assume-se que o autómato é um AFD
 * @return {Automato} Objecto automato mínimo
 */
Automato.prototype.minimo=function(){
	var i=this.iniciais.clona();
	var f=this.finais.clona();
	var nf=this.estados.less(this.finais);
	var e1=Array.produto(nf,nf).concat(Array.produto(this.finais,this.finais));
	var e2=Array.produto(this.estados,this.estados);
	while(e1.length!=e2.length){
		e2=e1.clona();
		for(var i=0;i<e1.length;i++){
			for(var j=0;j<this.alfabeto.length;j++){
				if(this.trans(e1[i][0],this.alfabeto[j])!=this.trans(e1[i][1],this.alfabeto[j]))
					e1.remove(i);
			}
		}
	}
	cl=e1.groupclasses();
	return this._gmin(cl);
};


/**
 * Devolve o estado transitado
 * @param {Number} estado Estado
 * @param {Object} letra Letra do alfabeto
 * @return {Number} numero do estado transitado, -1 caso não haja transição possivel
 */
Automato.prototype.trans=function(estado,letra){
	for(var i=0;i<this.transicoes.length;i++){
		if(this.transicoes[i][0]===estado && this.transicoes[i][2]===letra)
			return this.transicoes[i][1];
	}
	return -1;
}

/***
 * Atribui final ou nao final a um estado
 * @param {Number} esta Estado
 * @param {Boolean} bool true-> final, false-> nao final
 */
Automato.prototype.sfinal=function(esta,bool){
	var b;
	if(typeof(bool)!='undefined')
		b=bool;
	else
		b=true;
	if(b){
		if(this.finais.has(esta))
			return;
		this.finais[this.finais.length]=esta;
	}
	else{
		if(!this.finais.has(esta))
			return;
		this.finais.remove(this.finais.pos(esta));
	}
};

/***
 * Atribui final ou nao inicial a um estado
 * @param {Number} esta Estado
 * @param {Boolean} bool true-> inicial, false-> nao inicial
 */
Automato.prototype.sinicial=function(esta,bool){
	var b;
	if(typeof(bool)!='undefined')
		b=bool;
	else
		b=true;
	if(b){
		if(this.iniciais.has(esta))
			return;
		this.iniciais[this.iniciais.length]=esta;
	}
	else{
		if(!this.iniciais.has(esta))
			return;
		this.iniciais.remove(this.iniciais.pos(esta));
	}
};

/**
 * Método que devolve uma string com a descrição do autómato
 * @return {String} descrição com as transições do autómato
 */
Automato.prototype.toString=function(){
	var out="Alfabeto: "+this.alfabeto.toString()+"\n";
	out+="Estados: "+this.estados.toString()+"\n";
	out+="Iniciais: "+this.iniciais.toString()+"\n";
	out+="Finais: "+this.finais.toString()+"\n";
	out+="Transições: "+this.transicoes.toString()+"\n";
	return out;
};

var noarvore=function(key,val){
	this.esq=null;
	this.dir=null;
	this.key=key;
	this.val=val;
}



var Tree=function(){
	this.raiz=new noarvore(null,null);
};

/**
 * Método que insere 
 * @param {Número} key Chave numérica
 * @param {Object} val Objecto que representa o valor que se encontra nos nós da árvore
 */
Tree.prototype.insertElement=function(key,val){
	//caso a árvore esteja vazia insere imediatamente no lado esquerdo da árvore
	var elaux=this.dir;
	if(this.esq==null){
		this.esq=new noarvore(key,val);
	}
	else{
		//Enquanto não estivermos numa folha da árvore
		while(elaux.dir!=null){
			//Se a chave à direita for maior que a chave inserida então percorremos a árvore pela sua folha esquerda
			if(elaux.key>key){
				elaux=elaux.esq;
			}
			else{
				elaux=elaux.dir;
			}		
		}
	}
}


COOkie.getCookie=function(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
};

/**
 * Método que devolve uma string contendo as propriedades deste objecto
 * @return {string} str String contendo informação sobre as propriedades do objecto
 */
Object.prototype.inspect=function(){
	var str="";
	var filho;
	for(filho in this){
		if(typeof(this[filho])=='function')
			str+="Função: "+filho+"\n";
		else
			str+="Variável: "+filho+"-->"+this[filho]+"\n";
	}
	return str;
};

/**
 * Método privado que devolve uma string com a representação JSON do objecto
 * @param {Object} obj Objecto que se pretende exportar para JSON
 * @private
 */
Object._toJSONString=function(obj){
	var str="";
	var e;
	console.log(typeof(obj));
	if(obj==null)
		return "null";
	if(typeof(obj)=='number'){
			str+=obj;
			return str;
	}
	else if(typeof(obj)=='string'){
			str+="'"+obj+"'";
			return str;
	}
	else if (typeof(obj) == 'object') {
		if (typeof(obj.length) == "undefined") {
			str += "{";
			var k = 0;
			for (e in obj) {
				if (typeof(obj[e]) != "function") {
					if (k != 0) {
						str += ",";
					}
					str +='"'+e+'":'+ Object._toJSONString(obj[e]);
					k++;
				}
			}
			str += "}";
		}
		else {
			str += "[";
			for (var i = 0; i < obj.length; i++) {
				if (typeof(obj[i]) != "function") {
					if (i != 0) {
						str += ",";
					}
					str += Object._toJSONString(obj[i]);
				}
			}
			str += "]";
		}
	}
	
	return str;
}

/**
 * Método que devolve uma string representando o objecto
 * @return {String} str string contendo a representação JSON do objecto
 */
Object.prototype.toJSONString=function(){
	return Object._toJSONString(this);
}
/**
 * Método que transforma um objecto do tipo dicionário num array binário
 * @return {Array} arr Array binário contendo os valores do objecto dicionário
 */
Object.prototype.toDicArray=function(){
	var arr=[];
	var i=0;
	for(e in this){
		arr[i]=[];
		arr[i][0]=e;
		arr[i][1]=this[e];
		i++;
	}
	return arr;
};

/**
 * Método que devolve uma string contendo o nome de todos os métodos existentes no objecto
 * @return {string} strm String com a descrição dos métodos
 */
Object.prototype.getMetodos=function(){
	var str="";
	for(var filho in this){
		if(typeof(this[filho])=='function')
			str+="Função: "+filho+"\n";
	}
	return str;
};


/**
 * Método que devolve uma string contendo o nome e valor de todas as propriedades existentes
 * no objecto
 * @return {string} strp String com a descrição dos valores do objecto
 */
Object.prototype.getPropriedades=function(){
	var str="";
	for(var filho in this){
		if(typeof(this[filho])!='function')
			str="Variavel: "+this[filho];
	}
	return str;
};

Object.min=function(strA,strB){
	return strB.length>strA.length?strA:strB;
};

Object.max=function(strA,strB){
	return strA.length>=strB.length?strA:strB;
};

/**
 * Devolve um array com os caracteres que constituem a string
 * @return {Array}
 */
String.prototype.alphabet=function(){
	var out=[];
	var ext={};
	for(var i=0;i<this.length;i++){
		if(!ext[this.charAt(i)]){
			ext[this.charAt(i)]=true;
			out[out.length]=this.charAt(i);
		}
	}
	return out;
};

/**
 * Método que devolve a intersecção entre duas strings
 * @param {String} strA String A
 * @param {String} strB String B
 * @return {String} out String intersecção
 */
String.and=function(strA,strB){
	var min=String.min(strA,strB);
	var max=String.max(strA,strB);
	var out="";
	for(var i=0;i<min.length;i++){
		if(min.charAt(i)==max.charAt(i))
			out+=max.charAt(i);
	}
	return out;
};
