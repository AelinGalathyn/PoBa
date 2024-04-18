package com.example.pobatest.ApiCalls;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.example.pobatest.Bejelentkezes.EgyszeriBelepesActivity;
import com.example.pobatest.Users.UsersInputDto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.JavaNetCookieJar;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import retrofit2.http.Body;

public class HttpClient {
    private final String PREF_NAME = "Cookies";
    private String URL = "http://192.168.11.62:3000/";


    // Create and configure OkHttpClient with stored cookies
    public OkHttpClient getHttpClient(Context context) {
        OkHttpClient.Builder httpClientBuilder = new OkHttpClient.Builder();
        final List<Cookie> storedCookies = AppPreferences.loadCookies(context);

        httpClientBuilder.cookieJar(new CookieJar() {
            private final List<Cookie> cache = new ArrayList<>();

            @Override
            public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
                cache.addAll(cookies);
                AppPreferences.saveCookies(context, cookies);
            }

            @Override
            public List<Cookie> loadForRequest(HttpUrl url) {
                // Optionally, filter cookies by url
                return cache.isEmpty() ? storedCookies : cache;
            }
        });

        return httpClientBuilder.build();
    }


    // Make HTTP request
    public void makeLoginHttpRequest(UsersInputDto user, Context context, Callback callback) {
        HttpUrl.Builder urlBuilder = HttpUrl.parse(URL + "login").newBuilder();
        urlBuilder.addQueryParameter("username", user.getUsername());
        urlBuilder.addQueryParameter("password", user.getPassword());

        String fullurl = urlBuilder.build().toString();
        RequestBody emptyBody = RequestBody.create(new byte[0]);

        OkHttpClient httpClient = getHttpClient(context);
        Request request = new Request.Builder()
                .url(fullurl)
                .post(emptyBody)
                .build();
        httpClient.newCall(request).enqueue(callback);
    }

    public void makeGetHttpRequest(Context context, String url, okhttp3.Callback callback) {
        OkHttpClient httpClient = getHttpClient(context);
        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();
        httpClient.newCall(request).enqueue(callback);
    }
}

