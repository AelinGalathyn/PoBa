package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class EgyikTermekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private EditText darab_editText;
    private TextView termek_reszletek_textview;
    private TextView termek_kep_nev_textview;
    private ImageView termek_kep_helye;
    private Termek termek;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_egyik_termek);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, TermekekActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        Intent intent = getIntent();
        termek = intent.getParcelableExtra("termek");

        darab_editText = findViewById(R.id.darab_editText);
        termek_reszletek_textview = findViewById(R.id.termek_reszletek_textview);
        termek_kep_nev_textview = findViewById(R.id.termek_kep_nev_textview);
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        termek_kep_helye = findViewById(R.id.termek_kep_helye);

        darab_editText.setText(String.valueOf(termek.darabSzam));
        termek_reszletek_textview.setText(termekReszletekString());
        termek_kep_nev_textview.setText(termek.termekNeve);
        termek_kep_helye.setImageResource(termek.image);
    }

    public String termekReszletekString() {
        String szoveg = "";

        for (String item : termek.adatok) {
            szoveg += termek.adatok.indexOf(item) + 1 + ". " + item + "\n";
        }

        return szoveg;
    }
}