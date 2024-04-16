package com.example.pobatest.Users;

public class Users {
    private final int user_id;
    private final String username;
    private final String webshop_name;
    private final String password;
    public Users(int user_id, String username, String webshop_name, String password) {
        this.user_id = user_id;
        this.username = username;
        this.webshop_name = webshop_name;
        this.password = password;
    }

    public int getUser_id() {
        return user_id;
    }

    public String getUsername() {
        return username;
    }

    public String getWebshop_name() {
        return webshop_name;
    }

    public String getPassword() {
        return password;
    }
}
