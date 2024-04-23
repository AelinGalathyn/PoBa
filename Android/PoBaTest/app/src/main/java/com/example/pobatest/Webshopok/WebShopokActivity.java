package com.example.pobatest.Webshopok;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import java.util.List;

public class WebShopokActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_webshopok;
    private ImageView plusz_webshop_gomb;
    private List<Webshop> webshop_lista;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.webshopok_activity);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(WebShopokActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });

        plusz_webshop_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, ApikulcsActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        recyclerview_webshopok = findViewById(R.id.recyclerview_webshopok);
        plusz_webshop_gomb = findViewById(R.id.plusz_webshop_gomb);
        webshop_lista = AppPreferences.getWebshopok(WebShopokActivity.this);

        recyclerview_webshopok.setLayoutManager(new LinearLayoutManager(this));
        recyclerview_webshopok.setAdapter(new WebshopAdapter(this, webshop_lista));
    }
}