package com.tutorial.core.parser;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class ParserXML {

	private InputStream is;
	private DocumentBuilderFactory dbf;

	private DocumentBuilder docBuilder;
	
	public ParserXML(){
		this.is=null;
	}
	
	private void convertStringToInputStream(String xml) throws UnsupportedEncodingException{
			this.is = new ByteArrayInputStream(xml.getBytes("UTF-8"));
	}
	
	private void setUpDocumentBuilder() throws ParserConfigurationException{

		dbf = DocumentBuilderFactory.newInstance();

		docBuilder = dbf.newDocumentBuilder();
	}
	
	public void parse(String xml) throws ParserConfigurationException,
			SAXException, IOException, XPathExpressionException {
		this.setUpDocumentBuilder();
		
		Document doc = docBuilder.parse(is);

		// mudando o valor de 'title'

		Element htmlTag = doc.getDocumentElement();

		Element headTag = (Element) htmlTag.getElementsByTagName("head").item(0);
		

		Element titleTag = (Element) headTag.getElementsByTagName("title").item(0);

		titleTag.setTextContent("Novo título");

		// adicionando mais parágrafos em 'body'

		Element p1Tag = doc.createElement("p");

		p1Tag.setAttribute("class", "black");

		p1Tag.setTextContent("Um novo parágrafo... ;)");

		Element p2Tag = doc.createElement("p");

		p2Tag.setAttribute("class", "white");

		p2Tag.setTextContent("Outro parágrafo..");

		Element p3Tag = doc.createElement("p");

		p3Tag.setAttribute("class", "black");

		p3Tag.setTextContent("Fim !");

		Element bodyTag = (Element) htmlTag.getElementsByTagName("body").item(0);

		bodyTag.appendChild(p1Tag);

		bodyTag.appendChild(p2Tag);

		bodyTag.appendChild(p3Tag);

		// removendo atributo 'onload'

		bodyTag.removeAttribute("onload");

		// removendo o primeiro parágrafo de 'body'

		NodeList pTags = bodyTag.getElementsByTagName("p");

		Node p1 = pTags.item(0);

		bodyTag.removeChild(p1);

		// // fazendo uma consulta XPath
		// XPathFactory xPathFactory = XPathFactory.newInstance();
		// XPath xPath= xPathFactory.newXPath();

		XPath xpath = XPathFactory.newInstance().newXPath();
		String expression = "manufacturer";
		Node manufacturerNode = (Node) xpath.evaluate(expression, expression,
				XPathConstants.NODE);

		// NodeList resultado = xPath.selec

		// NodeList(bodyTag, "p[@class = 'black']");
		//
		// for (int i = 0; i < resultado.getLength(); i++) {
		//
		// System.out.println("?: " +
		//
		// resultado.item(i).getTextContent());
		//
		// }

		// }
	}
}
