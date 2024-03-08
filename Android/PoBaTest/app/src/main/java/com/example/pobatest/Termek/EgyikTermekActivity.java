package com.example.pobatest.Termek;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Rect;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.pobatest.R;

public class EgyikTermekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private ImageView mennyiseg_icon;
    private EditText darab_editText;
    private TextView termek_reszletek_textview;
    private TextView termek_kep_nev_textview;
    private ImageView termek_kep_helye;
    private Termek termek;
    private ImageButton darab_confirm_button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.termek_egyik_activity);

        Init();
        mennyisegAlapjanIcon();


        termek_reszletek_textview.setOnClickListener(v -> {
            if(darab_editText.isFocused()) {
                InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                darab_editText.clearFocus();
                darab_confirm_button.setVisibility(View.VISIBLE);
            }
        });

        darab_confirm_button.setOnClickListener(v -> {
            termek.darabSzam = Integer.parseInt(darab_editText.getText().toString());
            mennyisegAlapjanIcon();
            darab_confirm_button.setVisibility(View.INVISIBLE);
        });

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, TermekekActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        termek = getIntent().getParcelableExtra("termek");

        darab_editText = findViewById(R.id.darab_editText);
        darab_confirm_button = findViewById(R.id.darab_confirm_button);
        termek_reszletek_textview = findViewById(R.id.termek_reszletek_textview);
        termek_kep_nev_textview = findViewById(R.id.termek_kep_nev_textview);
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        termek_kep_helye = findViewById(R.id.termek_kep_helye);
        mennyiseg_icon = findViewById(R.id.mennyiseg_icon);

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

    public void mennyisegAlapjanIcon() {
        if (termek.darabSzam > 0 && termek.darabSzam < 10) {
            mennyiseg_icon.setImageResource(R.drawable.kifogyoban_icon);
        }
        else if (termek.darabSzam <= 0) {
            mennyiseg_icon.setImageResource(R.drawable.elfogyott_icon);
        }
        else {
            mennyiseg_icon.setImageResource(0);
        }
    }
}