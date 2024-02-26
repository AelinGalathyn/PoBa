package com.example.pobatest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;

import com.google.android.material.navigation.NavigationView;

public class FoActivity extends AppCompatActivity{

    private CardView rendelesek_card;
    private CardView termekek_card;
    private NavigationView nav_hamburger_menu;
    private ImageView nav_profil;
    private View hamburger_header;
    private Spinner hamburger_webshopHely;
    private ImageView nav_profil_gomb;
    private DrawerLayout hamburger_drawerLayout;
    private ActionBarDrawerToggle actionBarDrawerToggle;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fo);

        Init();

        rendelesek_card.setOnClickListener(v -> {
            Intent intent = new Intent(FoActivity.this, RendelesActivity.class);
            startActivity(intent);
            finish();
        });

        termekek_card.setOnClickListener(v -> {
            Intent intent = new Intent(FoActivity.this, TermekekActivity.class);
            startActivity(intent);
            finish();
        });

        nav_hamburger_menu.setNavigationItemSelectedListener(item -> {
            menuOnClick(item);
            return true;
        });

        nav_profil.setOnClickListener(v -> {
            Intent intent = new Intent(FoActivity.this, ProfilBeallitasokActivity.class);
            startActivity(intent);
            finish();
        });

        nav_profil_gomb.setOnClickListener(v -> {
            if (hamburger_drawerLayout.isDrawerOpen(GravityCompat.START)) {
                hamburger_drawerLayout.closeDrawer(GravityCompat.END);
            }
            else {
                hamburger_drawerLayout.openDrawer(GravityCompat.START);
            }
        });
    }

    public void Init() {
        rendelesek_card = findViewById(R.id.rendelesek_card);
        termekek_card = findViewById(R.id.termekek_card);
        nav_hamburger_menu = findViewById(R.id.nav_hamburger_menu);
        hamburger_header = nav_hamburger_menu.getHeaderView(0);
        nav_profil = hamburger_header.findViewById(R.id.nav_profil);
        hamburger_webshopHely = hamburger_header.findViewById(R.id.hamburger_webshopHely);
        hamburger_drawerLayout = findViewById(R.id.hamburger_drawerLayout);
        nav_profil_gomb = findViewById(R.id.nav_profil_gomb);

        actionBarDrawerToggle = new ActionBarDrawerToggle(this, hamburger_drawerLayout, R.string.nav_open, R.string.nav_close);
        hamburger_drawerLayout.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.syncState();

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.Webshopok, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_item);
        hamburger_webshopHely.setAdapter(adapter);
    }

    public void menuOnClick(MenuItem item) {
        Intent intent;
        int id = item.getItemId();
        int ertesitesek = R.id.hamburger_ertesitesek;
        int beallitasok = R.id.hamburger_beallitasok;
        int termekek = R.id.hamburger_termekek;
        int rendelesek = R.id.hamburger_rendelesek;


        if (id == ertesitesek)
        {
            intent = new Intent(FoActivity.this, ErtesitesekActivity.class);
        }
        else if (id == beallitasok)
        {
            intent = new Intent(FoActivity.this, BeallitasokActivity.class);
        }
        else if (id == termekek)
        {
            intent = new Intent(FoActivity.this, TermekekActivity.class);
        }
        else if (id == rendelesek)
        {
            intent = new Intent(FoActivity.this, RendelesActivity.class);
        }
        else {
            throw new IllegalStateException("Unexpected value: " + id);
        }

        startActivity(intent);
        finish();
    }
}