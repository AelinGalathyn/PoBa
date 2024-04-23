package com.example.pobatest;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.pobatest.Webshopok.WebShopokActivity;
import com.example.pobatest.Webshopok.Webshop;

import java.util.ArrayList;

public class ApikulcsActivity extends AppCompatActivity {
    private ImageView nav_vissza_gomb;
    private ImageButton apikulcs_ok_button;
    private AlertDialog.Builder abBuilder;
    private AlertDialog ab;
    private RelativeLayout popup_layout;
    private ImageButton popup_no_icon;
    private ImageButton popup_yes_icon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.apikulcs_activity);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, WebShopokActivity.class);
            startActivity(intent);
            finish();
        });

        apikulcs_ok_button.setOnClickListener(v -> ab.show());

        popup_no_icon.setOnClickListener(v -> ab.dismiss());

        popup_yes_icon.setOnClickListener(v -> {
            Intent intent = new Intent(this, WebShopokActivity.class);
            intent.putExtra("webshop", "webshop4");
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        apikulcs_ok_button = findViewById(R.id.apikulcs_ok_button);

        LayoutInflater inflater = this.getLayoutInflater();
        View v = inflater.inflate(R.layout.apikulcs_popup_activity, null);

        TextView kerdes_helye = v.findViewById(R.id.kerdes_helye);
        TextView webshop_nev_helye = v.findViewById(R.id.webshop_nev_helye);
        TextView apikey_helye = v.findViewById(R.id.apikey_helye);
        kerdes_helye.setText("Biztos vagy benne?");
        webshop_nev_helye.setText("webshopNeve");
        apikey_helye.setText("aksjhdfjahfehwerlfuhlfuhaufehaskdjfhqa");

        abBuilder = new AlertDialog.Builder(this);
        ab = abBuilder.setView(v).create();
        ab.getWindow().setBackgroundDrawableResource(R.drawable.custom_popup);

        popup_layout = v.findViewById(R.id.popup_layout);
        popup_no_icon = popup_layout.findViewById(R.id.popup_no_icon);
        popup_yes_icon = popup_layout.findViewById(R.id.popup_yes_icon);
    }
}