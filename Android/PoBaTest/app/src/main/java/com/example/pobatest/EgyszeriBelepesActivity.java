package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.Users.IUsers;
import com.example.pobatest.Users.ResponseMessage;
import com.example.pobatest.Users.UsersInputDto;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class EgyszeriBelepesActivity extends AppCompatActivity {
    private ImageButton egyszeri_belepes_gomb;
    private EditText felhasznalonev_input;
    private EditText jelszo_input;
    private Retrofit retrofit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.belepes_egyszeri_activity);

        Init();

        egyszeri_belepes_gomb.setOnClickListener(view -> {
            String username = felhasznalonev_input.getText().toString();
            String password = jelszo_input.getText().toString();

            if (!username.equals("") || !password.equals("")) {
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
        retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.169.67:3000/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        IUsers service = retrofit.create(IUsers.class);
        Call<ResponseMessage> call = service.postLogin(user);
        call.enqueue(new Callback<ResponseMessage>() {
            @Override
            public void onResponse(Call<ResponseMessage> call, retrofit2.Response<ResponseMessage> response) {
                if (response.isSuccessful()) {
                    ResponseMessage loginResponse = response.body();
                    String responseSzoveg = loginResponse.getMessage();
                    Toast.makeText(EgyszeriBelepesActivity.this, "Sikeres bejelentkezés" , Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(EgyszeriBelepesActivity.this, FoActivity.class);
                    startActivity(intent);
                    finish();
                } else {
                    Toast.makeText(EgyszeriBelepesActivity.this, "Ilyen profil nem létezik", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseMessage> call, Throwable t) {
                Toast.makeText(EgyszeriBelepesActivity.this, "Internet error", Toast.LENGTH_SHORT).show();
            }
        });
    }
}