package com.example.pobatest.Bejelentkezes;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageButton;

import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

public class EgyszeriBelepesActivity extends AppCompatActivity {
    private ImageButton egyszeri_belepes_gomb;
    private EditText felhasznalonev_input;
    private EditText jelszo_input;

    private String getUrl = ""

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.belepes_egyszeri_activity);

        Init();

        egyszeri_belepes_gomb.setOnClickListener(view -> {
            if (!felhasznalonev_input.getText().toString().equals("") || !jelszo_input.getText().toString().equals("")) {

                Intent intent = new Intent(EgyszeriBelepesActivity.this, FoActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }

    public void Init() {
        egyszeri_belepes_gomb = findViewById(R.id.egyszeri_belepes_gomb);
        felhasznalonev_input = findViewById(R.id.felhasznalonev_input);
        jelszo_input = findViewById(R.id.jelszo_input);
    }
}