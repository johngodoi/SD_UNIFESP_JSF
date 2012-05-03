/**
 * LoginBean.java
 * 
 */

package com.tutorial;

public class User
{
    private String name;
    private String password;
	private Integer id;

	public void setId(Integer integer) {
		this.id = integer;

	}


    public Integer getId() {
		return id;
	}


	public String getName ()
    {
        return name;
    }


    public void setName (final String name)
    {
        this.name = name;
    }


    public String getPassword ()
    {
        return password;
    }


    public void setPassword (final String password)
    {
        this.password = password;
    }
}