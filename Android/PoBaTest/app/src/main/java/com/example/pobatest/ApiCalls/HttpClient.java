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

    // Store cookies in SharedPreferences
    public void saveCookies(Context context, List<Cookie> cookies) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        for (Cookie cookie : cookies) {
            editor.putString(cookie.name(), cookie.toString());  // Consider storing individual attributes if necessary
        }
        editor.apply();
    }

    public List<Cookie> loadCookies(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        Map<String, ?> cookiesMap = sharedPreferences.getAll();
        List<Cookie> storedCookies = new ArrayList<>();
        for (Map.Entry<String, ?> entry : cookiesMap.entrySet()) {
            // Here, ensure your Cookie.parse can handle the string format correctly
            Cookie cookie = Cookie.parse(HttpUrl.get("http://192.168.11.62:3000/"), (String) entry.getValue());
            if (cookie != null) {
                storedCookies.add(cookie);
            }
        }
        return storedCookies;
    }


    // Create and configure OkHttpClient with stored cookies
    public OkHttpClient getHttpClient(Context context) {
        OkHttpClient.Builder httpClientBuilder = new OkHttpClient.Builder();
        final List<Cookie> storedCookies = loadCookies(context);

        httpClientBuilder.cookieJar(new CookieJar() {
            private final List<Cookie> cache = new ArrayList<>();

            @Override
            public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
                cache.addAll(cookies);
                saveCookies(context, cookies);
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
    public void makeLoginHttpRequest(HttpClient hc, UsersInputDto user, Context context, Callback callback) {
        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://192.168.11.62:3000/login").newBuilder();
        urlBuilder
                .addQueryParameter("username", user.getUsername())
                .addQueryParameter("password", user.getPassword());

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

