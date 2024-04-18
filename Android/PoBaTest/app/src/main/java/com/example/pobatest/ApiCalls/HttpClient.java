package com.example.pobatest.ApiCalls;

import android.content.Context;
import com.example.pobatest.Users.UsersInputDto;

import java.util.ArrayList;
import java.util.List;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

public class HttpClient {
    private final String PREF_NAME = "Cookies";
    public String URL = "http://192.168.11.139:3000/";


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
        String webshopId = AppPreferences.getWebshopId(context);
        Request request = new Request.Builder()
                .url(URL + url + "/" + webshopId)
                .get()
                .build();
        httpClient.newCall(request).enqueue(callback);
    }

    public void checkRequest(Context context, okhttp3.Callback callback) {
        OkHttpClient httpClient = getHttpClient(context);
        Request request = new Request.Builder()
                .url(URL)
                .get()
                .build();
        httpClient.newCall(request).enqueue(callback);
    }
}

