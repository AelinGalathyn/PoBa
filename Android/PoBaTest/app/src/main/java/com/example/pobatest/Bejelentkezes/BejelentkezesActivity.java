package com.example.pobatest.Bejelentkezes;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.Response;

public class BejelentkezesActivity extends AppCompatActivity {

    private ImageButton bejelentkezes_gomb;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.bejelentkezes_activity);

        Init();

        bejelentkezes_gomb.setOnClickListener(view -> checkLogin());
    }

    private void checkLogin() {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(() -> Toast.makeText(BejelentkezesActivity.this, "Az állapot lekérdezése sikertelen.", Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                String responseData = null;
                if (response.isSuccessful()) {
                    try {
                        responseData = Objects.requireNonNull(response.body()).string();
                    } catch (IOException e) {
                        return;
                    }
                }

                response.close();

                final String finalResponseData = responseData;
                runOnUiThread(() -> {
                    if (response.code() == 200) {
                        try {
                            JSONObject jsonObject = new JSONObject(finalResponseData);

                            if (jsonObject.has("isValid")) {
                                boolean isValid = jsonObject.getBoolean("isValid");
                                if (!isValid) {
                                    Intent intent = new Intent(BejelentkezesActivity.this, EgyszeriBelepesActivity.class);
                                    startActivity(intent);
                                    finish();
                                }
                            }
                            if (jsonObject.has("username")) {
                                AppPreferences.setUsername(BejelentkezesActivity.this, jsonObject.getString("username"));
                                Intent intent = new Intent(BejelentkezesActivity.this, FoActivity.class);
                                startActivity(intent);
                                finish();
                            }
                        } catch (JSONException e) {
                            Toast.makeText(BejelentkezesActivity.this, "Az állapot ellenőrzése hibába futott.", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        };

        HttpClient hc = new HttpClient();

        hc.getHttpClient(this);
        hc.checkRequest(this, cb);
    }

    public void Init() {
        List<Cookie> cookies = AppPreferences.loadCookies(BejelentkezesActivity.this);
        if (cookies == null) {
            AppPreferences.saveCookies(BejelentkezesActivity.this, Collections.emptyList());
        }
        bejelentkezes_gomb = findViewById(R.id.bejelentkezes_gomb);
    }
}