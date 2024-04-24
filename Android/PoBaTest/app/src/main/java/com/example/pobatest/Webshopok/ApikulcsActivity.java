package com.example.pobatest.Webshopok;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import java.io.IOException;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class ApikulcsActivity extends AppCompatActivity {
    private ImageView nav_vissza_gomb;
    private ImageButton apikulcs_ok_button;
    private String api_key;
    private EditText apikulcs_input;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.apikulcs_activity);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, WebShopokActivity.class);
            startActivity(intent);
            finish();
        });

        apikulcs_ok_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                api_key = apikulcs_input.getText().toString();
                AddWebshop();
            }
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        apikulcs_ok_button = findViewById(R.id.apikulcs_ok_button);
        apikulcs_input = findViewById(R.id.apikulcs_input);
    }

    public void AddWebshop() {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Log.d("ADD_WEBSHOP", "onResponse: " + e + ": " + call);
                Toast.makeText(ApikulcsActivity.this, "Sikertelen webshop hozzáadás.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    String webshopid = Objects.requireNonNull(response.body()).string();

                    response.close();

                    AppPreferences.setWebshopId(ApikulcsActivity.this, webshopid);
                    startActivity(new Intent(ApikulcsActivity.this, FoActivity.class));
                    finish();

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        HttpClient hc = new HttpClient();
        String url = "webshop";
        hc.getHttpClient(ApikulcsActivity.this);
        hc.addWebshop(ApikulcsActivity.this, url, cb, api_key);
    }
}