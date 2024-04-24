package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.Webshopok.WebShopokActivity;
import com.example.pobatest.Webshopok.Webshop;

import java.util.List;
import java.util.Objects;

public class ProfilBeallitasokActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private ImageView jelszo_valtoztatas_gomb;
    private ImageView webshop_szerkesztes_gomb;
    private TextView profil_webshop;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profil_beallitasok_activity);

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
            Intent intent = new Intent(ProfilBeallitasokActivity.this, WebShopokActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        jelszo_valtoztatas_gomb = findViewById(R.id.jelszo_valtoztatas_gomb);
        webshop_szerkesztes_gomb = findViewById(R.id.webshop_szerkesztes_gomb);
        TextView profil_felhasznalonev = findViewById(R.id.profil_felhasznalonev);
        profil_webshop = findViewById(R.id.profil_webshop);
        profil_felhasznalonev.setText(AppPreferences.getUsername(ProfilBeallitasokActivity.this));
        webshopSetNev();
    }

    public void webshopSetNev() {
        List<Webshop> webshopok = AppPreferences.getWebshops(ProfilBeallitasokActivity.this);
        int webshopid = Integer.parseInt(AppPreferences.getWebshopId(ProfilBeallitasokActivity.this));
        Webshop aktualisWebshop = webshopok.stream().filter(item -> item.webshopid == webshopid).findFirst().orElse(null);
        String webshopnev = Objects.requireNonNull(aktualisWebshop).getName();
        profil_webshop.setText(webshopnev);
    }
}