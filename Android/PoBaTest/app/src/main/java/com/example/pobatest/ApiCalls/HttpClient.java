package com.example.pobatest.ApiCalls;

import android.content.Context;

import androidx.annotation.NonNull;

import com.example.pobatest.Users.UsersInputDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

public class HttpClient {
    public String URL = "http://192.168.90.67:3000/";
    public RequestBody emptyBody = RequestBody.create(new byte[0]);
    public OkHttpClient getHttpClient(Context context) {
        OkHttpClient.Builder httpClientBuilder = new OkHttpClient.Builder();
        final List<Cookie> storedCookies = AppPreferences.loadCookies(context);

        httpClientBuilder.cookieJar(new CookieJar() {
            private final List<Cookie> cache = new ArrayList<>();

            @Override
            public void saveFromResponse(@NonNull HttpUrl url, @NonNull List<Cookie> cookies) {
                cache.addAll(cookies);
                AppPreferences.saveCookies(context, cookies);
            }

            @NonNull
            @Override
            public List<Cookie> loadForRequest(@NonNull HttpUrl url) {
                return cache.isEmpty() ? storedCookies : cache;
            }
        });

        return httpClientBuilder.build();
    }


    public void makeLoginHttpRequest(UsersInputDto user, Context context, Callback callback) {
        HttpUrl.Builder urlBuilder = Objects.requireNonNull(HttpUrl.parse(URL + "login")).newBuilder();
        urlBuilder.addQueryParameter("username", user.getUsername());
        urlBuilder.addQueryParameter("password", user.getPassword());

        String fullurl = urlBuilder.build().toString();

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

    public void modifyTermekQty(Context context, String url, okhttp3.Callback callback, Double stock, String sku) {
        OkHttpClient httpClient = getHttpClient(context);
        String webshopId = AppPreferences.getWebshopId(context);

        String finalUrl = Objects.requireNonNull(HttpUrl.parse(URL + url + "/" + webshopId + "/setStock"))
                .newBuilder()
                .addQueryParameter("sku", sku)
                .addQueryParameter("stock", stock.toString())
                .build()
                .toString();



        Request request = new Request.Builder()
                .url(finalUrl)
                .post(emptyBody)
                .build();

        httpClient.newCall(request).enqueue(callback);
    }


    public void getActions(Context context, String url, okhttp3.Callback callback) {
        OkHttpClient httpClient = getHttpClient(context);
        Request request = new Request.Builder()
                .url(URL + url)
                .get()
                .build();
        httpClient.newCall(request).enqueue(callback);
    }

    public void changePassword(Context context, String url, okhttp3.Callback callback, String opw, String npw) {
        OkHttpClient httpClient = getHttpClient(context);

        String finalUrl = Objects.requireNonNull(HttpUrl.parse(URL + url))
                .newBuilder()
                .addQueryParameter("opw", opw)
                .addQueryParameter("npw", npw)
                .build()
                .toString();

        Request request = new Request.Builder()
                .url(finalUrl)
                .build();
        httpClient.newCall(request).enqueue(callback);
    }

    public void deleteWebshop(Context context, String url, okhttp3.Callback callback, String webshopid) {
        OkHttpClient httpClient = getHttpClient(context);

        String finalUrl = Objects.requireNonNull(HttpUrl.parse(URL + url))
                .newBuilder()
                .addQueryParameter("webshopid", webshopid)
                .build()
                .toString();

        Request request = new Request.Builder()
                .url(finalUrl)
                .delete()
                .build();

        httpClient.newCall(request).enqueue(callback);
    }

    public void addWebshop(Context context, String url, okhttp3.Callback callback, String api_key) {
        OkHttpClient httpClient = getHttpClient(context);

        String finalUrl = Objects.requireNonNull(HttpUrl.parse(URL + url))
                .newBuilder()
                .addQueryParameter("api_key", api_key)
                .build()
                .toString();

        RequestBody requestBody = new FormBody.Builder().build();

        Request request = new Request.Builder()
                .url(finalUrl)
                .post(requestBody)
                .build();

        httpClient.newCall(request).enqueue(callback);
    }
}

