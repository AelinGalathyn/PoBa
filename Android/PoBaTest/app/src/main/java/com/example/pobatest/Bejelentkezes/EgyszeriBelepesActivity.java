package com.example.pobatest.Bejelentkezes;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;
import com.example.pobatest.Users.IUsers;
import com.example.pobatest.Users.ResponseMessage;
import com.example.pobatest.Users.UsersInputDto;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Response;
import retrofit2.Retrofit;

public class EgyszeriBelepesActivity extends AppCompatActivity {
    private ImageButton egyszeri_belepes_gomb;
    private EditText felhasznalonev_input;
    private EditText jelszo_input;
    private Retrofit retrofit;
    private OkHttpClient.Builder okBuild;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.belepes_egyszeri_activity);

        Init();

        egyszeri_belepes_gomb.setOnClickListener(view -> {
            String username = felhasznalonev_input.getText().toString();
            String password = jelszo_input.getText().toString();

            if (!username.isEmpty() || !password.isEmpty()) {
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
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(EgyszeriBelepesActivity.this, "Ilyen fiók nem létezik.", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.message().equals("Login successful")) {
                            Toast.makeText(EgyszeriBelepesActivity.this, "Sikeres belépés.", Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(EgyszeriBelepesActivity.this, FoActivity.class);
                            startActivity(intent);
                            finish();
                        } else {
                            Log.e("LOGIN", "Login failed: " + response);
                            Toast.makeText(EgyszeriBelepesActivity.this, " " + response, Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        };

        HttpClient hc = new HttpClient();

        HttpUrl.Builder urlBuilder = HttpUrl.parse("http://192.168.11.62:3000/login").newBuilder();
        urlBuilder
                .addQueryParameter("username", user.getUsername())
                .addQueryParameter("password", user.getPassword());

        String url = urlBuilder.build().toString();

        Log.println(Log.DEBUG, "url", url);


        hc.getHttpClient(this);
        hc.makeHttpRequest(this, url , cb);
    }



}