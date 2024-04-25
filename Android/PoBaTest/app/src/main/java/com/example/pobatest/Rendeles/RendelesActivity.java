package com.example.pobatest.Rendeles;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
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
    }

    public void Rendelesek(){
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Toast.makeText(RendelesActivity.this, "Sikertelen rendelés lekérés.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    String responseData = Objects.requireNonNull(response.body()).string();
                    JSONArray jsonArray = new JSONArray(responseData);

                    response.close();

                    for(int i = 0; i < jsonArray.length(); i++){

                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        Rendeles rendeles = new Rendeles(jsonObject);
                        megrendelesLista.add(rendeles);
                    }

                    megrendelesLista.sort(Comparator.comparingLong(b -> b.date.getTime()));

                    runOnUiThread(() -> {
                        recyclerview_rendelesek.setLayoutManager(new LinearLayoutManager(RendelesActivity.this));
                        recyclerview_rendelesek.setAdapter(new RendelesAdapter(RendelesActivity.this, megrendelesLista));
                    });

                } catch (IOException | JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        HttpClient hc = new HttpClient();
        String url = "orders";
        hc.getHttpClient(RendelesActivity.this);
        hc.makeGetHttpRequest(this, url, cb);
    }
}