package com.tutorial;

public abstract class Question {

	private Integer id;
	private Integer next;
	private Boolean required;
	private Integer max;
	private String help;
	private String label;
	
	public Boolean getRequired() {
		return required;
	}

	public String getHelp() {
		return help;
	}

	public void setHelp(String help) {
		this.help = help;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Integer getId() {
		return id;
	}

	public Integer getNext() {
		return next;
	}

	public Integer getMax() {
		return max;
	}

	public void setId(Integer integer) {
		this.id=integer;
		
	}

	public void setNext(Integer integer) {
		this.next=integer;
		
	}

	public void setRequired(Boolean true1) {
		this.required=true1;
		
	}

	public void setMax(Integer integer) {
		this.max=integer;
		
	}

}
