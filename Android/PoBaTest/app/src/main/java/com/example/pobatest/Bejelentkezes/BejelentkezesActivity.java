package com.example.pobatest.Bejelentkezes;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageButton;

import com.example.pobatest.R;

public class BejelentkezesActivity extends AppCompatActivity {


    private ImageButton bejelentkezes_gomb;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.bejelentkezes_activity);

        Init();

        bejelentkezes_gomb.setOnClickListener(view -> {
            Intent intent = new Intent(BejelentkezesActivity.this, EgyszeriBelepesActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        bejelentkezes_gomb = findViewById(R.id.bejelentkezes_gomb);
    }
}