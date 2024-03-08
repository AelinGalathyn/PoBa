package com.example.pobatest.Termek;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TermekekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_termekek;
    private List<Termek> termeklista;
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

        recyclerview_termekek.setLayoutManager(new LinearLayoutManager(this));
        recyclerview_termekek.setAdapter(new TermekAdapter(getApplicationContext(), termeklista));
    }

    public void ListaFeltolt() {
        ArrayList<String> adatok1 = new ArrayList<>(Arrays.asList("Alma", "Körte", "Zsepi"));
        ArrayList<String> adatok2 = new ArrayList<>(Arrays.asList("Cica", "Kutya", "Süni", "Béka", "Póni", "Mountain Bike", "Pap ruha", "Kereszt", "Lánc", "Biblia"));
        ArrayList<String> adatok3 = new ArrayList<>(Arrays.asList("Kréta", "Ceruza", "Vonalzó", "Drog", "Kenyér", "Samsung Galaxy Ultra Mega", "Tucsok"));

        Termek termek1 = new Termek("123123", "Kakaós csiga" , 5);
        Termek termek2 = new Termek("456456", "Gyros", 0);
        Termek termek3 = new Termek("789789", "Palacsinta", 10);

        termek1.setAdatok(adatok1);
        termek2.setAdatok(adatok2);
        termek3.setAdatok(adatok3);

        termeklista.add(termek1);
        termeklista.add(termek2);
        termeklista.add(termek3);
    }
}