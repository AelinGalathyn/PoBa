package com.example.pobatest.Bejelentkezes;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;
import com.example.pobatest.Users.UsersInputDto;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class EgyszeriBelepesActivity extends AppCompatActivity {
    private ImageButton egyszeri_belepes_gomb;
    private EditText felhasznalonev_input;
    private EditText jelszo_input;
    private String username;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.belepes_egyszeri_activity);

        Init();

        egyszeri_belepes_gomb.setOnClickListener(view -> {
            username = felhasznalonev_input.getText().toString();
            String password = jelszo_input.getText().toString();

            if (username.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Minden mező kitöltése kötelező.", Toast.LENGTH_SHORT).show();
            }
            else {
                UsersInputDto user = new UsersInputDto(username, password);
                login(user);
            }
        });
    }

    public void Init() {
        egyszeri_belepes_gomb = findViewById(R.id.egyszeri_belepes_gomb);
        felhasznalonev_input = findViewById(R.id.felhasznalonev_input);
        jelszo_input = findViewById(R.id.jelszo_input);
    }

    public void login(UsersInputDto user) {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(() -> Toast.makeText(EgyszeriBelepesActivity.this, "Bejelentkezési hiba", Toast.LENGTH_SHORT).show());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                String responseData = Objects.requireNonNull(response.body()).string();
                response.close();

                runOnUiThread(() -> {
                    if (response.code() == 201) {
                        Toast.makeText(EgyszeriBelepesActivity.this, "Sikeres belépés.", Toast.LENGTH_SHORT).show();
                        AppPreferences.setUsername(EgyszeriBelepesActivity.this, username);
                        try {
                            JSONObject jsonObject = new JSONObject(responseData);
                            int webshopId = jsonObject.getInt("webshopid");
                            AppPreferences.setWebshopId(EgyszeriBelepesActivity.this, Integer.toString(webshopId));
                        } catch (JSONException e) {
                            Toast.makeText(EgyszeriBelepesActivity.this, "Hiba a válasz feldolgozásakor.", Toast.LENGTH_SHORT).show();
                        }

                        Intent intent = new Intent(EgyszeriBelepesActivity.this, FoActivity.class);
                        startActivity(intent);
                        finish();
                    } else {
                        runOnUiThread(() -> Toast.makeText(EgyszeriBelepesActivity.this, "Sikertelen bejelentkezés, próbálja újra.", Toast.LENGTH_SHORT).show());
                    }
                });
            }
        };

        HttpClient hc = new HttpClient();

        hc.makeLoginHttpRequest( user, this, cb);
    }
}