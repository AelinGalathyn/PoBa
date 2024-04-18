package com.example.pobatest.Rendeles;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.Bejelentkezes.BejelentkezesActivity;
import com.example.pobatest.Bejelentkezes.EgyszeriBelepesActivity;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Response;

public class RendelesActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_rendelesek;
    private List<Rendeles> megrendelesLista;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.rendelesek_activity);

        Init();
        Rendelesek();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(RendelesActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        recyclerview_rendelesek = findViewById(R.id.recyclerview_rendelesek);
        megrendelesLista = new ArrayList<>();

        recyclerview_rendelesek.setLayoutManager(new LinearLayoutManager(this));
        recyclerview_rendelesek.setAdapter(new RendelesAdapter(getApplicationContext(), megrendelesLista));
    }


    public void Rendelesek(){
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(RendelesActivity.this, "Sikertelen rendelés lekérés.", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            List<Rendeles> rendelesek = new ArrayList<>();
                            String responseData = response.body().string();
                            JSONArray jsonArray = new JSONArray(responseData);
                            for(int i = 0; i < jsonArray.length(); i++){
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                Rendeles rendeles = new Rendeles(jsonObject);
                                rendelesek.add(rendeles);
                            }
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        } catch (JSONException e) {
                            throw new RuntimeException(e);
                        }
                    }
                });
            }
        };

        HttpClient hc = new HttpClient();
        String url = "orders";
        hc.getHttpClient(RendelesActivity.this);
        hc.makeGetHttpRequest(this, url, cb);
    }
}