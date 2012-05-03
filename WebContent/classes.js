//Classe do formulário que conterá os campos
var FormClass = function() {
	this.id = '';				    //ID para identificação do formulário
	this.usuario = '';   		    //ID do usuário que criou o formulário
	this.container = ''; 			//ID do elemento que contera o form
	this.elementos = new Array();	//Elementos do form, da classe InputClass

	//Desenha o formulário no container selecionado
	this.desenhar = function(suprime_alerta) {
		var html = '<legend>' + this.id;
		
			if(this.usuario)
				html += ' criado por ' + this.usuario;
				
			html += '</legend>';
			html += '<ol>';
			for(var i in this.elementos){
				html += '<li id="campo_' + i + '">';
				html += this.elementos[i].toHTML();
				html += '</li>';
			}
			html += '</ol>';
		//Adiciona ao container selecionado
		$('#' + this.container).html(html);

		//Reinicializa os handlers
		initFormulario();
		
		//Alerta o usuário sobre perda de dados
		if(warning != undefined && suprime_alerta != true)
			warning = true;
	}

	//Gera um XML com os campos do formulário
	this.toXML = function() {
		var xml = '<?xml version="1.0" encoding="UTF-8"?>';
		xml += '\n<form>';
		xml += '\n<formid>' + this.id + '</formid>';
		xml += '\n<userid>' + this.usuario + '</userid>';
		xml += '\n<questions>';
		for(var i in this.elementos){
			xml += this.elementos[i].toXML(i);
		}
		xml += '\n</questions>';
		xml += '\n</form>';
		return xml;
	}

	//Retorna o elemento em formato JSON para ser amazenado no localStorage
	this.toJSON = function() {
		return '{"id":"'+this.id+'","usuario":"'+this.usuario+'","container":"'+this.container+'","elementos":'+JSON.stringify(this.elementos)+'}';
	}

	//Define as propriedades com base em uma string JSON
	this.fromJSON = function(json) {
		var obj = JSON.parse(json);
		this.id = obj.id;
		this.usuario = obj.usuario;
		this.container = obj.container;
		for(var i in obj.elementos) {
			var elem = obj.elementos[i];
			var elemento = new FieldClass();
			elemento.nome = elem.nome;
			elemento.tipo = elem.tipo;
			elemento.obrigatorio = elem.obrigatorio;
			elemento.tamanho = elem.tamanho;
			elemento.proximo = elem.proximo;
			elemento.max = elem.max;
			elemento.min = elem.min;
			elemento.titulo = elem.titulo;
			elemento.texto_padrao = elem.texto_padrao;
			elemento.valor_padrao = elem.valor_padrao;
			elemento.ajuda = elem.ajuda;
			for(var j in elem.opcoes) {
				var opc = elem.opcoes[j];
				var opcao = new OptionClass();
				opcao.rotulo = opc.rotulo;
				opcao.valor = opc.valor;
				elemento.opcoes.push(opcao);
			}
			this.elementos.push(elemento);
		}
	}
}

