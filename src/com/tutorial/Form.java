package com.tutorial;

import java.util.ArrayList;

public class Form {
	private Integer id;
	private User user;
	private ArrayList<Question> questionList;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;

	}

	public void setUser(User user) {
		this.user=user;
		
	}

	public void setQuestionList(ArrayList<Question> arrayList) {
		this.questionList=arrayList;
		
	}

}
