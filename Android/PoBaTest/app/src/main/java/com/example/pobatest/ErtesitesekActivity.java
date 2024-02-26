package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ErtesitesekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_ertesitesek;
    private List<Ertesites> ertesitesLista;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ertesitesek);

        Init();
        ListaFeltolt();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(ErtesitesekActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        recyclerview_ertesitesek = findViewById(R.id.recyclerview_ertesitesek);
        ertesitesLista = new ArrayList<>();

        recyclerview_ertesitesek.setLayoutManager(new LinearLayoutManager(this));
        recyclerview_ertesitesek.setAdapter(new ErtesitesAdapter(getApplicationContext(), ertesitesLista));
    }

    public void ListaFeltolt() {
        Ertesites ertesites1 = new Ertesites("Kakaós csiga");
        Ertesites ertesites2 = new Ertesites("456456");
        Ertesites ertesites3 = new Ertesites("789789");

        ertesitesLista.add(ertesites1);
        ertesitesLista.add(ertesites2);
        ertesitesLista.add(ertesites3);
    }
}