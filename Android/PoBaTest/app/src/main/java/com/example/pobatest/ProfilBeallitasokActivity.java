package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

public class ProfilBeallitasokActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private ImageView jelszo_valtoztatas_gomb;
    private ImageView webshop_szerkesztes_gomb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profil_beallitasok);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(ProfilBeallitasokActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });

        jelszo_valtoztatas_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(ProfilBeallitasokActivity.this, JelszoValtoztatasActivity.class);
            startActivity(intent);
            finish();
        });

        webshop_szerkesztes_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(ProfilBeallitasokActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        jelszo_valtoztatas_gomb = findViewById(R.id.jelszo_valtoztatas_gomb);
        webshop_szerkesztes_gomb = findViewById(R.id.webshop_szerkesztes_gomb);
    }
}