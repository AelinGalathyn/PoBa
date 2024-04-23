package com.example.pobatest.Termek;

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
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class TermekekActivity extends AppCompatActivity {
    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_termekek;
    public List<Termek> termeklista;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.termekek_activity);

        Init();
        ListaFeltolt();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(TermekekActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        recyclerview_termekek = findViewById(R.id.recyclerview_termekek);
        termeklista = new ArrayList<>();
    }

    public void ListaFeltolt() {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Toast.makeText(TermekekActivity.this, "Sikertelen termék lekérés.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                Log.d("RES", "onResponse: " + response);
                try {
                    String responseData = response.body().string();
                    JSONArray jsonArray = new JSONArray(responseData);

                    for(int i = 0; i < jsonArray.length(); i++){
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        Termek termek = new Termek(jsonObject);
                        termeklista.add(termek);
                    }

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            recyclerview_termekek.setLayoutManager(new LinearLayoutManager(TermekekActivity.this));
                            recyclerview_termekek.setAdapter(new TermekAdapter(TermekekActivity.this, termeklista));
                        }
                    });

                } catch (IOException | JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        HttpClient hc = new HttpClient();
        String url = "item";
        hc.getHttpClient(TermekekActivity.this);
        hc.makeGetHttpRequest(this, url, cb);
    }
}