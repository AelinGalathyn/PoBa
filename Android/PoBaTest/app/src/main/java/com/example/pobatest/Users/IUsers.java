package com.example.pobatest.Users;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface IUsers {
    @POST("login")
    Call<ResponseMessage> postLogin(@Query("username") String username, @Query("password") String password);
}


