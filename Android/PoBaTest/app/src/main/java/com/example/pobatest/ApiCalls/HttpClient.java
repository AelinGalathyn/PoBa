package com.example.pobatest.ApiCalls;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

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
    private final String PREF_NAME = "MyPrefs";

    // Store cookies in SharedPreferences
    public void saveCookies(Context context, List<Cookie> cookies) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        for (Cookie cookie : cookies) {
            editor.putString(cookie.name(), cookie.toString());
        }
        editor.apply();
    }

    // Retrieve cookies from SharedPreferences
    public List<Cookie> loadCookies(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        Map<String, ?> cookiesMap = sharedPreferences.getAll();
        List<Cookie> storedCookies = new ArrayList<>();
        for (Map.Entry<String, ?> entry : cookiesMap.entrySet()) {
            Cookie cookie = Cookie.parse(HttpUrl.parse("http://192.168.11.62:3000/"), (String) entry.getValue());
            if (cookie != null) {
                storedCookies.add(cookie);
            }
        }
        return storedCookies;
    }

    // Create and configure OkHttpClient with stored cookies
    public OkHttpClient getHttpClient(Context context) {
        OkHttpClient.Builder httpClientBuilder = new OkHttpClient.Builder();
        CookieJar cookiejar = new JavaNetCookieJar(new java.net.CookieManager(null, java.net.CookiePolicy.ACCEPT_ALL));
        List<Cookie> storedCookies = loadCookies(context);
        for (Cookie cookie : storedCookies) {
            cookiejar.saveFromResponse(HttpUrl.parse("http://192.168.11.62:3000/"), Arrays.asList(cookie));
        }
        httpClientBuilder.cookieJar(cookiejar);
        return httpClientBuilder.build();
    }

    // Make HTTP request
    public void makeHttpRequest(Context context, String url, okhttp3.Callback callback) {
        OkHttpClient httpClient = getHttpClient(context);
        RequestBody emptyBody = RequestBody.create(new byte[0]);
        Request request = new Request.Builder()
                .url(url)
                .post(emptyBody)
                .build();
        httpClient.newCall(request).enqueue(callback);
    }
}

