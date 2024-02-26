package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RendelesActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_rendelesek;
    private List<Rendeles> megrendelesLista;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rendelesek);

        Init();
        ListaFeltolt();

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

    public void ListaFeltolt() {
        ArrayList<String> kosar1 = new ArrayList<>(Arrays.asList("Alma", "Körte", "Zsepi"));
        ArrayList<String> kosar2 = new ArrayList<>(Arrays.asList("Cica", "Kutya", "Süni", "Béka", "Póni", "Mountain Bike", "Pap ruha", "Kereszt", "Lánc", "Biblia"));
        ArrayList<String> kosar3 = new ArrayList<>(Arrays.asList("Kréta", "Ceruza", "Vonalzó", "Drog", "Kenyér", "Samsung Galaxy Ultra Mega", "Tucsok"));

        Rendeles rendeles1 = new Rendeles("123123", R.drawable.foxpost_logo, "Mákos Guba");
        Rendeles rendeles2 = new Rendeles("456456", R.drawable.gls_logo, "Hófehérke");
        Rendeles rendeles3 = new Rendeles("789789", 0, "Nagy Henrik the Third Jr.");

        rendeles1.setKosarTartalma(kosar1);
        rendeles2.setKosarTartalma(kosar2);
        rendeles3.setKosarTartalma(kosar3);

        megrendelesLista.add(rendeles1);
        megrendelesLista.add(rendeles2);
        megrendelesLista.add(rendeles3);
    }
}