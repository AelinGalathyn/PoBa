package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ActivityNavigator;

import android.content.Intent;
import android.os.Bundle;
import android.transition.Transition;
import android.transition.TransitionValues;
import android.view.Window;
import android.widget.ImageButton;

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