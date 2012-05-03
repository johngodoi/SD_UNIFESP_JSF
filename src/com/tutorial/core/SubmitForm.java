package com.tutorial.core;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tutorial.Form;
import com.tutorial.core.parser.ParserXML;

/**
 * Servlet implementation class SubmitForm
 */
@WebServlet("/SubmitForm")
public class SubmitForm extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public SubmitForm() {
        // TODO Auto-generated constructor stub
    }
    
    public static String getXml(HttpServletRequest req) {
    	
    	String xml = req.getParameter("xml");
    	System.out.println(xml);
        return xml;
    }
    
    //TODO verificar usos
	/**
	 * @see Servlet#getServletInfo()
	 */
	public String getServletInfo() {
		// TODO Auto-generated method stub
		return null; 
	}

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String xmlDataString = this.getXml(request);
//		System.out.println(xmlDataString);
		ParserXML parserXML = new ParserXML();
		Form form = parserXML.parse(xmlDataString);
		FormDomainService formService = new FormDomainService();
		formService.save(form);
	}

}
