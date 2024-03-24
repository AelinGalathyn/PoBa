package com.example.poba.Users;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface IUsers {
    @POST("auth/login")
    Call<ResponseMessage> postLogin(@Body UsersInputDto user);
}


