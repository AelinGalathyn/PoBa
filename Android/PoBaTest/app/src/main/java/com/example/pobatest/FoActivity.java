package com.example.pobatest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.AppPreferences;
import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.Rendeles.RendelesActivity;
import com.example.pobatest.Termek.TermekekActivity;
import com.example.pobatest.Webshopok.Webshop;
import com.google.android.material.navigation.NavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class FoActivity extends AppCompatActivity{

    private CardView rendelesek_card;
    private CardView termekek_card;
    private NavigationView nav_hamburger_menu;
    private ImageView nav_profil;
    private Spinner hamburger_webshopHely;
    private ImageView nav_profil_gomb;
    private DrawerLayout hamburger_drawerLayout;
    private List<Webshop> webshopok;
    private int selectedSpinnerPosition = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fo_activity);
        
        Init();
        getAllWebshops();

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
        View hamburger_header = nav_hamburger_menu.getHeaderView(0);
        nav_profil = hamburger_header.findViewById(R.id.nav_profil);
        hamburger_webshopHely = hamburger_header.findViewById(R.id.hamburger_webshopHely);
        TextView hamburger_username = hamburger_header.findViewById(R.id.hamburger_username);
        hamburger_username.setText(AppPreferences.getUsername(FoActivity.this));
        hamburger_webshopHely.setDropDownVerticalOffset(100);
        hamburger_drawerLayout = findViewById(R.id.hamburger_drawerLayout);
        nav_profil_gomb = findViewById(R.id.nav_profil_gomb);

        ActionBarDrawerToggle actionBarDrawerToggle = new ActionBarDrawerToggle(this, hamburger_drawerLayout, R.string.nav_open, R.string.nav_close);
        hamburger_drawerLayout.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.syncState();
    }

    public void menuOnClick(MenuItem item) {
        Intent intent;
        int id = item.getItemId();
        int beallitasok = R.id.hamburger_beallitasok;
        int termekek = R.id.hamburger_termekek;
        int rendelesek = R.id.hamburger_rendelesek;


        if (id == termekek)
        {
            intent = new Intent(FoActivity.this, TermekekActivity.class);
        }
        else if (id == rendelesek)
        {
            intent = new Intent(FoActivity.this, RendelesActivity.class);
        }
        else if (id == beallitasok)
        {
            intent = new Intent(FoActivity.this, ProfilBeallitasokActivity.class);
        }
        else {
            throw new IllegalStateException("Unexpected value: " + id);
        }

        startActivity(intent);
        finish();
    }

    public void getAllWebshops() {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Toast.makeText(FoActivity.this, "Sikertelen webshopok lekérés.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                try {
                    String responseData = Objects.requireNonNull(response.body()).string();
                    JSONArray jsonArray = new JSONArray(responseData);

                    for(int i = 0; i < jsonArray.length(); i++){

                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        Webshop webshop = new Webshop(jsonObject);
                        webshopok.add(webshop);
                    }

                    webshopok.sort(Comparator.comparingInt((Webshop obj) -> obj.webshopid));
                    AppPreferences.saveWebshops(FoActivity.this, webshopok);

                    runOnUiThread(() -> {
                        if (selectedSpinnerPosition == 0) {
                            Webshop aktualis = webshopok.stream()
                                    .filter(item -> item.webshopid == Integer.parseInt(AppPreferences.getWebshopId(FoActivity.this)))
                                    .findFirst()
                                    .orElse(null);
                            selectedSpinnerPosition = webshopok.indexOf(aktualis);
                        }
                        String[] webshopNevek = webshopok.stream().map(Webshop::getName).toArray(String[]::new);
                        ArrayAdapter<String> adapter = new ArrayAdapter<>(FoActivity.this, android.R.layout.simple_spinner_item, webshopNevek);
                        adapter.setDropDownViewResource(R.layout.spinner_row);
                        adapter.setNotifyOnChange(true);
                        hamburger_webshopHely.setAdapter(adapter);
                        hamburger_webshopHely.setSelection(selectedSpinnerPosition);
                        hamburger_webshopHely.setOnItemSelectedListener(SpinnerHandleOnclick);
                    });

                } catch (IOException | JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        webshopok = new ArrayList<>();
        HttpClient hc = new HttpClient();
        String url = "webshop";
        hc.getHttpClient(FoActivity.this);
        hc.getActions(this, url, cb);
    }

    public AdapterView.OnItemSelectedListener SpinnerHandleOnclick = new AdapterView.OnItemSelectedListener() {
        @Override
        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
            String clickedWebshopName = (String) parent.getItemAtPosition(position);
            webshopok.stream().filter(obj -> obj.getName().equals(clickedWebshopName)).findFirst().ifPresent(clickedWebshop -> AppPreferences.setWebshopId(FoActivity.this, Integer.toString(clickedWebshop.webshopid)));
        }

        @Override
        public void onNothingSelected(AdapterView<?> parent) {}
    };
}