package com.example.pobatest.ApiCalls;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.Map;

public class SharedPrefWebshopId {
    private final String PREF_NAME2 = "WebshopId";

    public SharedPrefWebshopId(){}


    public Integer getWebshopId(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME2, Context.MODE_PRIVATE);
        Map<String , ?> webshopMap = sharedPreferences.getAll();
        Integer webshopid = null;
        for (Map.Entry<String, ?> entry: webshopMap.entrySet()){
            webshopid = Integer.parseInt((String)entry.getValue());
        }
        return webshopid;
    }

    public void setWebshopId(Context context, String webshopid){
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREF_NAME2, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("webshopid", webshopid.toString());  // Consider storing individual attributes if necessary
        editor.apply();
    }
}
