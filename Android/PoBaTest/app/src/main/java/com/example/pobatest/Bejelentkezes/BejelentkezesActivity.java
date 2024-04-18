package com.example.pobatest.Bejelentkezes;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.HttpUrl;
import okhttp3.Response;

public class BejelentkezesActivity extends AppCompatActivity {


    private ImageButton bejelentkezes_gomb;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.bejelentkezes_activity);

        Init();


        bejelentkezes_gomb.setOnClickListener(view -> {
            checkLogin();
        });
    }

    private void checkLogin(){
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(BejelentkezesActivity.this, "Nem lehetett ellenőrizni a cookie állapotát.", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                // Move reading response data outside of UI thread handling
                String responseData = null;
                if (response.isSuccessful()) {
                    try {
                        responseData = response.body().string();
                    } catch (IOException e) {
                        Log.e("LOGIN", "Error reading response body", e);
                        return; // Exit early if response cannot be read
                    }
                }

                // Ensure to close the response after extracting the data to free resources
                response.close();

                final String finalResponseData = responseData;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful() && finalResponseData != null) {
                            try {
                                Log.i("json response", finalResponseData);
                                JSONObject jsonObject = new JSONObject(finalResponseData);

                                if (jsonObject.has("isValid")) {
                                    boolean isValid = jsonObject.getBoolean("isValid");
                                    if (!isValid) {
                                        Intent intent = new Intent(BejelentkezesActivity.this, EgyszeriBelepesActivity.class);
                                        startActivity(intent);
                                        finish();
                                    } else {
                                        Toast.makeText(BejelentkezesActivity.this, "Invalid login attempt.", Toast.LENGTH_SHORT).show();
                                    }
                                }
                                if (jsonObject.has("username")) {
                                    // Assuming username presence confirms login
                                    // Here you can also use AppPreferences if needed for storing relevant data
                                    Log.i("webshopid: ", AppPreferences.getWebshopId(BejelentkezesActivity.this));
                                    Intent intent = new Intent(BejelentkezesActivity.this, FoActivity.class);
                                    startActivity(intent);
                                    finish();
                                }
                            } catch (JSONException e) {
                                Log.e("LOGIN", "JSON parsing error", e);
                                Toast.makeText(BejelentkezesActivity.this, "Error processing login response.", Toast.LENGTH_SHORT).show();
                            }
                        } else {
                            Log.e("LOGIN", "Login failed: " + response);
                            Toast.makeText(BejelentkezesActivity.this, "Login failed. Please try again.", Toast.LENGTH_LONG).show();
                        }
                    }
                });
            }
        };

        HttpClient hc = new HttpClient();

        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://192.168.11.62:3000/").newBuilder();

        String url = urlBuilder.build().toString();

        Log.println(Log.DEBUG, "url", url);


        hc.getHttpClient(this);
        hc.makeGetHttpRequest(this, url , cb);
    }

    public void Init() {
        bejelentkezes_gomb = findViewById(R.id.bejelentkezes_gomb);
    }
}