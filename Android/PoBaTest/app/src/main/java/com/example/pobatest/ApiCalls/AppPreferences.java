package com.example.pobatest.ApiCalls;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.pobatest.Webshopok.Webshop;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;
import okhttp3.Cookie;

public class AppPreferences {
    private static final String PREF_NAME = "AppPrefs";
    private static final Gson gson = new Gson();
    private static void saveData(Context context, String key, Object data) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        String jsonData = gson.toJson(data);
        editor.putString(key, jsonData);
        editor.apply();
    }

    private static <T> T loadData(Context context, String key, Type type) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        String jsonData = sharedPreferences.getString(key, "");
        if (jsonData.isEmpty()) return null;
        return gson.fromJson(jsonData, type);
    }

    public static void saveCookies(Context context, List<Cookie> cookies) {
        saveData(context, "cookies", cookies);
    }

    public static List<Cookie> loadCookies(Context context) {
        return loadData(context, "cookies", new TypeToken<List<Cookie>>() {}.getType());
    }

    public static void setWebshopId(Context context, String webshopId) {
        saveData(context, "webshopid", webshopId);
    }

    public static String getWebshopId(Context context) {
        return loadData(context, "webshopid", String.class);
    }

    public static void saveWebshops(Context context, List<Webshop> webshops) {
        saveData(context, "webshops", webshops);
    }

    public static List<Webshop> getWebshops(Context context) {
        return loadData(context, "webshops", new TypeToken<List<Webshop>>() {}.getType());
    }

    public static void setUsername(Context context, String username) {
        saveData(context, "username", username);
    }

    public static String getUsername(Context context) {
        return loadData(context, "username", String.class);
    }
}
