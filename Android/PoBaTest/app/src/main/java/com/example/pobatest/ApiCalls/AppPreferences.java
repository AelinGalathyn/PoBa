package com.example.pobatest.ApiCalls;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.pobatest.Webshopok.Webshop;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import okhttp3.Cookie;

public class AppPreferences {
    private static final String PREF_NAME = "AppPrefs";
    private static Gson gson = new Gson();

    // Method to save cookies
    public static void saveCookies(Context context, List<Cookie> cookies) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        String jsonCookies = gson.toJson(cookies);
        editor.putString("cookies", jsonCookies);
        editor.apply();
    }

    public static List<Cookie> loadCookies(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String jsonCookies = sharedPreferences.getString("cookies", "");
        if (jsonCookies.isEmpty()) return new ArrayList<>();

        Type listType = new TypeToken<List<Cookie>>() {}.getType();
        return gson.fromJson(jsonCookies, listType);
    }

    // Other preference operations can be added here
    public static void setWebshopId(Context context, String webshopId) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("webshopid", webshopId);
        editor.apply();
    }

    public static String getWebshopId(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        return sharedPreferences.getString("webshopid", null);
    }

    public static void saveWebshops(Context context, List<Webshop> webshopok) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        String jsonWebshopok = gson.toJson(webshopok);
        editor.putString("webshopok", jsonWebshopok);
        editor.apply();
    }

    public static List<Webshop> getWebshopok(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String jsonWebshopok = sharedPreferences.getString("webshopok", "");
        if (jsonWebshopok.isEmpty()) return new ArrayList<>();

        Type listType = new TypeToken<List<Webshop>>() {}.getType();
        return gson.fromJson(jsonWebshopok, listType);
    }
}
