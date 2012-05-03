package test.com.tutorial;

import java.util.ArrayList;
import java.util.List;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

import com.tutorial.Form;
import com.tutorial.NumberQuestion;
import com.tutorial.Question;
import com.tutorial.TextQuestion;
import com.tutorial.User;



public class FormBeanTest {
	private Form form;

	@Before
	public void start(){
		this.form=new Form();
		this.form.setId(new Integer(1));
		User user = new User();
		user.setId(new Integer(1));
		this.form.setUser(user);
		ArrayList<Question> questionsList = new ArrayList<Question>();
		Question number = new NumberQuestion();
		Question text = new TextQuestion();
		questionsList.add(number);
		questionsList.add(text);
		number.setId(new Integer(1));
		number.setNext(new Integer(1));
		number.setRequired(Boolean.TRUE);
		number.setMax(new Integer(100));
		this.form.setQuestionList(questionsList);
	}
	
	@Test
	public void testGetFormId() {
		Assert.assertEquals(form.getId(), new Integer(1));
	}

}