//Classe dos campos que serão adicionados
var FieldClass = function() {
	this.nome = '';				//Nome do elemento na página (name)
	this.tipo = 'text'; 		//Pode ser text, number, checkbox ou radio
	this.opcoes = new Array(); 	//Vetor de opções para Checkbox ou Option
	this.obrigatorio = false; 	//TRUE ou FALSE para se o preenchimento eh obrigatorio
	this.tamanho = 100;			//Tamanho máximo do campo, aplicável para tipo 'text'
	this.proximo = '';   		//Poxima pergunta
	this.max = '';              //Valor máximo a ser atingido
	this.min = '';              //Valor mínimo a ser atingido
	this.titulo = '';			//Rótulo do campo do formulário
	this.texto_padrao = '';		//Texto padrão do campo
	this.valor_padrao = '';		//Valor padrão do campo
	this.ajuda = '';			//Texto de ajuda para o preenchimento

	//Método para renderizar um campo
	this.toHTML = function() {
		var retorno = '';
		switch(this.tipo){
			case 'text':
					retorno += '<label class="label_campo" for="campo_' + this.id + '">';
					retorno += this.titulo;
					if(this.obrigatorio)
						retorno += ' <span class="required">*</span>';
					retorno += '</label>';
					retorno += '<div class="ordem"><a href="#" onclick="subir(); return false;"><img src="img/arrow_up.png" alt="subir" /></a> <a href="#" onclick="descer(); return false;"><img src="img/arrow_down.png" alt="descer" /></a></div>';
					retorno += '<input type="text" ';
					retorno += 'id="campo_' + this.id + '" ';
					retorno += 'maxlength="' + this.tamanho + '" ';
					if(this.texto_padrao)
						retorno += 'value="' + this.texto_padrao + '" ';
				break;
			case 'number':
					retorno += '<label class="label_campo" for="campo_' + this.id + '">';
					retorno += this.titulo;
					if(this.obrigatorio)
						retorno += ' <span class="required">*</span>';
					retorno += '</label>';
					retorno += '<div class="ordem"><a href="#" onclick="subir(); return false;"><img src="img/arrow_up.png" alt="subir" /></a> <a href="#" onclick="descer(); return false;"><img src="img/arrow_down.png" alt="descer" /></a></div>';
					retorno += '<input type="number" ';
					retorno += 'id="campo_' + this.id + '" ';
					retorno += 'min="' + this.min + '" ';
					retorno += 'max="' + this.max + '" ';
					retorno += 'class="numerico" ';
					if(this.valor_padrao)
						retorno += 'value="' + this.valor_padrao + '" ';
				break;
			case 'checkbox':
			case 'radio':
					retorno += '<label class="label_campo">';
					retorno += this.titulo;
					if(this.obrigatorio)
						retorno += ' <span class="required">*</span>';
					retorno += '</label>';
					retorno += '<div class="ordem"><a href="#" onclick="subir(); return false;"><img src="img/arrow_up.png" alt="subir" /></a> <a href="#" onclick="descer(); return false;"><img src="img/arrow_down.png" alt="descer" /></a></div>';
					for(var i in this.opcoes){
						var opcao = this.opcoes[i];
						retorno += '<label><input type="' + this.tipo + '" name="' + this.nome + '" ';
						if(this.texto_padrao == opcao.valor)
							retorno += 'checked="checked" ';
						retorno += '/>';
						retorno += opcao.rotulo;
						retorno += '</label>';
					}
					
				break;
		}
		return retorno;
	}

	//Gera um XML com os dados do campo
	this.toXML = function(ordem) {
		var xml = '';
		switch(this.tipo){
			case 'text':
				xml += '\n<text ';
				break;	
			case 'number':
				xml += '\n<number ';
				break;
			case 'checkbox':
				xml += '\n<checkbox ';
				break;
			case 'radio':
				xml += '\n<radio " ';
				break;
		}
		
		xml += 'id="' + ordem + '" ';
		xml += 'next="' + this.proximo + '" ';
		xml += 'required="' + (this.obrigatorio?'true':'false') + '" ';
		
		switch(this.tipo){
			case 'text':
				xml += 'max="' + this.tamanho + '" ';
				break;
			case 'number':
				xml += 'min="' + this.min + '" ';
				xml += 'max="' + this.max + '" ';
				break;
		}
		
		xml += '>';

		xml += '\n<help>' + this.ajuda + '</help>';
		xml += '\n<label>' + this.titulo + '</label>';

		switch(this.tipo){
			case 'checkbox':
			case 'radio':
				xml += '\n<itens>';
				for(var i in this.opcoes){
					var opcao = this.opcoes[i];
					xml += '\n\t<item valor="' + opcao.valor + '" ordem="' + i + '">' + opcao.rotulo + '</item>';
				}
				xml += '\n</itens>';
				break;
		}

		switch(this.tipo){
			case 'text':
				xml += '\n<default>' + this.texto_padrao + '</default>';
				break;
			case 'number':
				xml += '\n<default>' + this.valor_padrao + '</default>';
				break;
		}
		
		switch(this.tipo){
			case 'text':
				xml += '\n</text>';
				break;
			case 'number':
				xml += '\n</number>';
				break;
			case 'checkbox':
				xml += '\n</checkbox>';
				break;
			case 'radio':
				xml += '\n</radio>';
				break;
		}
		
		return xml;
	}
	
}

//Classe para as opções
var OptionClass = function() {
	this.rotulo = '';			//Texto da opção
	this.valor = '';			//Valor da opção
}
