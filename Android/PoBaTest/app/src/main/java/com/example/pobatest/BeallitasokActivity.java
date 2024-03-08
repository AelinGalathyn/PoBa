package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.pobatest.Beallitasok.BeallitasokErtesitesekActivity;

public class BeallitasokActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private ImageView ertesitesek_beallitasok_gomb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.beallitasok_activity);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(BeallitasokActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });

        ertesitesek_beallitasok_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(BeallitasokActivity.this, BeallitasokErtesitesekActivity.class);
            startActivity(intent);
            finish();
        });


    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        ertesitesek_beallitasok_gomb = findViewById(R.id.ertesitesek_beallitasok_gomb);
    }
}