package com.example.pobatest.Users;

public class UsersInputDto {
    private final String username;
    private final String password;

    public UsersInputDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
