package com.example.pobatest.Bejelentkezes;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.ApiCalls.SharedPrefWebshopId;
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
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            String responseData = null;
                            try {
                                responseData = response.body().string();
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                            try {
                                Log.i("json response", responseData);
                                JSONObject jsonObject = new JSONObject(responseData);
                                if (jsonObject.has("isValid")) {
                                    boolean isValid = jsonObject.getBoolean("isValid");
                                    Intent intent = new Intent(BejelentkezesActivity.this, EgyszeriBelepesActivity.class);
                                    startActivity(intent);
                                    finish();
                                }
                                if (jsonObject.has("username")) {
                                    SharedPrefWebshopId sp = new SharedPrefWebshopId();
                                    Log.i("webshopid: ", sp.getWebshopId(BejelentkezesActivity.this).toString());
                                    Intent intent = new Intent(BejelentkezesActivity.this, FoActivity.class);
                                    startActivity(intent);
                                    finish();
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        } else {
                            Log.e("LOGIN", "Login failed: " + response);
                            Toast.makeText(BejelentkezesActivity.this, " " + response, Toast.LENGTH_SHORT).show();
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