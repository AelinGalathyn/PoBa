package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.widget.ImageView;
import android.widget.TextView;

public class EgyikRendelesActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private TextView rendeles_szam_textView;
    private TextView rendeles_reszletek_textview;
    private ImageView kiszallito_icon;
    private TextView rendeloi_adatok_textview;
    private Rendeles rendeles;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_egyik_rendeles);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, RendelesActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        Intent intent = getIntent();
        rendeles = intent.getParcelableExtra("rendeles");

        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        rendeles_reszletek_textview = findViewById(R.id.rendeles_reszletek_textview);
        rendeles_szam_textView = findViewById(R.id.rendeles_szam_textView);
        kiszallito_icon = findViewById(R.id.kiszallito_icon);
        rendeloi_adatok_textview = findViewById(R.id.rendeloi_adatok_textview);

        rendeles_szam_textView.setText(rendeles.orderId);
        rendeles_reszletek_textview.setText(rendelesReszletekString());
        rendeles_reszletek_textview.setMovementMethod(new ScrollingMovementMethod());
        kiszallito_icon.setImageResource(rendeles.image);
        rendeloi_adatok_textview.setText(rendeles.rendeloNeve);
    }

    public String rendelesReszletekString() {
        String szoveg = "";

        for (String item : rendeles.kosarTartalma) {
            szoveg += rendeles.kosarTartalma.indexOf(item) + 1 + ". " + item + "\n";
        }

        return szoveg;
    }
}