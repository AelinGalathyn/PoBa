package com.example.pobatest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentTransaction;
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
        setContentView(R.layout.bejelentkezes_fragment);

        Init();

        bejelentkezes_gomb.setOnClickListener(view -> {
            getSupportFragmentManager().beginTransaction().replace(R.id.bejelentkezes_framelayout, new EgyszeriBelepesFragment())
                    .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                    .commit();
        });
    }

    public void Init() {
        bejelentkezes_gomb = findViewById(R.id.bejelentkezes_gomb);
    }

}